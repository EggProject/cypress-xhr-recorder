import chalk from 'chalk';
import express from 'express';
import {XhrStoreService} from '../service/xhr-store.service';
import {XhrResponse} from '../service/model/xhr.response';
import {JsonParseErrorException} from '../service/exception/json-parse-error.exception';

export function createAndStartPlayProxyApp(xhrStoreService: XhrStoreService, listenHost = '127.0.0.1', listenPort = 8000) {
  const proxyApp = express();

  proxyApp.all('*', (req, res) => {
    if (req.url === '/__wait') {
      // start-server-and-test miatt kell
      return res.status(200).send();
    }
    console.log('[Mock] get request: ', req.baseUrl);
    console.log('Search: ', req.url);

    const nextResponse: XhrResponse = xhrStoreService.getNextStepResponse(req.originalUrl);
    console.log('Get request mock:', req.originalUrl);
    console.log('Found next mock url:', nextResponse.url);
    if (nextResponse === undefined || nextResponse === null) {
      console.log('Not found url in store:', req.originalUrl);
    }
    if (nextResponse.headers !== undefined) {
      Object.entries(nextResponse.headers as { [key: string]: string }).forEach(entry => res.set(entry[0], entry[1]));
    }

    res = res.status(
      nextResponse.statusCode !== undefined && nextResponse.statusCode !== null && typeof nextResponse.statusCode === 'number'
        ? nextResponse.statusCode
        : 200
    );

    if (typeof nextResponse.body === 'object' || Array.isArray(nextResponse.body)) {
      return res.json(nextResponse.body);
    } else {
      if (nextResponse.body) {
        try {
          return res.json(nextResponse.body);
        } catch (e) {
          throw new JsonParseErrorException();
        }
      }
    }
    return res.send(nextResponse.body);
  });

  proxyApp.listen(listenPort, listenHost);
  console.log(chalk.green(`Started play server proxy app [http://${listenHost}:${listenPort}]`));
}
