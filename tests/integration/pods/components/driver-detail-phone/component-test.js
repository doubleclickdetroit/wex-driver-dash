import { moduleForComponent, test } from 'ember-qunit';
import wait from 'ember-test-helpers/wait';
import hbs from 'htmlbars-inline-precompile';
import startMirage from '../../../../helpers/start-mirage';

moduleForComponent('driver-detail-phone', 'Integration | Component | driver detail phone', {
  integration: true,
  setup() {
    startMirage( this.container );
  }
});

test('it renders', function(assert) {
  assert.expect(2);

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
  assert.expect(2);

  this.render(hbs`{{driver-detail-phone}}`);
  assert.equal( this.$().text().trim(), 'add' );

  this.$( 'a' ).click();
  assert.ok( this.$('.phone-input').is(':visible'), 'field to edit phone is visible' );
});

test('should display a phone value that can be edited, when clicked', function(assert) {
  assert.expect(3);

  const phoneBegin = '207-523-6938';
  this.set( 'driverData', { phone: phoneBegin } ); // using a factory breaks the test

  this.render(hbs`{{driver-detail-phone phone=driverData.phone}}`);
  assert.equal( this.$().text().trim(), phoneBegin, 'initial phone value' );

  this.$( '.phone-text' ).click();
  assert.equal( this.$('.phone-input').is(':visible'), true, 'field to edit phone is visible' );

  const phoneEnd = '111-111-1111';
  const enterKey = $.Event('keyup', { which: 13, keyCode: 13, charCode: 13 });
  this.$( '.phone-input' ).val( phoneEnd ).trigger( enterKey );
  assert.equal( this.$().text().trim(), phoneEnd, 'new phone value' );
});

test('should display an error when edited with an invalid value, and submitted', function(assert) {
  assert.expect(5);

  const phoneBegin = '207-523-6938';
  this.set( 'driverData', { phone: phoneBegin } ); // using a factory breaks the test

  this.render(hbs`{{driver-detail-phone phone=driverData.phone}}`);

  let enterKey = $.Event('keyup', { which: 13, keyCode: 13, charCode: 13 });
  this.$( '.phone-text' ).click();
  this.$( '.phone-input' ).val( '123' ).trigger( enterKey );

  assert.equal( this.$('.phone-input').is(':visible'), true, 'field to edit phone is still visible' );
  assert.equal( this.$('.error-container').is(':visible'), true, 'error container is visible' );

  const phoneEnd = '111-111-1111';
  enterKey = $.Event('keyup', { which: 13, keyCode: 13, charCode: 13 });
  this.$( '.phone-input' ).val( phoneEnd ).trigger( enterKey );

  return wait().then(() => {
    // visibility for .phone-input has a 500ms delay to wait out the `crossFade` transition
    assert.equal( this.$('.phone-input').is(':visible'), false, 'field to edit phone is invisible' );
    assert.equal( this.$('.error-container').is(':visible'), false, 'error container is invisible' );
    assert.equal( this.$().text().trim(), phoneEnd, 'valid phone value is displayed' );
  });
});

test('should close text field when ESCAPE key is pressed and display original value', function(assert) {
  assert.expect(4);

  const phone = '207-523-6938';
  this.set( 'driverData', { phone: phone } ); // using a factory breaks the test

  this.render(hbs`{{driver-detail-phone phone=driverData.phone}}`);
  assert.equal( this.$().text().trim(), phone, 'original phone value is displayed' );

  this.$( '.phone-text' ).click();
  this.$( '.phone-input' ).val( '248-956-0605' );

  let escKey = $.Event('keyup', { which: 27, keyCode: 27, charCode: 27 });
  this.$( '.phone-input' ).trigger( escKey );

  return wait().then(() => {
    // visibility for .phone-input has a 500ms delay to wait out the `crossFade` transition
    assert.equal( this.$('.phone-input').is(':visible'), false, 'field to edit phone is invisible' );
    assert.equal( this.$('.error-container').is(':visible'), false, 'error container is invisible' );
    assert.equal( this.$().text().trim(), phone, 'original phone value is displayed' );
  });
});

test('should close text field and display "add" hyperlink when submitted without a value', function(assert) {
  const phone = '207-523-6938';
  this.set( 'driverData', { phone: phone } ); // using a factory breaks the test

  this.render(hbs`{{driver-detail-phone phone=driverData.phone}}`);
  assert.equal( this.$().text().trim(), phone, 'original phone value is displayed' );

  const enterKey = $.Event('keyup', { which: 13, keyCode: 13, charCode: 13 });
  this.$( '.phone-text' ).click();
  this.$( '.phone-input' ).val( '' ).trigger( enterKey );

  return wait().then(() => {
    // visibility for .phone-input has a 500ms delay to wait out the `crossFade` transition
    assert.equal( this.$('.phone-input').is(':visible'), false, 'field to edit phone is invisible' );
    assert.equal( this.$('.error-container').is(':visible'), false, 'error container is invisible' );
    assert.equal( this.$().text().trim(), 'add', 'add hyperlink is displayed' );
  });
});
