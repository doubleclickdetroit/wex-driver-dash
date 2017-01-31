import { moduleFor, test } from 'ember-qunit';
import Ember from 'ember';
import DS from 'ember-data';

let store, serializer, primaryModel, Dog;

moduleFor('serializer:application', 'Unit | Serializer | application', {
  needs: [ 'serializer:application' ],

  beforeEach() {
    store      = Ember.getOwner( this ).lookup( 'service:store' );
    serializer = store.serializerFor( 'application' );

    Dog = DS.Model.extend({ name: DS.attr('string') });
    this.registry.register( 'model:dog', Dog );
    primaryModel = store.modelFor( 'dog' );
  }
});

test('normalizes a single response with root JSON node', function(assert) {
  const response = { id: '1', name: 'Buckaroo' };
  const expected = {
    data: {
      id:   '1',
      type: 'dog',
      attributes: {
        name: 'Buckaroo'
      },
      relationships: {}
    },
    included: []
  };

  Ember.run(function() {
    let normalized = serializer.normalizeSingleResponse( store, primaryModel, response, response.id );
    assert.deepEqual( normalized, expected );
  });
});

test('normalizes an array response with root JSON node', function(assert) {
  const response = [{ id: '1', name: 'Buckaroo' }, { id: '2', name: 'Marley' }];
  const expected = {
    data: [{
      id:   '1',
      type: 'dog',
      attributes: {
        name: 'Buckaroo'
      },
      relationships: {}
    },
    {
      id:   '2',
      type: 'dog',
      attributes: {
        name: 'Marley'
      },
      relationships: {}
    }],
    included: []
  };

  Ember.run(function() {
    let normalized = serializer.normalizeArrayResponse( store, primaryModel, response, null );
    assert.deepEqual( normalized, expected );
  });
});
