const path = require("path");

const devServer = {
  proxy: {
    "/api": {
      target: "http://localhost:5000",
    },
  },
};

module.exports = {
  outputDir: path.resolve(__dirname, "../server/public"),
  devServer,
};
