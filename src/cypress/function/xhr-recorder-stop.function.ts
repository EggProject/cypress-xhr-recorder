/**
 * hu: Leallitja cypress-ben a felvetelt
 *
 * en: Stop recording in cypress
 */
export function xhrRecorderStop() {
  after(() => cy.xhrRecorderStop());
}
