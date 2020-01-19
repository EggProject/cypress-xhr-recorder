import {RecordStateModel} from '../model/record-state.model';
import express from 'express';
import {getRecordKeyFromRequest} from '../helper/get-record-key-from-request.function';
import debug from 'debug';
import {DEBUG_PREFIX} from "../../debug-prefix";

const proxy = require('express-http-proxy');

const _debug = debug(`${DEBUG_PREFIX}record:proxy:app`);
/**
 *
 * @param state
 * @param listenHost
 * @param listenPort
 * @param forwardHost
 * @param forwardPort
 */
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
      userResDecorator: function(proxyRes: any, proxyResData: any, userReq: { url: string; method: string }) {
        // check disable next record
        if (state.disableNextRecord) {
          state.disableNextRecord = false;
          return proxyResData;
        }
        // record request
        const recordKey = getRecordKeyFromRequest(userReq);
        _debug(`proxy url: ${recordKey}`);

        const body = proxyResData.toString('utf8');
        if (!Array.isArray(state.queue[recordKey])) {
          // if not exist, create init array
          state.queue[recordKey] = [];
        }
        state.queue[recordKey].push({
          method: userReq.method,
          url: userReq.url,
          headers: { ...proxyRes.headers },
          statusCode: proxyRes.statusCode,
          statusMessage: proxyRes.statusMessage,
          body: body !== undefined && body.length > 0 ? JSON.parse(proxyResData.toString('utf8')) : ''
        });
        return proxyResData;
      }
    })
  );

  proxyApp.listen(forwardPort, forwardHost);
  _debug(`Started record server proxy app [http://${listenHost}:${listenPort}]`);
}
