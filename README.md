# tate-tweet
ツイートを縦書きでつぶやくたの変換アプリです。

* 縦書きに変換した結果をクリップボードにコピーあるいはTwitterを起動し、ツイート編集画面に貼り付けます。
* 縦書きの行間を3段階で調整できます。
* 絵文字が使用できます（ただし、フォントと幅が違うため使用箇所に注意が必要）

![サムネ](https://user-images.githubusercontent.com/47315420/163192420-78ebd8c3-846c-4ffe-a5f3-16ad5c18e247.jpg)

## 使用している技術、サービス及びライブラリ
### [grapheme-splitter](https://github.com/orling/grapheme-splitter)
* 文字列をユーザーが認識する個々の文字に分割するJavaScriptライブラリ。
### [Mantine](https://mantine.dev/)
* あらゆる状況に対応できるReactコンポーネント及びフックライブラリ。
* @mantine/core: 中心となるコンポーネントライブラリ（ボタンなど）。
* @mantine/hooks: 状態及びUI管理のフック。useClipboard, useDebouncedValue を使用しました。
### [React](https://ja.reactjs.org/)
* ユーザインタフェース構築のためのJavaScriptのライブラリ
* 本アプリではプロジェクトの雛形はViteで生成しています。
### [react-dom](https://www.npmjs.com/package/react-dom)
* ReactのDOMのエントリポイントを提供するパッケージ。
* 本アプリでは、main.tsx で使っています。
### [React Router](https://reactrouter.com/)
* クライアント及びサーバーサイドのルーティングのReact用ライブラリ。
### [tabler-icons-react](https://github.com/konradkalemba/tabler-icons-react#tabler-icons-react)
* [Tabler Icons](https://tabler-icons-react.vercel.app/)のためのReactコンポーネント。
### [Twitter](https://developer.twitter.com/en)
* 本アプリでは、ツイートするためのログインやAPIの使用はありません。
* ブログ記事「[コードからツイートする方法](https://software.pitang1965.com/2022/04/22/how-to-tweet-from-the-code/)」
### [Vite](https://ja.vitejs.dev/)
* 次世代フロントエンドツール。
* 「びーと」と読みます。
* 本アプリでは、ViteによりReactとJavaScriptを用いたプロジェクトを生成しています。
* esbuildを使用して高速で快適な開発をおこない、プロダクションではRollupでバンドルします。
### [Vite Plugin PWA](https://vite-plugin-pwa.netlify.app/)
* Viteのためのフレームワークを問わないPWAプラグイン。
