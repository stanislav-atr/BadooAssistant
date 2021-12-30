const path = require("path");

module.exports = {
  entry : "./index.js",
  output : {
    path: path.resolve(__dirname, "dist"),
    filename: "badoo-auto-filter.userscript.js",
    clean: true,
  },
  mode: 'development',
//   watch: true,
//   watchOptions: {
//       ignored: '**/node_modules',
//   },
};