import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('driver-detail-invite', 'Integration | Component | driver detail invite', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{driver-detail-invite}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#driver-detail-invite}}
      template block text
    {{/driver-detail-invite}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
