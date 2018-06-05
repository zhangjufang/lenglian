'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"'
  // API_ROOT: '"//192.168.1.8/api"'//测试环境的接口
})
