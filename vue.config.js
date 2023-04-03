const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  // devServer: {
  //   proxy: {
  //     '/m1/2355324-0-default': {
  //       target: 'https://mock.apifox.cn',
  //       ws: true, //代理websocked
  //       changeOrigin: true,
  //       secure: true, //target是否为https接口
  //       pathRewrite: {
  //         '^/m1/2355324-0-default': '' //更改请求URL
  //       }
  //     }
  //   }
  // },
  transpileDependencies: true,
  configureWebpack: config => {
    config.module.rules.push({
      test: /\.glsl$/,
      use: [
        {
          loader: 'webpack-glsl-loader'
        }
      ]
    })
  }
})
