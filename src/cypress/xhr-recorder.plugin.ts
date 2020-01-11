import {EnvironmentModel} from './model/environment.model';

/**
 *
 */
export class XhrRecorderPlugin {
  // static readonly createRouteWatcherParamDefaultAsName = "xhrResponse";
  // static readonly waitKeyCreateRouteWatcherParamDefaultAsName = "@xhrResponse";
  private readonly _env: EnvironmentModel;
  // @ts-ignore
  private runningOptions: {
    mode: 'record' | 'play';
    name: string;
    directory: string;
  };

  constructor() {
    this._env = new EnvironmentModel();

    if (this._env.playMode && this._env.recordMode) {
      throw new Error('[XHR Recorder plugin] Nem lehet play es record egyszerre!');
    }
  }

  /**
   * Cypress public command
   * @param name
   * @param directory
   */
  start(name: string, directory = 'record') {
    if (this._env.playMode) {
      // TODO send server load test
      this.startPlay(name, directory);
    } else {
      // TODO send server record test
      this.startRecord(name, directory);
    }
  }

  /**
   * Cypress public command
   * @param name
   * @param directory
   */
  stop() {
    if (this.runningOptions === undefined) {
      throw new Error('Xhr recorder is not running');
    }
    if (this.runningOptions.mode === 'play') {
      this.stopPlay();
    } else {
      this.stopRecord();
    }
  }

  private startPlay(name: string, directory: string) {
    this.runningOptions = { name, directory, mode: 'play' };
    // TODO hibakezeles
    cy.request('POST', `${this._env.playServerUrl}/load-test`, {
      name: name,
      directory: directory
    }).then(() => cy.log(`Started xhr play: ${directory}/${name}`));
  }

  private stopPlay() {
    delete this.runningOptions;
  }

  private startRecord(name: string, directory: string) {
    this.runningOptions = { name, directory, mode: 'record' };
    // TODO hibakezeles
    cy.request({
      method: 'POST',
      url: `${this._env.recordServerUrl}/start-record`
    }).then(() => cy.log(`Started xhr record: ${directory}/${name}`));
  }

  private stopRecord() {
    // TODO wait eltavolitasa
    // TODO hibakezeles
    return new Cypress.Promise(resolve =>
      cy
        // azert kell az idozito mert van hogy a teszt leallt a felulet meg egy folyamatban van es igy van idejuk befutni a maradek xhr-nek
        .wait(2000)
        .request({
          method: 'POST',
          url: `${this._env.recordServerUrl}/finish-record?record_name=${this.runningOptions.name}&directory=${this.runningOptions.directory}`
        })
        .then(response => {
          delete this.runningOptions;
          cy.log(`Write directory: ${response.body.writeDirectory}`);
          resolve(response);
        })
    );
  }

  get env(): EnvironmentModel {
    debugger
    return this._env;
  }

  disableNextRecord() {
    cy.request({
      method: 'POST',
      url: `${this._env.recordServerUrl}/disable-next-record`
    }).then(() => cy.log(`Disable next request record`));
  }
}
