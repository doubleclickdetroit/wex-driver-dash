/* global server */

import { moduleForModel, test } from 'ember-qunit';
import startMirage from '../../helpers/start-mirage';

moduleForModel('account', 'Unit | Serializer | account', {
  needs: [ 'serializer:account', 'model:user', 'model:driver' ],
  beforeEach() {
    startMirage( this.container );
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
