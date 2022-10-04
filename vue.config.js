const { defineConfig } = require('@vue/cli-service')
const TerserPlugin = require("terser-webpack-plugin");
const CompressionWebpackPlugin = require('compression-webpack-plugin');// gzip压缩

//加载path模块
const path = require('path')
//定义resolve方法，把相对路径转换成绝对路径
const resolve = dir => path.join(__dirname, dir)

module.exports = defineConfig({
  transpileDependencies: true,
  productionSourceMap: false, //去除生产环境的 productionSourceMap
  devServer: {
    open: true, // 自动启动浏览器
    host: 'localhost', // localhost
    proxy: {
      '/api': { // 自己的后端接口，表示若请求地址有 “/api” 时，触发此代理机制
        target: 'https://api.timebk.cn/', // 代理地址，后端接口地址
        // ws: true, // 是否开启实时通信
        changeOrigin: true, // 是否开启代理，在本地创建一个虚拟服务端
        pathRewrite: { // 重写路径
          '^/api': '' // 用 /api 代替 target 里的地址，即去掉路径中的 /api
        }
      },
      '/csdn': {// csdn接口
        target: 'https://blog.csdn.net/',
        // ws: true, 
        changeOrigin: true,
        pathRewrite: {
          '^/csdn': ''
        },
      },
    }
  },
  configureWebpack: config => {
    return {
      plugins: [
        new TerserPlugin({
          parallel: true, // 多进程
          terserOptions: {
            ecma: undefined,
            warnings: false,
            parse: {},
            compress: {
              drop_console: true,// 移除所有console相关代码；
              drop_debugger: true,// 移除自动断点功能；
              pure_funcs: ['console.log'], // 配置移除指定的指令，如console.log,alert等
            },
            format: {
              comments: false,// 去掉注释
            },
          },
        }),
        new CompressionWebpackPlugin({// gzip压缩
          filename: '[path][base].gz',
          algorithm: 'gzip',
          // 要压缩的文件（正则）
          test: /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i,
          // 最小文件开启压缩
          threshold: 10240,
          minRatio: 0.8
        })
      ],
    }
  },
  chainWebpack: config => {
    // 添加别名
    config.resolve.alias
      .set('@', resolve('src'))
      .set('#', resolve('./'))// 根目录
  },
  outputDir: 'dist', // 打包后文件的目录 （默认为dist）
  assetsDir: 'static', //  outputDir的静态资源(js、css、img、fonts)目录  默认为‘’没有单独目录js/css/img在根目录中。
})