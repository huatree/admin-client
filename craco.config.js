const { resolve } = require('path')
const CracoLessPlugin = require('craco-less')

module.exports = {
  webpack: {
    alias: {
      '@': resolve('src'),
      components: resolve('src/components'),
      assets: resolve('src/assets'),
      api: resolve('src/api'),
      utils: resolve('src/utils'),
      pages: resolve('src/pages')
    }
  },
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { '@primary-color': '#1951be', '@border-radius-base': '4px' },
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
  },
  devServer: {
    proxy: {
      '/v1': {
        target: 'http://39.100.225.255:5000',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/v1': ''
        }
      }
    }
  }
}
