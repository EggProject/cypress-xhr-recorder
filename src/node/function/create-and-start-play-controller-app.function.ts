import express, {Request, Response} from 'express';
import chalk from 'chalk';
import {PlayTestConfig} from '../model/play-test-config';
import {XhrStoreService} from '../service/xhr-store.service';
import bodyParser from 'body-parser';
import {PlayStateModel} from '../model/play-state.model';
import {addDisableNextRecordRoute} from '../helper/add-disable-next-record-route.function';

/**
 *
 * @param state
 * @param xhrStoreService
 * @param host
 * @param port
 */
export function createAndStartPlayControllerApp(state: PlayStateModel, xhrStoreService: XhrStoreService, host = '127.0.0.1', port = 9001) {
  const controllerApp = express();
  controllerApp.use(bodyParser.json());
  // start-server-and-test miatt kell
  // @ts-ignore
  controllerApp.get('/', (req, res) => res.status(200).send());

  // @ts-ignore
  controllerApp.post('/load-test', async (req: Request, res: Response) => {
    const config = req.body as PlayTestConfig;
    console.log(chalk.bgRed('Load test'), config);

    const loadedFilePath = await xhrStoreService.loadFile(config);
    console.log('Loaded test', loadedFilePath);
    return res.status(200).json({ status: 'loaded', loadedFilePath });
  });

  addDisableNextRecordRoute(controllerApp, state);

  controllerApp.listen(port, host);
  console.log(chalk.green(`Started play server controller app [http://${host}:${port}]`));
}
