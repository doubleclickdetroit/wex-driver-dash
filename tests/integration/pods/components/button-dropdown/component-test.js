import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('button-dropdown', 'Integration | Component | button dropdown', {
  integration: true,
  beforeEach() {
    const items = Ember.A([
      Ember.Object.create({ name: 'foo' }),
      Ember.Object.create({ name: 'bar' }),
      Ember.Object.create({ name: 'baz' })
    ]);

    const selectedItem = items.get( 'firstObject' );

    this.setProperties({ items, selectedItem })
  }
});

test('it renders a defaulted value of `items.firstObject` if `selectedItem` is undefined', function(assert) {
  this.render(hbs`{{button-dropdown items=items label=selectedItem.name selectedItem=selectedItem}}`);

  assert.notOk( this.$('.dropdown-pane').hasClass('is-open'), '.dropdown-pane is hidden' );
  assert.equal( this.$().text().trim(), 'foo', 'render value of `label`' );

  // Template block usage:
  this.render(hbs`
    {{#button-dropdown items=items label=selectedItem.name selectedItem=selectedItem}}
      template block text
    {{/button-dropdown}}
  `);

  assert.notOk( this.$('.dropdown-pane').hasClass('is-open'), '.dropdown-pane is hidden' );
  assert.equal( this.$('.button').text().trim(), 'foo', 'render value of `label`' );
});

test('it toggles the visiblity of the list of `items` when the arrow button is clicked', function(assert) {
  this.render(hbs`
    {{#button-dropdown items=items label=selectedItem.name selectedItem=selectedItem as |item|}}
      {{ item.name }}!
    {{/button-dropdown}}
  `);

  assert.notOk( this.$('.dropdown-pane').hasClass('is-open'), '.dropdown-pane is hidden' );

  this.$( '.button-group' ).click();
  assert.ok( this.$('.dropdown-pane').hasClass('is-open'), '.dropdown-pane is visible' );
  assert.equal( this.$('.dropdown-item').length, 3, 'list of values is displayed' );
  assert.equal( this.$('.dropdown-item:eq(0)').text().trim(), 'foo!', 'first value is correctly parsed' );
  assert.equal( this.$('.dropdown-item:eq(1)').text().trim(), 'bar!', 'second value is correctly parsed' );
  assert.equal( this.$('.dropdown-item:eq(2)').text().trim(), 'baz!', 'last value is correctly parsed' );

  this.$( '.button-group' ).click();
  assert.notOk( this.$('.dropdown-pane').hasClass('is-open'), '.dropdown-pane is hidden' );
});

test('it updates the `selectedItem` when an item is clicked', function(assert) {
  this.render(hbs`
    {{#button-dropdown items=items label=selectedItem.name selectedItem=selectedItem as |item|}}
      {{ item.name }}!
    {{/button-dropdown}}
  `);

  assert.equal( this.get('selectedItem.name'), 'foo', '`selectedItem` is the default value' );

  this.$( '.button-group' ).click();
  this.$( '.dropdown-item:eq(2)' ).click();

  assert.equal( this.get('selectedItem.name'), 'baz', '`selectedItem` is the default value' );
  assert.notOk( this.$('.dropdown-pane').hasClass('is-open'), '.dropdown-pane is hidden after selecting an item' );
});
