import Ember from 'ember';
import { moduleForModel, test } from 'ember-qunit';

let User, relationships;

moduleForModel('user', 'Unit | Model | user', {
  needs: [ 'model:account' ],
  beforeEach() {
    User          = this.store().modelFor( 'user' );
    relationships = Ember.get( User, 'relationshipsByName' );
  }
});

test('should belong to a company', function(assert) {
  assert.expect(2);
  const relationship = relationships.get( 'company' );

  assert.equal( relationship.key,  'company',   'has relationship with `company`' );
  assert.equal( relationship.kind, 'belongsTo', 'kind of relationship is `belongsTo`' );
});

  test('should belong to a billingCompany', function(assert) {
  assert.expect(2);
  const relationship = relationships.get( 'billingCompany' );

  assert.equal( relationship.key,  'billingCompany', 'has relationship with `billingCompany`' );
  assert.equal( relationship.kind, 'belongsTo',      'kind of relationship is `belongsTo`' );
});
