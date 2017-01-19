/* global server */

import { test } from 'qunit';
import wait from 'ember-test-helpers/wait';
import moduleForAcceptance from 'driver-dash/tests/helpers/module-for-acceptance';

var account;

moduleForAcceptance('Acceptance | secure/invites', {
  beforeEach() {
    account = server.create( 'account' );
  }
});

test('visiting /invites', function(assert) {
  server.createList( 'driver', 3, { accountId: account.id } );
  visit( '/invites' );

  andThen(() => {
    assert.equal(currentURL(), '/invites');
    assert.equal(find('.accordion-item:first .accordion-content tbody tr').length, 3, '3 rows should be rendered');
  });
});

test('0 drivers should result in appropriate messaging', function(assert) {
  server.createList( 'driver', 0 );
  visit( '/invites' );

  andThen(() => {
    assert.ok( find('.no-content').is(':visible'), 'no drivers to select messaging is displayed' );
  });
});

test('send invites button should be disabled', function(assert) {
  server.createList( 'driver', 1, { accountId: account.id } );
  visit( '/invites' );

  andThen(() => {
    assert.ok( find('.accordion-item-footer .button').is(':disabled'), 'invite drivers button is disabled' );
  });
});

test('modify driver phone and invite driver', function(assert) {
  server.createList( 'driver', 1, { accountId: account.id } );
  visit( '/invites' );

  click( '.phone-text' );
  fillIn( '.phone-input', '800-555-1212' );
  keyEvent( '.phone-input', 'keyup', 13 );

  andThen(() => {
    assert.ok( find('.ember-checkbox').is(':checked'), 'driver row has checked checkbox' );
    assert.ok( find('.accordion-item-footer .button').is(':enabled'), 'invite driver button is enabled' );

    click( '.accordion-item-footer .button' );

    andThen(() => {
      wait().then(() => {
        assert.ok( find('.invited').is(':visible'), 'driver invite status should be visible' );
        assert.ok( find('.ember-checkbox').is(':not(:checked)'), 'driver row checkbox is unchecked' );
        assert.ok( find('.accordion-item-footer .button').is(':disabled'), 'invite driver button is disabled' );
      });
    });
  });
});

test('sort drivers by last name', function(assert) {
  server.create( 'driver', { lastName: 'Campbell', accountId: account.id } );
  server.create( 'driver', { lastName: 'Thompson', accountId: account.id } );
  server.create( 'driver', { lastName: 'Babics', accountId: account.id } );

  visit( '/invites' );

  andThen(() => {
    assert.equal( find('.accordion-item:first tbody tr:eq(0) td:eq(0)').text().trim(), 'Babics' );
    assert.equal( find('.accordion-item:first tbody tr:eq(1) td:eq(0)').text().trim(), 'Campbell' );
    assert.equal( find('.accordion-item:first tbody tr:eq(2) td:eq(0)').text().trim(), 'Thompson' );
  });
});
