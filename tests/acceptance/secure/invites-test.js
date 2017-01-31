/* global server */

import Ember from 'ember';
import { test } from 'qunit';
import wait from 'ember-test-helpers/wait';
import destroyApp from 'driver-dash/tests/helpers/destroy-app';
import moduleForAcceptance from 'driver-dash/tests/helpers/module-for-acceptance';
import { authenticateSession } from 'driver-dash/tests/helpers/ember-simple-auth';

const { tryInvoke } = Ember;

let account;

moduleForAcceptance('Acceptance | secure/invites', {
  beforeEach() {
    account = server.create( 'account' );
    authenticateSession( this.application );
    server.get( '/users/current', { user: { id: 1, firstName: 'John' } }, 200 );
  },

  afterEach() {
    tryInvoke( server, 'shutdown' );
    destroyApp( this.application );
  }
});

/**
 * Invite Drivers
 */
test('visiting /invites', function(assert) {
  server.createList( 'driver', 3, { accountId: account.id } );
  visit( '/' );

  andThen(() => {
    assert.equal(currentURL(), '/');
    assert.equal(find('.accordion-item:first .accordion-content tbody tr').length, 3, '3 rows should be rendered');
  });
});

test('0 drivers should result in appropriate messaging', function(assert) {
  server.createList( 'driver', 0 );
  visit( '/' );

  andThen(() => {
    assert.ok( find('.content-empty').is(':visible'), 'no drivers to select messaging is displayed' );
    assert.equal( find('.items-count:eq(0)').text().trim(), '0 Drivers', 'text displays to indicate number of drivers rendered is "0 Drivers"' );
  });
});

test('send invites button should be disabled', function(assert) {
  server.createList( 'driver', 1, { accountId: account.id } );
  visit( '/' );

  andThen(() => {
    assert.ok( find('.accordion-item-footer .button').is(':disabled'), 'invite drivers button is disabled' );
    assert.equal( find('.items-count:eq(0)').text().trim(), '1 Driver', 'text displays to indicate number of drivers rendered is "1 Driver"' );
  });
});

test('modify driver phone and invite driver', function(assert) {
  server.createList( 'driver', 1, { accountId: account.id } );
  visit( '/' );

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

  visit( '/' );

  andThen(() => {
    assert.equal( find('.accordion-item:first tbody tr:eq(0) td:eq(0)').text().trim(), 'Babics' );
    assert.equal( find('.accordion-item:first tbody tr:eq(1) td:eq(0)').text().trim(), 'Campbell' );
    assert.equal( find('.accordion-item:first tbody tr:eq(2) td:eq(0)').text().trim(), 'Thompson' );
  });
});

/**
 * Manage Drivers
 */
test('filter drivers with `isConfirmed` status to display in "Manage Drivers" section', function(assert) {
  const attrs = {
    accountId:         account.id,
    inviteExpiresAt:   new Date(),
    confirmAcceptedAt: new Date()
  };

  server.createList( 'driver', 3, attrs );
  visit( '/' );

  andThen(() => {
    assert.equal(currentURL(), '/');
    assert.equal(find('.accordion-item:eq(1) .accordion-content tbody tr').length, 3, '3 rows should be rendered');
    assert.equal( find('.items-count:eq(1)').text().trim(), '3 Drivers', 'text displays to indicate number of drivers rendered is "3 Drivers"' );
  });
});

test('sort confirmed drivers by `lastName`', function(assert) {
  const attrs = {
    accountId:         account.id,
    inviteExpiresAt:   new Date(),
    confirmAcceptedAt: new Date()
  };

  server.create( 'driver', { lastName: 'Campbell', ...attrs } );
  server.create( 'driver', { lastName: 'Thompson', ...attrs } );
  server.create( 'driver', { lastName: 'Babics',   ...attrs } );

  visit( '/' );

  andThen(() => {
    assert.equal( find('.accordion-item:eq(1) tbody tr:eq(0) td:eq(0)').text().trim(), 'Babics' );
    assert.equal( find('.accordion-item:eq(1) tbody tr:eq(1) td:eq(0)').text().trim(), 'Campbell' );
    assert.equal( find('.accordion-item:eq(1) tbody tr:eq(2) td:eq(0)').text().trim(), 'Thompson' );
  });
});

test('sort confirmed drivers by `isDriverDashEnabled`', function(assert) {
  const attrs = {
    accountId:         account.id,
    inviteExpiresAt:   new Date(),
    confirmAcceptedAt: new Date()
  };

  server.create( 'driver', { lastName: 'Campbell', isDriverDashEnabled: true,  ...attrs } );
  server.create( 'driver', { lastName: 'Thompson', isDriverDashEnabled: true,  ...attrs } );
  server.create( 'driver', { lastName: 'Babics',   isDriverDashEnabled: false, ...attrs } );

  visit( '/' );

  click( '.component-sort-column:eq(1)' );

  andThen(() => {
    assert.equal( find('.accordion-item:eq(1) tbody tr:eq(0) td:eq(0)').text().trim(), 'Babics' );
    assert.equal( find('.accordion-item:eq(1) tbody tr:eq(1) td:eq(0)').text().trim(), 'Campbell' );
    assert.equal( find('.accordion-item:eq(1) tbody tr:eq(2) td:eq(0)').text().trim(), 'Thompson' );
  });

  click( '.component-sort-column:eq(1)' );

  andThen(() => {
    assert.equal( find('.accordion-item:eq(1) tbody tr:eq(0) td:eq(0)').text().trim(), 'Campbell' );
    assert.equal( find('.accordion-item:eq(1) tbody tr:eq(1) td:eq(0)').text().trim(), 'Thompson' );
    assert.equal( find('.accordion-item:eq(1) tbody tr:eq(2) td:eq(0)').text().trim(), 'Babics' );
  });
});
