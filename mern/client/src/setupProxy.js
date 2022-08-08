const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'https://armytube-server.run.goorm.io',
            changeOrigin: true,
        })
    );
};