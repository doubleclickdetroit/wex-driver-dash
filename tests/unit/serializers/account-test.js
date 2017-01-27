/* global server */

import Ember from 'ember';
import { moduleForModel, test } from 'ember-qunit';
import startMirage from '../../helpers/start-mirage';

let store;

moduleForModel('account', 'Unit | Serializer | account', {
  needs: [ 'serializer:account', 'model:user', 'model:driver' ],
  beforeEach() {
    startMirage( this.container );
    store = this.store();
  },
  afterEach() {
    window.server.shutdown();
  }
});

test('it serializes array responses', function(assert) {
  assert.expect(1);
  server.createList( 'account', 3 );

  return this.store().findAll('account').then(accounts => {
    assert.equal( accounts.get('length'), 3, 'three accounts should be loaded' );
  });
});

test('hasMany relationship to users and usersBilling', function(assert) {
  assert.expect(5);

  let comp, driverA, driverB, drivers;

  Ember.run(() => {
    comp    = store.createRecord( 'account', server.create('account').toJSON() );
    driverA = store.createRecord( 'driver',  server.create('driver').toJSON() );
    driverB = store.createRecord( 'driver',  server.create('driver').toJSON() );

    comp.get( 'drivers' ).pushObjects(Ember.A([ driverA, driverB ]));

    drivers = comp.get( 'drivers' );
  });

  assert.equal( drivers.get('length'), 2 );
  assert.equal( drivers.objectAt(0).get('id'), driverA.get('id') );
  assert.equal( drivers.objectAt(1).get('id'), driverB.get('id') );

  assert.equal( driverA.get('account.id'), comp.get('id') );
  assert.equal( driverB.get('account.id'), comp.get('id') );
});

test('hasMany relationship to users and usersBilling', function(assert) {
  assert.expect(6);

  let comp, userA, userB;

  Ember.run(() => {
    comp  = store.createRecord( 'account', server.create('account').toJSON() );
    userA = store.createRecord( 'user',    server.create('user').toJSON() );
    userB = store.createRecord( 'user',    server.create('user').toJSON() );

    comp.get( 'users' ).pushObject( userA );
    comp.get( 'usersBilling' ).pushObject( userB );
  });

  assert.equal( comp.get('users.firstObject.id'),        userA.get('id') );
  assert.equal( comp.get('usersBilling.firstObject.id'), userB.get('id') );

  assert.equal( userA.get('company.id'),        comp.get('id') );
  assert.equal( userA.get('billingCompany.id'), null );

  assert.equal( userB.get('company.id'),        null );
  assert.equal( userB.get('billingCompany.id'), comp.get('id') );
});
