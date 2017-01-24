
import { validateEmail } from 'driver-dash/helpers/validate-email';
import { module, test } from 'qunit';

module('Unit | Helper | validate email');

// Replace this with your real tests.
test('it validates an email address', function(assert) {
  assert.notOk( validateEmail(), 'undefined is invalid' );
  assert.notOk( validateEmail(null), 'null is invalid' );
  assert.notOk( validateEmail(''), 'empty string is invalid' );
  assert.notOk( validateEmail('foo.com'), 'string without "@" is invalid' );
  assert.notOk( validateEmail('foo@bar'), 'string without "." is invalid' );
  assert.notOk( validateEmail('foo@bar.c'), 'string without ".{xx} is invalid' );
  assert.ok( validateEmail('foo@bar.co'), 'string with correctly formatted email is valid' );
  assert.ok( validateEmail('foo@bar.com'), 'string with correctly formatted email is valid' );
});
