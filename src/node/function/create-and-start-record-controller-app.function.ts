import {RecordStateModel} from '../model/record-state.model';
import express, {Request, Response} from 'express';
import chalk from 'chalk';
import * as fs from 'fs';

export function createAndStartRecordControllerApp(state: RecordStateModel, host = '127.0.0.1', port = 9001) {
  const userDir = process.cwd();
  const controllerApp = express();

  // start-server-and-test miatt kell
  // @ts-ignore
  controllerApp.get('/', (req, res) => res.status(200).send())

  // @ts-ignore
  controllerApp.post('/start-record', (req: Request, res: Response) => {
    console.log(chalk.bgRed('START RECORD'));
    state.queue = {};
    return res.send('STARTED');
  });

  controllerApp.post('/finish-record', (req: Request, res: Response) => {
    console.log(chalk.bgGreen(`FINISH RECORD: ${JSON.stringify(req.query)}`));
    const directory = req.query.directory;
    const recordName = req.query.record_name;
    if (typeof directory !== 'string' || typeof recordName !== 'string' || directory.length === 0 || recordName.length === 0) {
      throw new Error('Wrong params');
    }

    const directoryPath = `${userDir}/${directory}`;
    const filePath = `${directoryPath}/${recordName}.json`;
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
    if (!fs.existsSync(directoryPath)) {
      fs.mkdirSync(directoryPath);
    }
    fs.writeFileSync(filePath, JSON.stringify(state.queue));

    state.queue = {};
    return res.json({ status: 'FINISHED', writeDirectory: directoryPath });
  });

  controllerApp.listen(9001, host);
  console.log(chalk.green(`Started record server controller app [http://${host}:${port}]`));
}
