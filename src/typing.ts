import {XhrRecorderPlugin} from './cypress/xhr-recorder.plugin';

declare global {
  namespace Cypress {
    interface Chainable {
      xhrRecorderStart: (name: string, directory?: string) => void;
      xhrRecorderStop: () => void;
      xhrRecorderDisableNextRecord: () => void;
      xhrRecorderGetXhrRecorderInstance: () => Chainable<XhrRecorderPlugin>;
    }
  }
}
