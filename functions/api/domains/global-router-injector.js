const raidInjector = require("./raid");
const userInjector = require("./user/router");

const globalRouterInjector = (app) => {
  raidInjector(app);
  userInjector(app);
  return app;
};

module.exports = globalRouterInjector;
