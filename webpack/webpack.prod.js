const { DefinePlugin } = require("webpack");
require("dotenv").config({ path: ".env.production" });

module.exports = {
  mode: "production",
  plugins: [
    new DefinePlugin({
      "process.env": JSON.stringify(process.env),
    }),
  ],
};
