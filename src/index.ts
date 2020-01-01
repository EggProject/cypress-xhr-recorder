/// <reference types="cypress" />

import {XhrRecorderPlugin} from "./xhr-recorder.class";
// import "typing";
import {isNil} from "./type-guard/is-nil";

// export default function initXhrRecorderPlugin(
//   name: string,
//   directory?: string
// ): Chainable<any> {
//   if (name === undefined || name === null || name.length === 0) {
//     throw new Error("[XHR Recorder plugin] Init command not found name!");
//   }
//   const plugin = new XhrRecorderPlugin();
//
//   if (directory !== undefined && directory !== null) {
//     plugin.directory = directory;
//   }
//   plugin.name = name;
//   return cy.wrap(plugin);
// }

let xhrRecorderPlugin: XhrRecorderPlugin;
export function start(name: string, directory?: string): void {
  xhrRecorderPlugin = new XhrRecorderPlugin();
  xhrRecorderPlugin.start(name, directory);
}

export function stop(): void {
  if (isNil(xhrRecorderPlugin)) {
    throw new Error("Xhr recoder or player is not running");
  }
  xhrRecorderPlugin.stop();
}

Cypress.Commands.add("xhrRecorderStart", { prevSubject: false }, start);
Cypress.Commands.add("xhrRecorderStop", { prevSubject: false }, stop);
