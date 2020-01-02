import { xhrRecorderStart } from '../../../dist/function/xhr-recorder-start.function';

describe('Test record mode', () => {
  before(() => {
    // Delete recorded files
    cy.writeFile('cypress/fixtures/record/one-request.json', '');
    cy.writeFile('cypress/fixtures/record/to-many-request.json', '');
  });

  context('One request', () => {
    xhrRecorderStart('one-request', 'playground/cypress/fixtures/record');

    before(() => cy.visit('http://localhost:4200'));

    it('Call endpoint1', () => {
      cy.get('#endpoint1').click();
      cy.xhrRecorderStop();
    });

    it('Test saved file', () => {
      cy.readFile('cypress/fixtures/record/one-request.json').then(file => {
        const keys = Object.keys(file);
        expect(keys.length).to.equal(1);
        expect(keys[0]).to.equal('/test-endpoint1');
        expect(Array.isArray(file[keys[0]])).to.equal(true);
        expect(file[keys[0]][0].url).to.equal('/test-endpoint1');
        expect(file[keys[0]][0].body).to.deep.equal({ 'test-endpoint1': true });
      });
    });
  });

  context('To many request', () => {
    xhrRecorderStart('to-many-request', 'playground/cypress/fixtures/record');

    before(() => cy.visit('http://localhost:4200'));

    it('Call endpoint1', () => {
      cy.get('#endpoint1').click();
    });

    it('Call endpoint2', () => {
      cy.get('#endpoint2').click();
      cy.xhrRecorderStop();
    });

    it('Test saved file', () => {
      cy.readFile('cypress/fixtures/record/to-many-request.json').then(file => {
        const keys = Object.keys(file);
        expect(keys.length).to.equal(2);
        expect(keys[0]).to.equal('/test-endpoint1');
        expect(keys[1]).to.equal('/test-endpoint2');
        expect(Array.isArray(file[keys[0]])).to.equal(true);
        expect(file[keys[0]][0].url).to.equal('/test-endpoint1');
        expect(file[keys[1]][0].url).to.equal('/test-endpoint2');
        expect(file[keys[0]][0].body).to.deep.equal({ 'test-endpoint1': true });
        expect(file[keys[1]][0].body).to.deep.equal({ 'test-endpoint2': true });
      });
    });
  });
});
