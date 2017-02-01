import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import startMirage from '../../../../helpers/start-mirage';

moduleForComponent('driver-detail-invite', 'Integration | Component | driver detail invite', {
  integration: true,
  setup() {
    startMirage( this.container );
  }
});

test('when "driver.isInviteCurrent" is false', function(assert) {
  const driver = Ember.Object.create({ isInviteCurrent: false });
  this.set( 'driver', driver );

  this.render(hbs`{{driver-detail-invite driver}}`);
  assert.ok(this.$('.uninvited').is(':visible'), 'the emdash should be visible' );

  // Template block usage:
  this.render(hbs`
    {{#driver-detail-invite driver}}
      template block text
    {{/driver-detail-invite}}
  `);
  assert.ok(this.$('.uninvited').is(':visible'), 'the emdash should be visible' );
});

test('when "driver.hasInvite" is false', function(assert) {
  const driver = Ember.Object.create({ hasInvite: false });
  this.set( 'driver', driver );

  this.render(hbs`{{driver-detail-invite driver}}`);
  assert.equal( this.$('.uninvited').length, 1, 'an emdash should be visible' );
});

test('when "driver.hasInvite" is true', function(assert) {
  const driver = Ember.Object.create({ hasInvite: true });
  this.set( 'driver', driver );

  this.render(hbs`{{driver-detail-invite driver}}`);
  assert.equal( this.$('.uninvited').length, 0, 'an emdash is not visible' );
});

test('when "driver.isUndeliverable" is true', function(assert) {
  const driver = Ember.Object.create({ hasInvite: true, isUndeliverable: true });
  this.set( 'driver', driver );

  this.render(hbs`{{driver-detail-invite driver}}`);
  assert.equal( this.$('.status').text().trim(), 'Undeliverable', 'status should read "Undeliverable"' );
});

test('when "driver.isInviteCurrent" is true', function(assert) {
  const driver = Ember.Object.create({ hasInvite: true, isInviteCurrent: true });
  this.set( 'driver', driver );

  this.render(hbs`{{driver-detail-invite driver}}`);
  assert.equal( this.$('.status').text().trim(), 'Invite Sent', 'status should read "Invite Sent"' );
});

test('when "driver.isSaving" is true', function(assert) {
  const driver = Ember.Object.create({ isSaving: true });
  this.set( 'driver', driver );

  this.render(hbs`{{driver-detail-invite driver}}`);
  assert.ok( this.$('.icon-spin3').is(':visible'), 'the spinner should be visible' );
});
