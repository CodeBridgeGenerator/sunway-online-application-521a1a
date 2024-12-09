const assert = require('assert');
const app = require('../../src/app');

describe('\'studentUsers\' service', () => {
  it('registered the service', () => {
    const service = app.service('studentUsers');

    assert.ok(service, 'Registered the service (studentUsers)');
  });
});
