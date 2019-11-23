// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

module.exports = {
    build: {
        env: require('./prod.env'),
        //index: path.resolve(__dirname, '../dist/index.html'),
        //assetsRoot: path.resolve(__dirname, '../dist'),
        //	index: path.resolve(__dirname, 'D:/workspace-X-ALL/2017newPerBankBefore/newPerBank/WebContent/index.html'),
        //    assetsRoot: path.resolve(__dirname, 'D:/workspace-X-ALL/2017newPerBankBefore/newPerBank/WebContent'),
        //    index: path.resolve(__dirname, 'D:/workspace-X-ALL/201708perbankML/perbank/WebContent/index.html'),
        //    assetsRoot: path.resolve(__dirname, 'D:/workspace-X-ALL/201708perbankML/perbank/WebContent'),
        index: path.resolve(__dirname, 'D:/daban_project/coporbank_web/index.html'),
        assetsRoot: path.resolve(__dirname, 'D:/daban_project/coporbank_web'),
        assetsSubDirectory: 'static',
        assetsPublicPath: '/corpbank/',
        productionSourceMap: true,
        // Gzip off by default as many popular static hosts such as
        // Surge or Netlify already gzip all static assets for you.
        // Before setting to `true`, make sure to:
        // npm install --save-dev compression-webpack-plugin
        productionGzip: false,
        productionGzipExtensions: ['js', 'css'],
        // Run the build command with an extra argument to
        // View the bundle analyzer report after build finishes:
        // `npm run build --report`
        // Set to `true` or `false` to always turn it on or off
        bundleAnalyzerReport: process.env.npm_config_report
    },
    dev: {
        env: require('./dev.env'),
        port: 8078,
        autoOpenBrowser: true,
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        proxyTable: {
            '/api': {
                // target: 'http://10.1.90.54:8082/perbank/',
                // target: 'http://10.64.24.18:8099/perbank/',
                // target: 'http://10.1.86.149:8004/innerService/',
                //  target: 'http://10.1.86.144:7725/perbank/',
                // target: 'http://127.0.0.1:8080/innerManagement_mobile/',
                target: 'http://127.0.0.1:8080/coporbank',
                //target: 'http://10.120.251.38:8080/coporbank',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        },
        // CSS Sourcemaps off by default because relative paths are "buggy"
        // with this option, according to the CSS-Loader README
        // (https://github.com/webpack/css-loader#sourcemaps)
        // In our experience, they generally work as expected,
        // just be aware of this issue when enabling this option.
        cssSourceMap: false
    }
}