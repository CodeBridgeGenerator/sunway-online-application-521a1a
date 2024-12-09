const assert = require('assert');
const app = require('../../src/app');

describe('\'programmes\' service', () => {
  it('registered the service', () => {
    const service = app.service('programmes');

    assert.ok(service, 'Registered the service (programmes)');
  });
});
