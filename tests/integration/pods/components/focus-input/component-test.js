import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('focus-input', 'Integration | Component | focus input', {
  integration: true
});

test('it renders an input with autofocus', function(assert) {
  this.render(hbs`{{focus-input}}`);

  const $input = this.$( ':input' );
  assert.equal( $input.length > 0, true,   'element has an input field' );
  assert.equal( $input.val(), '',          'input should not display a value' );
  assert.equal( $input.is(':focus'), true, 'input should have focus' );
});
