/* =========================================================================
   107 Design — Culture Deck LP
   - Injects the 10 value sections (zigzag)
   - IntersectionObserver reveal (opacity + translateY)
   - Header background on scroll
   - Right-edge "NN / 10" progress indicator while in the Values section
   NOTE: Japanese body copy below is LP-oriented placeholder text written for
   this scaffold. Replace with the verbatim Culture Deck (Deck原文) when the
   source PDF is available.
   ========================================================================= */
(function () {
  "use strict";

  const VALUES = [
    {
      en: "Freedom & Responsibility",
      ja: "自由と自己責任",
      img: "value-01-freedom.svg",
      body: "自由とは、自分で選び、その結果を引き受けることとセットで意味を持ちます。私たちは一人ひとりに大きな裁量を委ねます。だからこそ、選択の手綱も自分の手の中にあります。"
    },
    {
      en: "Fair, not Equal",
      ja: "平等であることより、フェアであること",
      img: "value-02-fair.svg",
      body: "全員を一律に扱うことが、必ずしも公正とは限りません。貢献や状況に正面から向き合い、納得できる「フェア」を選び続けます。"
    },
    {
      en: "Diversity & Inclusion",
      ja: "ダイバーシティ＆インクルージョン",
      img: "value-03-diversity.svg",
      body: "異なる背景や視点こそが、複雑な課題に鮮やかな答えを出す力になります。違いを歓迎し、誰もが本来の自分で参加できる場をつくります。"
    },
    {
      en: "Earn Your Place",
      ja: "仕事における介在価値を常に問う",
      img: "value-04-value.svg",
      body: "「自分がここにいる意味は何か」を問い続けます。役割に安住せず、自分が介在することで生まれる価値を、一つひとつの仕事で証明します。"
    },
    {
      en: "Pay for Value",
      ja: "報酬と待遇に関する考え方",
      img: "value-05-reward.svg",
      body: "報酬は年次や肩書きではなく、生み出した価値に対して支払われるべきだと考えます。価値とリターンを誠実に結びつけます。"
    },
    {
      en: "Reward the Proactive",
      ja: "能動的に動き、高い視点を持とうとする人間に優先的に報いる",
      img: "value-06-vision.svg",
      body: "指示を待つのではなく、自ら課題を見つけ、一段高い視点で動く人を私たちは強く支持します。前に踏み出す姿勢に、優先的に報います。"
    },
    {
      en: "Ask for Help, Boldly",
      ja: "天も会社も、自ら助くる者を助く",
      img: "value-07-help.svg",
      body: "助けを求めることは弱さではなく、前に進むための知恵です。自ら手を挙げ、動く人にこそ、会社も仲間も力を貸します。"
    },
    {
      en: "Stand Still, Fall Behind",
      ja: "変わらない・変われない、は退化",
      img: "value-08-change.svg",
      body: "現状維持は、後退と同じです。昨日の正解に留まらず、学び、捨て、つくり替える。変わり続けることそのものを強みにします。"
    },
    {
      en: "Be Humble",
      ja: "Be Humble — 謙虚であることの大切さ",
      img: "value-09-humble.svg",
      body: "成果を出すほど、謙虚であろうとします。自分の限界を知り、他者から学ぶ姿勢が、長く成長し続けるための土台になります。"
    },
    {
      en: "Humor & Kindness",
      ja: "プロフェッショナルなチームに、ユーモアと優しさを",
      img: "value-10-humor.svg",
      body: "高い基準で仕事に向き合うからこそ、ユーモアと優しさを忘れません。緊張感と温かさが両立するチームを、私たちは目指します。"
    }
  ];

  const total = String(VALUES.length).padStart(2, "0");

  /* ---- Build value sections ---- */
  function buildValues() {
    const list = document.getElementById("valueList");
    if (!list) return;
    const frag = document.createDocumentFragment();

    VALUES.forEach(function (v, i) {
      const n = String(i + 1).padStart(2, "0");
      const item = document.createElement("article");
      item.className = "value-item" + (i % 2 === 1 ? " reverse" : "");
      item.id = "value-" + n;
      item.dataset.index = n;

      const text = document.createElement("div");
      text.className = "value-text";
      text.innerHTML =
        '<p class="value-num"><b>' + n + "</b> / " + total + "</p>" +
        '<h3 class="value-en">' + v.en + "</h3>" +
        '<p class="value-ja">' + v.ja + "</p>" +
        '<p class="value-body">' + v.body + "</p>";

      const visual = document.createElement("div");
      visual.className = "value-visual";
      const img = document.createElement("img");
      img.src = "assets/images/" + v.img;
      img.alt = v.en + " — " + v.ja;
      img.loading = "lazy";
      img.width = 600; img.height = 600;
      visual.appendChild(img);

      item.appendChild(text);
      item.appendChild(visual);
      frag.appendChild(item);
    });

    list.appendChild(frag);
  }

  /* ---- Reveal on scroll ---- */
  function setupReveal() {
    const targets = document.querySelectorAll(".reveal, .value-item");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !("IntersectionObserver" in window)) {
      targets.forEach(function (t) { t.classList.add("is-visible"); });
      return;
    }
    const io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add("is-visible");
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -8% 0px" });
    targets.forEach(function (t) { io.observe(t); });
  }

  /* ---- Header background on scroll ---- */
  function setupHeader() {
    const header = document.getElementById("siteHeader");
    if (!header) return;
    const onScroll = function () {
      header.classList.toggle("is-scrolled", window.scrollY > 24);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---- Progress indicator (which value is centered) ---- */
  function setupProgress() {
    const pb = document.getElementById("valueProgress");
    const valuesSection = document.getElementById("values");
    if (!pb || !valuesSection || !("IntersectionObserver" in window)) return;
    const cur = pb.querySelector(".vp-cur");

    // Toggle visibility when the Values section is on screen.
    const sectionIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        pb.classList.toggle("is-active", e.isIntersecting);
      });
    }, { threshold: 0.05 });
    sectionIO.observe(valuesSection);

    // Track which value is closest to the viewport center.
    const items = document.querySelectorAll(".value-item");
    const itemIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting && e.intersectionRatio > 0.5) {
          cur.textContent = e.target.dataset.index;
        }
      });
    }, { threshold: [0.5, 0.75], rootMargin: "-25% 0px -25% 0px" });
    items.forEach(function (it) { itemIO.observe(it); });
  }

  document.addEventListener("DOMContentLoaded", function () {
    buildValues();
    setupReveal();
    setupHeader();
    setupProgress();
  });
})();
