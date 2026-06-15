// @ts-check
/**
 * Gremlins.js モンキーテスト + エラーロガー (Playwright)
 * --------------------------------------------------------
 * - 対象URLを開く（Basic認証 / ログインフォームの両方に自動対応）
 * - Gremlins.js を注入して 60 秒間モンキーテストを実行
 * - コンソールエラー / ページ例外 / ネットワークエラー(4xx/5xx) / リクエスト失敗を全件ログ記録
 * - エラー発生時にスクリーンショットを自動取得
 * - 実行結果を JSON / テキストのレポートとして保存
 *
 * 使い方:
 *   cd monkey-test
 *   npm install
 *   npx playwright install chromium
 *   npm test
 *
 * 環境変数で挙動を上書き可能:
 *   TARGET_URL   テスト対象URL          (default: http://43.207.75.174/)
 *   AUTH_USER    認証ユーザー名          (default: abc)
 *   AUTH_PASS    認証パスワード          (default: abc)
 *   DURATION_MS  モンキーテスト実行時間  (default: 60000)
 *   HEADLESS     "false" でブラウザ表示  (default: true)
 *   OUT_DIR      成果物の出力先          (default: ./artifacts)
 *   GREMLINS_URL Gremlins.js のCDN URL  (default: unpkg)
 */

import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ---- 設定 -------------------------------------------------------------------
const TARGET_URL = process.env.TARGET_URL || 'http://43.207.75.174/';
const AUTH_USER = process.env.AUTH_USER || 'abc';
const AUTH_PASS = process.env.AUTH_PASS || 'abc';
const DURATION_MS = Number(process.env.DURATION_MS || 60_000);
const HEADLESS = process.env.HEADLESS !== 'false';
const GREMLINS_URL = process.env.GREMLINS_URL || 'https://unpkg.com/gremlins.js';

const RUN_ID = new Date().toISOString().replace(/[:.]/g, '-');
const OUT_DIR = path.resolve(__dirname, process.env.OUT_DIR || 'artifacts', RUN_ID);
const SHOT_DIR = path.join(OUT_DIR, 'screenshots');
fs.mkdirSync(SHOT_DIR, { recursive: true });

// ---- ロガー -----------------------------------------------------------------
/** @type {Array<Record<string, any>>} */
const events = [];
const counts = { consoleError: 0, pageError: 0, httpError: 0, requestFailed: 0, screenshots: 0 };
let shotSeq = 0;

const logFile = path.join(OUT_DIR, 'run.log');
const logStream = fs.createWriteStream(logFile, { flags: 'a' });

/**
 * @param {string} level
 * @param {string} type
 * @param {Record<string, any>} data
 */
function log(level, type, data) {
  const entry = { ts: new Date().toISOString(), level, type, ...data };
  events.push(entry);
  const line = `[${entry.ts}] ${level.toUpperCase().padEnd(5)} ${type} ${JSON.stringify(data)}`;
  console.log(line);
  logStream.write(line + '\n');
}

/**
 * エラー発生時のスクリーンショット取得
 * @param {import('playwright').Page} page
 * @param {string} reason
 */
async function snapshot(page, reason) {
  try {
    shotSeq += 1;
    const safe = reason.replace(/[^a-z0-9_-]/gi, '_').slice(0, 40);
    const file = path.join(SHOT_DIR, `${String(shotSeq).padStart(3, '0')}-${safe}.png`);
    await page.screenshot({ path: file, fullPage: true });
    counts.screenshots += 1;
    log('info', 'screenshot', { file: path.relative(OUT_DIR, file), reason });
    return file;
  } catch (err) {
    log('warn', 'screenshot_failed', { reason, error: String(err) });
    return null;
  }
}

// ---- ログイン処理 -----------------------------------------------------------
/**
 * ページ内にログインフォームがあれば自動入力して送信する。
 * （Basic認証は context の httpCredentials で別途処理済み）
 * @param {import('playwright').Page} page
 */
