/* global server */

import { test } from 'qunit';
import moduleForAcceptance from 'driver-dash/tests/helpers/module-for-acceptance';
import Ember from 'ember';

import {
  currentSession,
  invalidateSession ,
  authenticateSession
} from 'driver-dash/tests/helpers/ember-simple-auth';

moduleForAcceptance('Acceptance | login', {
  beforeEach() {
    server.get( '/users/current', { user: { id: 1, firstName: 'John' } }, 200 );
  }
});

test('If a user is not logged in, they see a login form', function(assert) {
  invalidateSession( this.application );
  visit( '/' );

  andThen(function() {
    assert.ok( find('.page-login').length > 0, 'login form is present' );
  });
});

test('if a user is logged in, they see a logout link', function(assert) {
  authenticateSession( this.application );
  visit( '/' );

  andThen(function() {
    assert.equal( currentURL(), '/' );

    let welcomeMesaging = find( '.content-account .top-bar-right' );
    assert.ok( welcomeMesaging.length > 0, 'welcome messaging is present' );

    let usernameIsPresent = welcomeMesaging.text().trim().indexOf( 'Welcome, John' ) > -1;
    assert.ok( usernameIsPresent, '"Welcome, John" is displayed' );

    let logoutIsPresent = find( '.link-logout' ).length > 0;
    assert.ok( logoutIsPresent, 'link to logout is present' );

    let loginNotPresent = find( '.page-login' ).length === 0;
    assert.ok( loginNotPresent, 'login form is not displayed' );
  });
});

test('user can logout', function(assert) {
  authenticateSession( this.application );
  visit( '/' );

  click( '.link-logout' );

  andThen(() => {
    const session  = currentSession( this.application );
    const isAuthed = Ember.get( session, 'isAuthenticated' );
    assert.notOk( isAuthed, 'After clicking logout, the user is no longer logged in' );
  });
});

test('user can login', function(assert) {
  invalidateSession( this.application );
  visit( '/' );

  fillIn( '#identification', 'user' );
  fillIn( '#password', 'password' );
  click( '#btn-login' );

  andThen(() => {
    const session  = currentSession( this.application );
    const isAuthed = Ember.get( session, 'isAuthenticated' );
    assert.ok( isAuthed, 'after a user submits vaild credentials, they are logged in' );

    const loginIsPresent = find( '.page-login' ).length > 0;
    assert.notOk( loginIsPresent, 'after we login, the login form disappears' );
  });
});

test('If a user puts in the wrong login credentials, they see a login error', function(assert) {
  invalidateSession( this.application );
  visit( '/' );

  fillIn( '#identification', 'johndoe' );
  fillIn( '#password', 'wrongPassword' );
  click( '#btn-login' );

  andThen(() => {
    const session  = currentSession( this.application );
    const isAuthed = Ember.get( session, 'isAuthenticated' );
    assert.notOk( isAuthed, 'User submits invalid credentials, fails' );

    const errorMessageIsPresent = find( '.alert.callout' ).length > 0;
    assert.ok( errorMessageIsPresent, 'Shows user an error when they invalid credentials' );

    const loginFormPresent = find( '.page-login' ).length > 0;
    assert.ok( loginFormPresent, 'The login form is still present' );
  });
});
