module.exports = {
  devServer: {
    open: true,
    // 反向代理
    proxy: {
      // 配置的代理规则 只要是以/api开头的url地址都会被代理
      '/api': {
        target: 'http://localhost:3000/',
        pathRewrite: { '^/api': '' }
      }
    }
  },
  // 覆盖webpack的配置参数
  configureWebpack: {
    externals: {
      // 排除的模块名
      // 参数1 排除的模块名
      // 参数2 全局变量名
      vue: 'Vue',
      'vue-router': 'VueRouter',
      moment: 'moment',
      axios: 'axios'
    }
  }
}
