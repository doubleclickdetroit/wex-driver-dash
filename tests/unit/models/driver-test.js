import Ember from 'ember';
import moment from 'moment';
import { moduleForModel, test } from 'ember-qunit';

moduleForModel('driver', 'Unit | Model | driver', {
  needs: [ 'model:account' ]
});

test('should belong to an account', function(assert) {
  assert.expect(2);
  const Driver       = this.store().modelFor( 'driver' );
  const relationship = Ember.get( Driver, 'relationshipsByName' ).get( 'account' );

  assert.equal( relationship.key,  'account',   'has relationship with `account`' );
  assert.equal( relationship.kind, 'belongsTo', 'kind of relationship is `belongsTo`' );
});

test('has a computed property "fullName"', function(assert) {
  const model = this.subject(),
        firstName = 'John',
        lastName  = 'Doe';

  Ember.run(() => {
    model.setProperties({ firstName, lastName });
    assert.equal( model.get('fullName'), `${firstName} ${lastName}` );
  });
});

test('has a computed property "isValidPhone"', function(assert) {
  const model = this.subject();

  Ember.run(() => {
    assert.expect(6);

    model.set( 'phone', '2075551212' );
    assert.ok( model.get('isValidPhone') );

    model.set( 'phone', '(207) 555-1212' );
    assert.ok( model.get('isValidPhone') );

    model.set( 'phone', '207 555 1212' );
    assert.ok( model.get('isValidPhone') );

    model.set( 'phone', '207' );
    assert.equal( model.get('isValidPhone'), false );

    model.set( 'phone', '' );
    assert.equal( model.get('isValidPhone'), false );

    model.set( 'phone', null );
    assert.equal( model.get('isValidPhone'), false );
  });
});

test('has a computed property "isConfirmed"', function(assert) {
  const model = this.subject();

  Ember.run(() => {
    model.set( 'confirmAcceptedAt', undefined );
    assert.equal( model.get('isConfirmed'), false );

    model.set( 'confirmAcceptedAt', null );
    assert.equal( model.get('isConfirmed'), false );

    model.set( 'confirmAcceptedAt', '' );
    assert.equal( model.get('isConfirmed'), false );

    let date = moment().toDate();
    model.set( 'confirmAcceptedAt', date );
    assert.equal( model.get('isConfirmed'), true );
  });
});

test('has a computed property "hasInvite"', function(assert) {
  const model = this.subject();

  Ember.run(() => {
    model.set( 'inviteExpiresAt', undefined );
    assert.equal( model.get('hasInvite'), false );

    model.set( 'inviteExpiresAt', null );
    assert.equal( model.get('hasInvite'), false );

    model.set( 'inviteExpiresAt', '' );
    assert.equal( model.get('hasInvite'), false );

    let date = moment().toDate();
    model.set( 'inviteExpiresAt', date );
    assert.equal( model.get('hasInvite'), true );
  });
});

test('has a computed property "isUndeliverable"', function(assert) {
  const model = this.subject();

  Ember.run(() => {
    model.set( 'underliveredAt', undefined );
    assert.equal( model.get('isUndeliverable'), false );

    model.set( 'underliveredAt', null );
    assert.equal( model.get('isUndeliverable'), false );

    model.set( 'underliveredAt', '' );
    assert.equal( model.get('isUndeliverable'), false );

    let date = moment().toDate();
    model.set( 'underliveredAt', date );
    assert.equal( model.get('isUndeliverable'), true );
  });
});

test('has a computed property "isInviteCurrent"', function(assert) {
  const model = this.subject();

  Ember.run(() => {
    model.set( 'inviteExpiresAt', undefined );
    assert.equal( model.get('isInviteCurrent'), false, 'when "inviteExpiresAt" is empty' );

    model.set( 'inviteExpiresAt', null );
    assert.equal( model.get('isInviteCurrent'), false, 'when "inviteExpiresAt" is empty' );

    model.set( 'inviteExpiresAt', '' );
    assert.equal( model.get('isInviteCurrent'), false, 'when "inviteExpiresAt" is empty' );

    let date = moment().subtract( 1, 'day' ).toDate();
    model.set( 'inviteExpiresAt', date );
    assert.equal( model.get('isInviteCurrent'), false, 'when "inviteExpiresAt" is in the past' );

    date = moment().toDate();
    model.set( 'inviteExpiresAt', date );
    assert.equal( model.get('isInviteCurrent'), true, 'when "inviteExpiresAt" is today' );

    date = moment().add( 7, 'days' ).toDate();
    model.set( 'inviteExpiresAt', date );
    assert.equal( model.get('isInviteCurrent'), true, 'when "inviteExpiresAt" is within acceptable range' );

    date = moment().add( 8, 'days' ).toDate();
    model.set( 'inviteExpiresAt', date );
    assert.equal( model.get('isInviteCurrent'), false, 'when "inviteExpiresAt" is beyond acceptable range 2' );
  });
});

test('has a computed property "isInviteExpired"', function(assert) {
  const model = this.subject();

  Ember.run(() => {
    model.set( 'inviteExpiresAt', undefined );
    assert.equal( model.get('isInviteExpired'), true, 'when "inviteExpiresAt" is empty' );

    model.set( 'inviteExpiresAt', null );
    assert.equal( model.get('isInviteExpired'), true, 'when "inviteExpiresAt" is empty' );

    model.set( 'inviteExpiresAt', '' );
    assert.equal( model.get('isInviteExpired'), true, 'when "inviteExpiresAt" is empty' );

    let date = moment().subtract( 1, 'day' ).toDate();
    model.set( 'inviteExpiresAt', date );
    assert.equal( model.get('isInviteExpired'), true, 'when "inviteExpiresAt" is in the past' );

    date = moment().toDate();
    model.set( 'inviteExpiresAt', date );
    assert.equal( model.get('isInviteExpired'), false, 'when "inviteExpiresAt" is today' );

    date = moment().add( 7, 'days' ).toDate();
    model.set( 'inviteExpiresAt', date );
    assert.equal( model.get('isInviteExpired'), false, 'when "inviteExpiresAt" is within acceptable range' );

    date = moment().add( 8, 'days' ).toDate();
    model.set( 'inviteExpiresAt', date );
    assert.equal( model.get('isInviteExpired'), true, 'when "inviteExpiresAt" is beyond acceptable range' );
  });
});
