"use strict";

const express = require("express");
const cors = require("cors");

const logger = require("./api-server/src/middleware/logger.js");
const errorHandlerAuth = require("./auth-server/src/auth/error-handlers/500.js");
const notFound = require("./auth-server/src/auth/error-handlers/404.js");
const authRoutes = require("./auth-server/src/auth/routes.js");

const v1Routes = require("./api-server/src/routes/v1.js");
const v2Routes = require("./api-server/src/routes/v2.js");

const app = express();

app.use(express.json());

app.use(logger);

app.use("/api/v1", v1Routes);
app.use("/api/v2", v2Routes);

app.use(cors());

app.use(express.urlencoded({ extended: true }));

app.use(authRoutes);

app.use(notFound);
app.use(errorHandlerAuth);

module.exports = {
  server: app,
  start: (PORT) => {
    if (!PORT) {
      throw new Error("Missing PORT");
    }
    app.listen(PORT, () => console.log(`Listening on ${PORT}`));
  },
};
