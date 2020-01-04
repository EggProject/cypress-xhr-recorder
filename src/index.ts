/// <reference types="cypress" />

import {XhrRecorderPlugin} from './xhr-recorder.class';
import {isNil} from './type-guard/is-nil';

export const xhrRecorderPlugin = new XhrRecorderPlugin();
export function start(name: string, directory?: string): void {
  xhrRecorderPlugin.start(name, directory);
}

export function stop(): void {
  if (isNil(xhrRecorderPlugin)) {
    throw new Error('Xhr recoder or player is not running');
  }
  xhrRecorderPlugin.stop();
}

Cypress.Commands.add('xhrRecorderStart', { prevSubject: false }, start);
Cypress.Commands.add('xhrRecorderStop', { prevSubject: false }, stop);
