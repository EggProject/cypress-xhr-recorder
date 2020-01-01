/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable<Subject> {
    xhrRecorderStart(name: string, directory?: string): void;
    xhrRecorderStop(): void;
  }
}
