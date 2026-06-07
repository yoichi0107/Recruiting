/** @type {import('next').NextConfig} */

// GitHub Pages のプロジェクトサイトでは、リポジトリ名が URL のパスになります。
// 公開URL: https://<ユーザー名>.github.io/<リポジトリ名>/
// 現在のリポジトリ名に合わせて REPO_NAME を変更してください。
// `<ユーザー名>.github.io` リポジトリ（ユーザーページ）として公開する場合は '' にします。
const REPO_NAME = 'Recruiting';
const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: isProd ? `/${REPO_NAME}` : '',
  assetPrefix: isProd ? `/${REPO_NAME}/` : '',
  trailingSlash: true,
};

module.exports = nextConfig;
