import express, {Request, Response} from 'express';
import chalk from 'chalk';
import {PlayTestConfig} from '../model/play-test-config';
import {XhrStoreService} from "../service/xhr-store.service";

export function createAndStartPlayControllerApp(xhrStoreService: XhrStoreService, host = '127.0.0.1', port = 9001) {
  const controllerApp = express();

  // start-server-and-test miatt kell
  // @ts-ignore
  controllerApp.get('/', (req, res) => res.status(200).send());

  // @ts-ignore
  controllerApp.post('/load-test', async (req: Request, res: Response) => {
    const config = req.body as PlayTestConfig;
    console.log(chalk.bgRed('Load test'),config);

    const loadedFilePath = await xhrStoreService.loadFile(config);
    console.log('Loaded test', loadedFilePath);
    return res.status(200).json({ status: 'loaded', loadedFilePath });
  });

  controllerApp.listen(port, host);
  console.log(chalk.green(`Started play server controller app [http://${host}:${port}]`));
}
