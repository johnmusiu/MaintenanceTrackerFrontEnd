const path = require('path')
const baseJsDir = './ui/static/js/'

module.exports = {
  mode: 'development',
  entry: {
    base: baseJsDir + 'base.js',
    slide_show: baseJsDir + 'slide_show.js',
    adminDashboard: baseJsDir + 'admin.js',
    superAdmin: baseJsDir + 'super_admin.js',
    signup: baseJsDir + 'signup.js',
    userDashboard: baseJsDir + 'user_dashboard.js',
    signin: baseJsDir + 'signin.js'
    // form_validation: ['babel-polyfill','./ui/static/js/form_validation.js'],
  },
  output: {
    path: path.resolve(__dirname, 'ui/static/js/build/'),
    publicPath: '/ui/static/js/build',
    filename: '[name].js'
  },
  module: {
    rules: [{
      test: /\.js?$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      query: {
        presets: ['env', 'stage-2']
      }
    }]
  }
}
