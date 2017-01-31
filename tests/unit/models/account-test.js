import Ember from 'ember';
import { moduleForModel, test } from 'ember-qunit';

let Account, relationships;

moduleForModel('account', 'Unit | Model | account', {
  needs: [ 'model:user', 'model:driver' ],
  beforeEach() {
    Account       = this.store().modelFor( 'account' );
    relationships = Ember.get( Account, 'relationshipsByName' );
  }
});

test('should have many drivers', function(assert) {
  assert.expect(2);
  const relationship = relationships.get( 'drivers' );

  assert.equal( relationship.key,  'drivers', 'has relationship with `drivers`' );
  assert.equal( relationship.kind, 'hasMany', 'kind of relationship is `hasMany`' );
});

test('should have many users', function(assert) {
  assert.expect(2);
  const relationship = relationships.get( 'users' );

  assert.equal( relationship.key,  'users',   'has relationship with `users`' );
  assert.equal( relationship.kind, 'hasMany', 'kind of relationship is `hasMany`' );
});

test('should have many usersBilling', function(assert) {
  assert.expect(2);
  const relationship = relationships.get( 'usersBilling' );

  assert.equal( relationship.key,  'usersBilling', 'has relationship with `usersBilling`' );
  assert.equal( relationship.kind, 'hasMany',      'kind of relationship is `hasMany`' );
});
