# favicon-hash-change-webpack-plugin

a webpack plugin for modifying the favicon hash

usage:

```js
npm install favicon-hash-change-webpack-plugin --save-dev
```

used in vue.config.js:

```js
  const FaviconHashChangePlugin = require('favicon-hash-change-webpack-plugin');
  chainWebpack(config) {
    config.plugin('favicon-hash-change').use(FaviconHashChangePlugin, ["./public/favicon.ico"]) // path to favicon. defalut : ./public/favicon.ico
  }

  // or

  plugins: [
    new FaviconHashChangePlugin('./public/favicon.ico')
  ]

```
