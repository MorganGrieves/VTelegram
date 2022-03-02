const path = require('path');

module.exports = {
    mode: 'production',
    entry: {
        content: './public/js/content.js',
        background: './public/js/background.js'
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'build/js/')
    },
    performance: {
        hints: false,
        maxEntrypointSize: 512000,
        maxAssetSize: 512000
    }
};
