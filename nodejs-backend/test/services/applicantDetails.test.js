const assert = require('assert');
const app = require('../../src/app');

describe('\'applicantDetails\' service', () => {
  it('registered the service', () => {
    const service = app.service('applicantDetails');

    assert.ok(service, 'Registered the service (applicantDetails)');
  });
});
