import moment from 'moment';
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

test('when "driver.isInviteCurrent" is true', function(assert) {
  const driver = Ember.Object.create({ isInviteCurrent: true });
  this.set( 'driver', driver );

  this.render(hbs`{{driver-detail-invite driver}}`);
  assert.ok( this.$('.invited').is(':visible'), 'the invite status should be visible' );
});

test('when "driver.isSaving" is true', function(assert) {
  const driver = Ember.Object.create({ isSaving: true });
  this.set( 'driver', driver );

  this.render(hbs`{{driver-detail-invite driver}}`);
  assert.ok( this.$('.icon-spin3').is(':visible'), 'the spinner should be visible' );
});
