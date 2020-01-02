export function xhrRecorderStop() {
  after(() => cy.xhrRecorderStop());
}
