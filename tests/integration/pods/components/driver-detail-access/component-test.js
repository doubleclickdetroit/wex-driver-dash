import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('driver-detail-access', 'Integration | Component | driver detail access', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{driver-detail-access}}`);

  assert.equal(this.$().text().trim(), `Enabled
  Disabled`);

  // Template block usage:
  this.render(hbs`
    {{#driver-detail-access}}
      template block text
    {{/driver-detail-access}}
  `);

  assert.equal(this.$().text().trim(), `Enabled
  Disabled`);
});
