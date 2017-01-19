
import { validatePhone } from 'driver-dash/helpers/validate-phone';
import { module, test } from 'qunit';

module('Unit | Helper | validate phone');

test('it should validate on numbers', function(assert) {
    assert.expect(4);
    assert.ok( validatePhone('2075551212') );
    assert.ok( validatePhone('207 555 1212') );
    assert.ok( validatePhone('207.555.1212') );
    assert.ok( validatePhone('(207) 555-1212') );
});

test('it should invalidate less than 10 numbers', function(assert) {
    assert.expect(4);
    assert.equal( validatePhone(), false );
    assert.equal( validatePhone(null), false );
    assert.equal( validatePhone(''), false );
    assert.equal( validatePhone('123456789'), false );
});
