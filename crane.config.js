const visPage = require('./crane/vis/index');
module.exports = {
  name: 'attention',

  // i18n 配置
  lang: {},
  // 屏幕默认尺寸, 所有页面都继承该值，页面可单独设置
  size: [1920, 1080],
  requestSettings: {
    baseURL: 'https://yqfw.cdyoue.com/',
  },
  modules: {
    '@byzanteam/vis-components': {
      version: '../vis-components',
      style: {
        type: 'normal',
        path: 'dist/index.css',
      },
    },
    '@byzanteam/map-ui': {
      version: 'latest',
    },
    '@byzanteam/graphite': {
      version: 'latest',
    },
    '@byzanteam/carbonium': {
      version: 'latest',
      style: {
        type: 'normal',
        path: 'dist/carbonium.css',
      },
    },
    '@byzanteam/brick': {
      version: 'latest',
      style: {
        type: 'injection',
        path: 'src/theme/default.scss'
      }
    },
    'vue-echarts': {
      version: 'latest',
    },
    'echarts': {
      version: 'latest',
    }
  },
  // 页面
  pages: [
    visPage,
  ],
};
