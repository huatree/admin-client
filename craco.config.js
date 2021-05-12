const CracoLessPlugin = require('craco-less')

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { '@primary-color': '#f40' },
            javascriptEnabled: true
          }
        }
      }
    }
  ],
  babel: {
    plugins: [
      ['@babel/plugin-proposal-decorators', { legacy: true }],
      [
        'import',
        {
          libraryName: 'antd',
          libraryDirectory: 'es',
          style: true
        }
      ]
    ]
  }
  // devServer: {
  //   proxy: {
  //     '/v1': {
  //       target: '',
  //       changeOrigin: true,
  //       ws: true
  //     }
  //   }
  // }
}
