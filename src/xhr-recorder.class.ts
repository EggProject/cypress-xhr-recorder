export class XhrRecorderPlugin {
  // static readonly createRouteWatcherParamDefaultAsName = "xhrResponse";
  // static readonly waitKeyCreateRouteWatcherParamDefaultAsName = "@xhrResponse";
  private readonly recordMode = Cypress.env('XHR_MODE_RECORD') === 1;
  private readonly playMode = Cypress.env('XHR_MODE_PLAY') === 1;
  private readonly recordServerURL = Cypress.env('XHR_RECORD_SERVER_URL') || 'http://localhost:9001';
  private readonly playServerURL = Cypress.env('XHR_PLAY_SERVER_URL') || 'http://localhost:9000';
  // @ts-ignore
  private runningOptions: {
    mode: 'record' | 'play';
    name: string;
    directory: string;
  };

  constructor() {
    if (this.playMode && this.recordMode) {
      throw new Error('[XHR Recorder plugin] Nem lehet play es record egyszerre!');
    }
    // if (XhrRecorderPlugin._INSTANCE !== undefined) {
    //   throw new Error("[XHR Recorder plugin] Double new!");
    // }
    // XhrRecorderPlugin._INSTANCE = this;

    this.init();
  }

  /**
   * plugin class init
   */
  private init(): void {
    cy.log('[XhrRecorder plugin] inited');
    // TODO load nodejs script
  }

  /**
   * Cypress public command
   * @param name
   * @param directory
   */
  start(name: string, directory = 'record') {
    if (this.playMode === true) {
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
    cy.request('POST', `${this.playServerURL}/__load-test`, {
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
      url: `${this.recordServerURL}/start-record`
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
          url: `${this.recordServerURL}/finish-record?record_name=${this.runningOptions.name}&directory=${this.runningOptions.directory}`
        })
        .then(response => {
          delete this.runningOptions;
          cy.log(`Write directory: ${response.body.writeDirectory}`);
          resolve(response);
        })
    );
  }
}
