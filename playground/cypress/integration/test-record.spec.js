import { getRecordKeyFromRequest, xhrRecorderStart } from '../../../dist/index';

let xhrRecorderInstance;
describe('Test record mode', () => {
  before(() => {
    // Delete recorded files
    cy.xhrRecorderGetXhrRecorderInstance().then(_xhrRecorderInstance => {
      xhrRecorderInstance = _xhrRecorderInstance;
      if (xhrRecorderInstance.env.recordMode === true) {
        cy.writeFile('cypress/fixtures/record/one-request.json', '');
        cy.writeFile('cypress/fixtures/record/to-many-request.json', '');
        cy.writeFile('cypress/fixtures/record/disable-next-record.json', '');
      }
    });
  });

  context('One request', () => {
    xhrRecorderStart('one-request', 'playground/cypress/fixtures/record');

    before(() => cy.visit('http://localhost:4200'));

    it('Call endpoint1', () => {
      cy.get('#endpoint1').click();
      cy.wait(1000).xhrRecorderStop();
    });

    it('Test saved file', () => {
      cy.readFile('cypress/fixtures/record/one-request.json').then(file => {
        const keys = Object.keys(file);
        expect(keys.length).to.equal(1);
        expect(keys[0]).to.equal(getRecordKeyFromRequest({ method: 'POST', url: '/test-endpoint1' }));
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
      cy.wait(1000).xhrRecorderStop();
    });

    it('Test saved file', () => {
      cy.readFile('cypress/fixtures/record/to-many-request.json').then(file => {
        const keys = Object.keys(file);
        expect(keys.length).to.equal(2);
        expect(keys[0]).to.equal(getRecordKeyFromRequest({ method: 'POST', url: '/test-endpoint1' }));
        expect(keys[1]).to.equal(getRecordKeyFromRequest({ method: 'POST', url: '/test-endpoint2' }));
        expect(Array.isArray(file[keys[0]])).to.equal(true);
        expect(file[keys[0]][0].url).to.equal('/test-endpoint1');
        expect(file[keys[1]][0].url).to.equal('/test-endpoint2');
        expect(file[keys[0]][0].body).to.deep.equal({ 'test-endpoint1': true });
        expect(file[keys[1]][0].body).to.deep.equal({ 'test-endpoint2': true });
      });
    });
  });

  context('Disable next request record', () => {
    xhrRecorderStart('disable-next-record', 'playground/cypress/fixtures/record');

    before(() => cy.visit('http://localhost:4200'));

    it('Call endpoint1', () => {
      cy.get('#endpoint1').click();
    });

    it('Call endpoint2', () => {
      cy.xhrRecorderDisableNextRecord();

      if (xhrRecorderInstance.env.recordMode === false) {
        // play modban, mi nem inditjuk el a backend-et ezert figyelni kell az url
        cy.server();
        cy.route({ method: 'POST', url: 'test-endpoint2' }).as('callEndpoint2');
      }

      cy.get('#endpoint2').click();

      if (xhrRecorderInstance.env.recordMode === false) {
        // megvizsgaljuk hogy 404-e
        cy.wait('@callEndpoint2').then(xhr => {
          expect(xhr.aborted).is.true;
        });
      }
      cy.wait(1000).xhrRecorderStop();
    });

    it('Test saved file', () => {
      cy.readFile('cypress/fixtures/record/disable-next-record.json').then(file => {
        const keys = Object.keys(file);
        expect(keys.length).to.equal(1);
        expect(keys[0]).to.equal(getRecordKeyFromRequest({ method: 'POST', url: '/test-endpoint1' }));
        expect(Array.isArray(file[keys[0]])).to.equal(true);
        expect(file[keys[0]][0].url).to.equal('/test-endpoint1');
        expect(file[keys[0]][0].body).to.deep.equal({ 'test-endpoint1': true });
      });
    });
  });
});
