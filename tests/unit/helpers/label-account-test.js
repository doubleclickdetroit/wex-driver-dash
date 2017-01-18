import Ember from 'ember';
import { labelAccount } from 'driver-dash/helpers/label-account';
import { module, test } from 'qunit';

module('Unit | Helper | label account');

// Replace this with your real tests.
test('it works', function(assert) {
  const account = Ember.Object.create({
    name:          'WEX Inc',
    accountNumber: '123456789',
    accountLevel:  1
  });

  let result = labelAccount([ account ]);

  assert.ok( result.indexOf( account.get('name') ) >= 0, 'renders `account.accountName`' );
  assert.ok( result.indexOf( account.get('accountNumber') ) >= 0, 'renders `account.accountNumber`' );
  assert.ok( result.indexOf( account.get('accountLevel') ) >= 0, 'renders `account.accountLevel`' );
});
