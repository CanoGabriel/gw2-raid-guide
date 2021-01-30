const raidInjector = require("./raid");
const userInjector = require("./user/router");
const playerBuildInjector = require("./player-build/router");

const globalRouterInjector = (app) => {
  raidInjector(app);
  userInjector(app);
  playerBuildInjector(app);
  return app;
};

module.exports = globalRouterInjector;
