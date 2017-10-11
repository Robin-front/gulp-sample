
// 手机版设置
const remUnit = 75;

// 需要合并的 类库
const vendor = [ // 相对根目录
  // './src/js/zepto.js',
  // './src/js/touch.js',
  // './src/js/transform.js',
  // './src/js/swiper.min.js',
  // './src/js/finger.js',
  // './src/js/to.js',
  // './src/js/fastclick.min.js'
];

// 需要额外复制的文件
const needCopyFiles = [
  { from: 'src/js/flexible.min.js', to: 'js' },
    // { from: 'src/imgs', to: 'imgs' },
    // { from: 'src/*.html', to: '[name].[ext]' },
];

module.exports = {
  vendor: vendor,
  remUnit: remUnit,
  needCopyFiles: needCopyFiles,
}
