
import { formatPhone } from 'driver-dash/helpers/format-phone';
import { module, test } from 'qunit';

module('Unit | Helper | format phone');

// Replace this with your real tests.
test('it works', function(assert) {
  let result = formatPhone([42]);
  assert.ok(result);
});

test('it should format the phone number', function(assert) {
  const phone = '207-555-1212';

    assert.expect(4);
    assert.equal( formatPhone(['2075551212']), phone );
    assert.equal( formatPhone(['207 555 1212']), phone );
    assert.equal( formatPhone(['207.555.1212']), phone );
    assert.equal( formatPhone(['(207) 555-1212']), phone );
});
