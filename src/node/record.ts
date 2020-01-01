import chalk from "chalk";
import express from "express";
import {StateModel} from "./model/state.model";
import {createAndStartControllerApp} from "./function/create-and-start-controller-app.function";

const proxy = require("express-http-proxy");

// https://docs.cypress.io/guides/guides/continuous-integration.html#Boot-your-server

console.log(chalk.green("Starting record server..."));

const proxyApp = express();

// @ts-ignore
const state: StateModel = {
  run: false,
  queue: {}
};

createAndStartControllerApp(state);

proxyApp.use(
  "/",
  proxy("localhost:8000", {
    userResDecorator: function(
      proxyRes: any,
      proxyResData: any,
      userReq: { url: string }
    ) {
      if (
        userReq.url.indexOf("/start-record") === -1 &&
        userReq.url.indexOf("/stop-record") === -1
      ) {
        console.log(chalk.cyan(`proxy url: ${userReq.url}`));

        const body = proxyResData.toString("utf8");
        if (!Array.isArray(state.queue[userReq.url])) {
          state.queue[userReq.url] = [];
        }
        state.queue[userReq.url].push({
          url: userReq.url,
          headers: { ...proxyRes.headers },
          statusCode: proxyRes.statusCode,
          statusMessage: proxyRes.statusMessage,
          body:
            body !== undefined && body.length > 0
              ? JSON.parse(proxyResData.toString("utf8"))
              : ""
        });
      }
      return proxyResData;
    }
  })
);

proxyApp.listen(9000);

console.log(chalk.green("Started record server..."));
