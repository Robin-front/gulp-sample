const cssnano = require("cssnano");
const cssnext = require("postcss-cssnext");
const px2rem = require("postcss-px2rem");
const sprites = require("postcss-sprites");
const config = require("./config.js");

const isMobile = process.env.NODE_ENV === "mobile";
const noop = function() {};

const opts = {
  stylesheetPath: "./build/css",
  spritePath: "./build/imgs/",
  filterBy: function(image) {
    // Allow only png files
    // background: url(../imgs/logo.png?__sprite) no-repeat;
    if (!/__sprite/.test(image.originalUrl)) {
      return Promise.reject();
    }
    return Promise.resolve();
  },
  spritesmith: {
    padding: 4
  }
};
module.exports = {
  plugins: [
    cssnext({
      browsers: [">1%", "last 5 versions", "Firefox ESR"],
      flexbox: "no-2009"
    }),
    isMobile ? px2rem({ remUnit: config.remUnit }) : noop,
    cssnano({
      autoprefixer: false,
      discardComments: {
        // 删除所有css注释
        removeAll: true
      },
      safe: true,
      sourcemap: false
    }),
    sprites(opts)
  ]
};
