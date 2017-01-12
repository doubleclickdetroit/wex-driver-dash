import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import startMirage from '../../../../helpers/start-mirage';

moduleForComponent('driver-detail-phone', 'Integration | Component | driver detail phone', {
  integration: true,
  setup() {
    startMirage( this.container );
  }
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  const driver = server.create( 'driver' );
  this.set( 'driverData', driver );

  this.render(hbs`{{driver-detail-phone phone=driverData.phone}}`);

  assert.equal( this.$().text().trim(), driver.phone );

  // Template block usage:
  this.render(hbs`
    {{#driver-detail-phone driverData.phone}}
      template block text
    {{/driver-detail-phone}}
  `);

  assert.equal( this.$().text().trim(), driver.phone );
});

test('should display "add" link when phone value is null', function(assert) {
  this.render(hbs`{{driver-detail-phone}}`);
  assert.equal( this.$().text().trim(), 'add' );
});

test('should display an input when "add" link is clicked', function(assert) {
  this.render(hbs`{{driver-detail-phone}}`);
  assert.equal( this.$().text().trim(), 'add' );

  Ember.run(function() {
    this.$( 'a' ).click();
    assert.equal( this.$('.phone-input').length, 1, 'field to edit phone is visible' );
  });
});

test('should display a phone value that can be edited, when clicked', function(assert) {
  // using a factory breaks the test
  const phoneBegin = '207-523-6938';
  this.set( 'driverData', { phone: phoneBegin } );

  this.render(hbs`{{driver-detail-phone phone=driverData.phone}}`);

  assert.equal( this.$().text().trim(), phoneBegin, 'initial phone value' );

  this.$( '.phone-text' ).click();
  assert.equal( this.$('.phone-input').length, 1, 'field to edit phone is visible' );

  const phoneEnd = '800-555-1212';
  this.$( '.phone-input' ).val( phoneEnd );
  this.$( '.phone-input' ).change();

  // keyEvent( '.phone-input', 'keypress', 13 );
  var enterKey = $.Event("keydown", { keyCode: 13 });
  this.$( '.phone-input' ).trigger( enterKey );

  assert.equal( this.$().text().trim(), phoneEnd, 'new phone value' );
});
