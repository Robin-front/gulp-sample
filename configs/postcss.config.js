
const cssnano = require('cssnano');
const px2rem = require('postcss-px2rem');
// const px2rem = require('postcss-plugin-px2rem');
const config = require('./config.js');
// var sprites = require('postcss-sprites');

const isMobile = (process.env.NODE_ENV === 'mobile');
const noop = function (){};

// var opts = {
// 	stylesheetPath: './dist/css',
// 	spritePath: './dist/imgs/sprite/'
// };

// const pxtoremOpt = {
//   rootValue: config.remUnit,
//   unitPrecision: 5,
//   propWhiteList: [],
//   propBlackList: ['font-size', 'border'],
//   selectorBlackList: [],
//   ignoreIdentifier: false,
//   replace: true,
//   mediaQuery: true,
//   minPixelValue: 2
// };

module.exports = {
  plugins: [
    (isMobile?px2rem({remUnit: config.remUnit}):noop),
    cssnano({
      autoprefixer: { // 添加css浏览器前缀
        add: true,
        remove: true,
        browsers: ['>0.1%']
      },
      discardComments: { // 删除所有css注释
        removeAll: true
      },
      safe: true,
      sourcemap: false
    }),
    // sprites(opts),
    ]
}
