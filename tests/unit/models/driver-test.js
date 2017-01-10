import Ember from 'ember';
import { moduleForModel, test } from 'ember-qunit';

moduleForModel('driver', 'Unit | Model | driver', {
  // Specify the other units that are required for this test.
  needs: []
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok( !!model );
});

test('has a fullName computed property', function(assert) {
  const model = this.subject(),
        firstName = 'John',
        lastName  = 'Doe';

  Ember.run(() => {
    model.setProperties({ firstName, lastName });
    assert.equal( model.get('fullName'), `${firstName} ${lastName}` );
  });
});

test('has a displayPhone computed property', function(assert) {
  const model = this.subject(),
        phone = '207-555-1212';

  Ember.run(() => {
    assert.expect(4);

    model.set( 'phone', '2075551212' );
    assert.equal( model.get('displayPhone'), phone );

    model.set( 'phone', '207 555 1212' );
    assert.equal( model.get('displayPhone'), phone );

    model.set( 'phone', '207.555.1212' );
    assert.equal( model.get('displayPhone'), phone );

    model.set( 'phone', '(207) 555-1212' );
    assert.equal( model.get('displayPhone'), phone );
  });
});

test('has a isValidPhone computed property', function(assert) {
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
})
