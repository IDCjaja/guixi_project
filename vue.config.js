module.exports = {
  publicPath: '/guixi_test',
  outputDir: 'guixi',
  pluginOptions: {
    i18n: {
      locale: 'yes',
      fallbackLocale: 'yes',
      localeDir: 'yes',
      enableInSFC: true,
    },
  },
  css: {
    loaderOptions: {
      sass: {
        includePaths: [
          './src/styles/',
        ],
        data: '@import \'injects\';',
      },
    },
  },
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:8848',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/api': 'http://localhost:8848'
        }
      },
      '/v4': {
        target: 'https://gxzh.cdht.gov.cn/api',
        ws: true,
        changeOrigin: true,
      },
      '/v1': {
        target: 'https://gxzh.cdht.gov.cn/api',
        ws: true,
        changeOrigin: true,
      },
      '/oauth': {
        target: 'https://gxzh.cdht.gov.cn',
        ws: true,
        changeOrigin: true,
      },
    }
  }
}
