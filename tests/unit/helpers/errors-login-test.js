
import { errorsLogin } from 'driver-dash/helpers/errors-login';
import { module, test } from 'qunit';

module('Unit | Helper | errors login');

// Replace this with your real tests.
test('it parses the correct error message', function(assert) {
  let result   = errorsLogin([ 'unauthorized' ]);
  let expected = 'Invalid login information. Please check your username and password or go online to set up or recover your username and password.';
  assert.equal( result, expected );

  result   = errorsLogin([ 'foo' ]);
  expected = 'Services are down. Please try again later.';
  assert.equal( result, expected );
});
