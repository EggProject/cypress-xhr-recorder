import {StateModel} from "../model/state.model";
import express, {Request, Response} from "express";
import chalk from "chalk";
import * as fs from "fs";

export function createAndStartControllerApp(state: StateModel, port = 9001) {
  const userDir = process.cwd();
  const controllerApp = express();

  // @ts-ignore
  controllerApp.post("/start-record", (req: Request, res: Response) => {
    console.log(chalk.bgRed("START RECORD"));
    state.queue = {};
    state.run = true;
    return res.send("STARTED");
  });

  controllerApp.post("/finish-record", (req: Request, res: Response) => {
    console.log(chalk.bgGreen(`FINISH RECORD: ${JSON.stringify(req.query)}`));
    const directory = req.query.directory;
    const recordName = req.query.record_name;
    if (
      typeof directory !== "string" ||
      typeof recordName !== "string" ||
      directory.length === 0 ||
      recordName.length === 0
    ) {
      throw new Error("Wrong params");
    }

    const filePath = `${userDir}/apps/hu-frontend-e2e/src/fixtures/${directory}/${recordName}.json`;
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
    fs.writeFileSync(filePath, JSON.stringify(state.queue));

    state.queue = {};
    state.run = false;
    return res.send("FINISHED");
  });

  controllerApp.listen(9001);
  console.log(
    chalk.green(
      `Started record server controller app [http://localhost:${port}]`
    )
  );
}
