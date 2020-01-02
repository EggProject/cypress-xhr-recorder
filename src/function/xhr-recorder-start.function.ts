export function xhrRecorderStart(name: string, directory?: string) {
  before(() => cy.xhrRecorderStart(name, directory));
}
