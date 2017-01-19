import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('header-app', 'Integration | Component | header app', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{header-app}}`);

  // hard-coded values until dynamic
  fixtureAssertions();

  // Template block usage:
  this.render(hbs`
    {{#header-app}}
      template block text
    {{/header-app}}
  `);

  // hard-coded values until dynamic
  fixtureAssertions();

  function fixtureAssertions() {
    assert.equal(this.$('.top-bar-title').text().trim(), 'WEX');
    assert.equal(this.$('.account-name').text().trim(), 'State of Maine');
    assert.equal(this.$('.account-number').text().trim(), '#123456789134');
  }
});
