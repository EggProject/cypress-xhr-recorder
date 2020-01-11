/// <reference types="cypress" />

import {XhrRecorderPlugin} from './cypress/xhr-recorder.plugin';
import {isNil} from './type-guard/is-nil';

const xhrRecorderPlugin = new XhrRecorderPlugin();

// commands
export function start(name: string, directory?: string) {
  xhrRecorderPlugin.start(name, directory);
}

export function stop() {
  if (isNil(xhrRecorderPlugin)) {
    throw new Error('Xhr recoder or player is not running');
  }
  xhrRecorderPlugin.stop();
}

export function disableNextRecord() {
  if (isNil(xhrRecorderPlugin)) {
    throw new Error('Xhr recoder or player is not running');
  }
  xhrRecorderPlugin.disableNextRecord();
}

export function getXhrRecorderInstance() {
  return xhrRecorderPlugin;
}
// commands register
Cypress.Commands.add('xhrRecorderStart', start);
Cypress.Commands.add('xhrRecorderStop', stop);
Cypress.Commands.add('xhrRecorderDisableNextRecord', disableNextRecord);
Cypress.Commands.add('xhrRecorderGetXhrRecorderInstance', getXhrRecorderInstance);

// TODO refactor
// re-export (ts barrel)
export { getRecordKeyFromRequest } from './node/helper/get-record-key-from-request.function';
export { xhrRecorderStart } from './cypress/function/xhr-recorder-start.function';
export { xhrRecorderStop } from './cypress/function/xhr-recorder-stop.function';
export { XhrRecorderPlugin } from './cypress/xhr-recorder.plugin';
