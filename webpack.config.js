const path = require('path');
const base_js_dir = './ui/static/js/';
 
module.exports = {
    mode: 'development',
    entry:{
        base: ['idempotent-babel-polyfill', base_js_dir + 'base.js'],
        slide_show: ['idempotent-babel-polyfill', base_js_dir + 'slide_show.js'],
        // admin: ['babel-polyfill','./ui/static/js/admin.js'],
        // helpers: ['babel-polyfill','./ui/static/js/helpers.js'],
        // super_admin: ['babel-polyfill','./ui/static/js/super_admin.js'],
        // signup: ['babel-polyfill','./ui/static/js/signup.js'],
        // signin: ['babel-polyfill','./ui/static/js/signin.js'],
        // hello: ['babel-polyfill', './ui/static/js/hello.js']
        // form_validation: ['babel-polyfill','./ui/static/js/form_validation.js'],
    },
    output: {
        path: path.resolve(__dirname, 'ui/static/js/build/'),
        publicPath: '/ui/static/js/build',
        filename: '[name].js'
    },
    module:{
        rules:[{
            test: /\.js?$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
                presets:['env', 'stage-0']
            }
        }]
    }
}