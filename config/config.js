/* eslint-disable react/destructuring-assignment */

// https://umijs.org/config/

const path = require('path');

export default {
  // add for transfer to umi
  plugins: [
    'umi-plugin-dva',
    [
      'umi-plugin-routes',
      {
        exclude: [/\.test\.js/],
      },
    ],
  ],
  disableServiceWorker: true,

  // copy from old webpackrc.js

  // entry: 'src/index.js', // TODO remove
  extraBabelPlugins: [['import', { libraryName: 'antd', libraryDirectory: 'es', style: true }]],
  env: {
    development: {
      extraBabelPlugins: ['dva-hmr'],
    },
  },
  externals: {
    '@antv/data-set': 'DataSet',
    bizcharts: 'BizCharts',
    rollbar: 'rollbar',
  },
  alias: {
    components: path.resolve(__dirname, '../src/components/'),
  },
  ignoreMomentLocale: true,
  theme: './src/theme.js',
  // html: { TODO remove
  //   template: './src/index.ejs',
  // },
  publicPath: '/',
  // TODO check hash config
  // hash: true,
  lessLoaderOptions: {
    javascriptEnabled: true,
  },
  cssLoaderOptions: {
    modules: true,
    getLocalIdent: (context, localIdentName, localName) => {
      if (
        context.resourcePath.includes('node_modules') ||
        context.resourcePath.includes('ant.design.pro.less')
      ) {
        return localName;
      }
      const antdProPath = context.resourcePath.match(/src(.*)/)[1].replace('.less', '');
      const arr = antdProPath
        .split('/')
        .map(a => a.replace(/([A-Z])/g, '-$1'))
        .map(a => a.toLowerCase());
      return `antd-pro${arr.join('-')}-${localName}`.replace(/--/g, '-');
    },
  },
};
