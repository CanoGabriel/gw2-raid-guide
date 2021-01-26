const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  // Proxy for local environment with firebase function emulator
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://localhost:5001/gw2-raid-guide/us-central1/api",
      changeOrigin: true,
    }),
  );
};