async function tryFormLogin(page) {
  // パスワード入力欄が無ければフォームログインは不要と判断
  const passwordField = page.locator('input[type="password"]').first();
  if ((await passwordField.count()) === 0) return false;

  log('info', 'login_form_detected', {});

  // ユーザー名欄の候補を広めに拾う
  const userField = page
    .locator(
      'input[type="text"], input[type="email"], input[name*="user" i], input[name*="id" i], input[name*="login" i], input[name*="mail" i]'
    )
    .first();

  try {
    if ((await userField.count()) > 0) {
      await userField.fill(AUTH_USER);
    }
    await passwordField.fill(AUTH_PASS);

    // submit ボタン or Enter で送信
    const submit = page
      .locator('button[type="submit"], input[type="submit"], button:has-text("ログイン"), button:has-text("Login"), button:has-text("Sign in")')
      .first();

    if ((await submit.count()) > 0) {
      await Promise.all([
        page.waitForLoadState('networkidle').catch(() => {}),
        submit.click(),
      ]);
    } else {
      await Promise.all([
        page.waitForLoadState('networkidle').catch(() => {}),
        passwordField.press('Enter'),
      ]);
    }
    log('info', 'login_form_submitted', {});
    return true;
  } catch (err) {
    log('warn', 'login_form_failed', { error: String(err) });
    return false;
  }
}

// ---- Gremlins 注入 ----------------------------------------------------------
/**
 * @param {import('playwright').Page} page
 */
async function injectGremlins(page) {
  try {
    await page.addScriptTag({ url: GREMLINS_URL });
  } catch (err) {
    log('warn', 'gremlins_cdn_failed', { url: GREMLINS_URL, error: String(err) });
    // CDN が使えない場合はローカル同梱版にフォールバック
    const local = path.join(__dirname, 'vendor', 'gremlins.min.js');
    if (fs.existsSync(local)) {
      await page.addScriptTag({ path: local });
    } else {
      throw new Error(
        `Gremlins.js を読み込めませんでした。CDN(${GREMLINS_URL})に到達できないオフライン環境では ` +
          `monkey-test/vendor/gremlins.min.js を配置してください。`
      );
    }
  }

  // 注入確認
  const ok = await page.evaluate(() => typeof window.gremlins !== 'undefined');
  if (!ok) throw new Error('window.gremlins が見つかりません（注入失敗）');
  log('info', 'gremlins_injected', { url: GREMLINS_URL });
}

/**
 * 指定時間だけ Gremlins のモンキーテストを実行する。
 * distribution 戦略で十分な手数を流し込み、ブラウザ側のタイマーで停止する。
 * @param {import('playwright').Page} page
 * @param {number} durationMs
 */
async function unleashGremlins(page, durationMs) {
  log('info', 'gremlins_start', { durationMs });
  await page.evaluate(async (duration) => {
    /* global gremlins */
    const horde = window.gremlins.createHorde({
      randomizer: new window.gremlins.Chance(1234), // 再現性のための固定シード
      species: [
        window.gremlins.species.clicker(),
        window.gremlins.species.toucher(),
        window.gremlins.species.formFiller(),
        window.gremlins.species.scroller(),
        window.gremlins.species.typer(),
      ],
      mogwais: [
        window.gremlins.mogwais.alert(),
        window.gremlins.mogwais.fps(),
        window.gremlins.mogwais.gizmo(),
      ],
      strategies: [
        // 6ms 間隔で十分な回数 → 60秒間ノンストップで攻撃
        window.gremlins.strategies.distribution({
          delay: 6,
          nb: Math.ceil(duration / 6) + 1000,
        }),
      ],
    });
    // 念のためブラウザ側でも時間で停止させる
    await Promise.race([
      horde.unleash(),
      new Promise((resolve) => setTimeout(resolve, duration)),
    ]);
    horde.stop();
  }, durationMs);
  log('info', 'gremlins_done', {});
}

