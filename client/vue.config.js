const path = require('path')

module.exports = {
  outputDir: path.resolve(__dirname, '../public'),
  devServer: {
    proxy: {
      '/api': {
        target: 'https://powerful-lowlands-30938.herokuapp.com/api'
      }
    }
  }
}