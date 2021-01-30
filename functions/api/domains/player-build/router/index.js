const exporessPromiseRouter = require("express-promise-router");

const router = exporessPromiseRouter();

const injector = (app) => {
  app.use("/build", router);
};

module.exports = injector;
