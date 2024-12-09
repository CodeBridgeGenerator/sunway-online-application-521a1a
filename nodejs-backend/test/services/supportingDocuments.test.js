const assert = require('assert');
const app = require('../../src/app');

describe('\'supportingDocuments\' service', () => {
  it('registered the service', () => {
    const service = app.service('supportingDocuments');

    assert.ok(service, 'Registered the service (supportingDocuments)');
  });
});
