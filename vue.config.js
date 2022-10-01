const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  productionSourceMap: false,
  devServer: {
    proxy: {
      '/api': { // 表示若请求地址有 “/api” 时，触发此代理机制
        target: 'https://api.timebk.cn/', // 代理地址，后端接口地址
        ws: true, // 是否开启实时通信
        changeOrigin: true, // 是否开启跨域
        pathRewrite: { // 重写路径
          '^/api': '' // 用 /api 代替 target 里的地址，即去掉路径中的 /api
        }
      },
    }
  }
})
