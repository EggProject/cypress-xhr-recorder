/**
 * hu: Xhr felvetelt lehet elinditani cypress-ben
 *
 * en: Start Xhr record in cypress
 *
 * @param name record name
 * @param directory record save file directory
 */
export function xhrRecorderStart(name: string, directory?: string) {
  before(() => cy.xhrRecorderStart(name, directory));
}
