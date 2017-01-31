/* global server */

import Ember from 'ember';
import { moduleForModel, test } from 'ember-qunit';
import startMirage from '../../helpers/start-mirage';

let store;

moduleForModel('user', 'Unit | Serializer | user', {
  needs: [ 'serializer:user', 'model:account', 'model:driver' ],
  beforeEach() {
    startMirage( this.container );
    store = this.store();
  },
  afterEach() {
    window.server.shutdown();
  }
});

test('it serializes the /users/current response', function(assert) {
  assert.expect(2);

  const response = { id: 1, firstName: 'John' };
  server.get( '/users/current', response, 200 );

  Ember.run(() => {
    return this.store().findRecord('user', 'current').then(user => {
      assert.equal( user.get('id'),        response.id );
      assert.equal( user.get('firstName'), response.firstName );
    });
  });
});

test('belongsTo relationship to company and billingCompany', function(assert) {
  assert.expect(4);

  let user, compA, compB;

  Ember.run(() => {
    user  = store.createRecord( 'user',    server.create('user').toJSON() );
    compA = store.createRecord( 'account', server.create('account').toJSON() );
    compB = store.createRecord( 'account', server.create('account').toJSON() );

    user.setProperties({
      company:        compA,
      billingCompany: compB
    });
  });

  assert.equal( user.get('company.id'),        compA.get('id') );
  assert.equal( user.get('billingCompany.id'), compB.get('id') );

  assert.equal( compA.get('users.firstObject.id'),        user.get('id') );
  assert.equal( compB.get('usersBilling.firstObject.id'), user.get('id') );
});
