import { test } from 'qunit';
import moduleForAcceptance from 'driver-dash/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | secure/invites');

test('visiting /secure/invites', function(assert) {
  server.createList( 'driver', 3 );

  visit('/secure/invites');

  andThen(function() {
    assert.equal(currentURL(), '/secure/invites');
    assert.equal(find('.accordion-item:first .accordion-content tbody tr').length, 3);
  });
});
