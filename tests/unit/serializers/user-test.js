/* global server */

import Ember from 'ember';
import { moduleForModel, test } from 'ember-qunit';
import startMirage from '../../helpers/start-mirage';

moduleForModel('user', 'Unit | Serializer | user', {
  needs: [ 'serializer:user', 'model:account' ],
  beforeEach() {
    startMirage( this.container );
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
    return this.store().find('user', 'current').then(user => {
      assert.equal( user.get('id'),        response.id );
      assert.equal( user.get('firstName'), response.firstName );
    });
  });
});
