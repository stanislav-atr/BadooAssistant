const path = require("path");

module.exports = {
  entry : "./index.js",
  output : {
    path: path.resolve(__dirname, "dist"),
    filename: "badoo-assistant.userscript.js",
    clean: true,
  },
  mode: 'development',
//   watch: true,
//   watchOptions: {
//       ignored: '**/node_modules',
//   },
};