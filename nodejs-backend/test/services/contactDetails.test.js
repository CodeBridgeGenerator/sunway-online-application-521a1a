const assert = require('assert');
const app = require('../../src/app');

describe('\'contactDetails\' service', () => {
  it('registered the service', () => {
    const service = app.service('contactDetails');

    assert.ok(service, 'Registered the service (contactDetails)');
  });
});
