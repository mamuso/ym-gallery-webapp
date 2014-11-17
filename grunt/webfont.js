module.exports = {
  icons: {
    src: 'iconfont/*.svg',
    dest: 'public/assets/fonts',
    options: {
      htmlDemo: true,
      stylesheet: 'scss',
      relativeFontPath: 'fonts',
      templateOptions: {
        baseClass: 'ymicon',
        classPrefix: 'ymicon_',
        mixinPrefix: 'ymicon-'
      }
    }
  }
}