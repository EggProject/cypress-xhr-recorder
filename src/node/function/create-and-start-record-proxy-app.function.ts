import {RecordStateModel} from '../model/record-state.model';
import chalk from 'chalk';
import express from 'express';

const proxy = require('express-http-proxy');

export function createAndStartRecordProxyApp(
  state: RecordStateModel,
  listenHost = '127.0.0.1',
  listenPort = 8000,
  forwardHost = '127.0.0.1',
  forwardPort = 9000
) {
  const proxyApp = express();

  proxyApp.use(
    '/',
    proxy(`${listenHost}:${listenPort}`, {
      userResDecorator: function(proxyRes: any, proxyResData: any, userReq: { url: string }) {
        if (userReq.url.indexOf('/start-record') === -1 && userReq.url.indexOf('/stop-record') === -1) {
          console.log(chalk.cyan(`proxy url: ${userReq.url}`));

          const body = proxyResData.toString('utf8');
          if (!Array.isArray(state.queue[userReq.url])) {
            state.queue[userReq.url] = [];
          }
          state.queue[userReq.url].push({
            url: userReq.url,
            headers: { ...proxyRes.headers },
            statusCode: proxyRes.statusCode,
            statusMessage: proxyRes.statusMessage,
            body: body !== undefined && body.length > 0 ? JSON.parse(proxyResData.toString('utf8')) : ''
          });
        }
        return proxyResData;
      }
    })
  );

  proxyApp.listen(forwardPort, forwardHost);
  console.log(chalk.green(`Started record server proxy app [http://${listenHost}:${listenPort}]`));
}