// ---- イベントリスナー登録 ---------------------------------------------------
/**
 * @param {import('playwright').Page} page
 */
function attachListeners(page) {
  // コンソール（error / warning）
  page.on('console', (msg) => {
    const t = msg.type();
    if (t === 'error') {
      counts.consoleError += 1;
      log('error', 'console.error', { text: msg.text(), location: msg.location() });
      snapshot(page, 'console_error');
    } else if (t === 'warning') {
      log('warn', 'console.warning', { text: msg.text(), location: msg.location() });
    }
  });

  // ページ内の未捕捉例外
  page.on('pageerror', (err) => {
    counts.pageError += 1;
    log('error', 'pageerror', { message: err.message, stack: err.stack });
    snapshot(page, 'pageerror');
  });

  // HTTP レスポンス（4xx / 5xx）
  page.on('response', (res) => {
    const status = res.status();
    if (status >= 400) {
      counts.httpError += 1;
      log('error', 'http.' + status, {
        status,
        url: res.url(),
        method: res.request().method(),
      });
      snapshot(page, `http_${status}`);
    }
  });

  // リクエスト失敗（DNS/接続断/中断など）
  page.on('requestfailed', (req) => {
    counts.requestFailed += 1;
    log('error', 'requestfailed', {
      url: req.url(),
      method: req.method(),
      failure: req.failure()?.errorText,
    });
    snapshot(page, 'requestfailed');
  });
}

// ---- メイン -----------------------------------------------------------------
async function main() {
  log('info', 'config', {
    TARGET_URL,
    AUTH_USER,
    DURATION_MS,
    HEADLESS,
    OUT_DIR: path.relative(process.cwd(), OUT_DIR),
  });

  const browser = await chromium.launch({ headless: HEADLESS });
  const context = await browser.newContext({
    // Basic 認証はここで処理（フォームの場合は tryFormLogin で対応）
    httpCredentials: { username: AUTH_USER, password: AUTH_PASS },
    ignoreHTTPSErrors: true,
    viewport: { width: 1280, height: 800 },
  });
  const page = await context.newPage();
  attachListeners(page);

  let exitCode = 0;
  try {
    log('info', 'goto', { url: TARGET_URL });
    await page.goto(TARGET_URL, { waitUntil: 'domcontentloaded', timeout: 30_000 });

    // フォームログインがあれば実行
    await tryFormLogin(page);
    await page.waitForLoadState('networkidle').catch(() => {});

    await injectGremlins(page);
    await unleashGremlins(page, DURATION_MS);

    // 終了時のスクリーンショット（エラー有無に関わらず最終状態を残す）
    await page.screenshot({ path: path.join(OUT_DIR, 'final.png'), fullPage: true });
  } catch (err) {
    exitCode = 1;
    log('error', 'fatal', { message: String(err && err.message ? err.message : err) });
    await snapshot(page, 'fatal');
  } finally {
    await context.close();
    await browser.close();
  }

  // ---- レポート出力 ----
  const summary = {
    runId: RUN_ID,
    target: TARGET_URL,
    durationMs: DURATION_MS,
    finishedAt: new Date().toISOString(),
    counts,
    totalErrors:
      counts.consoleError + counts.pageError + counts.httpError + counts.requestFailed,
  };
  fs.writeFileSync(path.join(OUT_DIR, 'events.json'), JSON.stringify(events, null, 2));
  fs.writeFileSync(path.join(OUT_DIR, 'summary.json'), JSON.stringify(summary, null, 2));
  logStream.end();

  console.log('\n========== モンキーテスト結果 ==========');
  console.table(counts);
  console.log(`合計エラー件数 : ${summary.totalErrors}`);
  console.log(`スクリーンショット: ${counts.screenshots} 枚`);
  console.log(`成果物          : ${OUT_DIR}`);
  console.log('=======================================\n');

  process.exit(exitCode);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
