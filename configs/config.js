
// 手机版设置
const remUnit = 75;

// 需要额外复制的文件
const needCopyFiles = [
  { from: 'src/js/flexible.min.js', to: 'build/js' },
    // { from: 'src/imgs', to: 'imgs' },
    // { from: 'src/*.html', to: '[name].[ext]' },
];

module.exports = {
  remUnit: remUnit,
  needCopyFiles: needCopyFiles,
}
