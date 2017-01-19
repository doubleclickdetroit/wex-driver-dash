import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('checkable-items', 'Integration | Component | checkable items', {
  integration: true,
  beforeEach() {
    const items = Ember.A([
      { name: 'foo' },
      { name: 'baz' },
      { name: 'bar' }
    ]);

    this.set( 'items', items );
  }
});

test('it renders', function(assert) {
  this.render(hbs`{{checkable-items items=items}}`);
  assert.equal( this.$().text().trim(), '' );

  // Template block usage:
  this.render(hbs`
    {{#checkable-items items=items}}
      template block text
    {{/checkable-items}}
  `);
  assert.equal( this.$().text().trim(), 'template block text' );
});

test('it manages an `item.isChecked` state', function(assert) {
  this.render(hbs`
    {{#checkable-items items=items}}
      {{#each items as |item|}}
        {{input type="checkbox" checked=(mut item.isChecked)}}
      {{/each}}
    {{/checkable-items}}
  `);

  assert.equal( this.$(':checkbox').length, 3, 'renders 3 checkboxes in wrapped content' );

  this.$( ':checkbox:last' ).click();
  assert.ok( this.$(':checkbox:last').is(':checked'), 'last checkbox should be checked' );
  assert.ok( this.get('items.lastObject.isChecked'), 'last item `isChecked` is true' );

  this.$( ':checkbox:last' ).click();
  assert.notOk( this.$(':checkbox:last').is(':checked'), 'last checkbox should be checked' );
  assert.notOk( this.get('items.lastObject.isChecked'), 'last item `isChecked` is true' );
});

test('it yields hash of properties to hook into', function(assert) {
  this.render(hbs`
    {{#checkable-items items=items as |checkable|}}
      <p class="checked-items">{{ checkable.checkedItems.length }}</p>
      <p class="is-all-checked">{{ checkable.isAllChecked }}</p>
      <p class="is-all-unchecked">{{ checkable.isAllUnchecked }}</p>

      {{#each items as |item|}}
        {{input type="checkbox" checked=(mut item.isChecked)}}
      {{/each}}
    {{/checkable-items}}
  `);

  assert.equal( this.$('.checked-items').text().trim(), '0', '`checkable.checkedItems` is empty' );
  assert.equal( this.$('.is-all-checked').text().trim(), 'false', '`checkable.isAllChecked` describes that all `item.@each.isChecked` is false' );
  assert.equal( this.$('.is-all-unchecked').text().trim(), 'true', '`checkable.isAllUnchecked` describes that all `item.@each.isChecked` is true' );

  this.$( ':checkbox:eq(0)' ).click();
  assert.equal( this.$('.checked-items').text().trim(), '1', '`checkable.checkedItems` has one `item.@each.isChecked`' );
  assert.equal( this.$('.is-all-checked').text().trim(), 'false', '`checkable.isAllChecked` describes that all `item.@each.isChecked` is false' );
  assert.equal( this.$('.is-all-unchecked').text().trim(), 'false', '`checkable.isAllUnchecked` describes that all `item.@each.isChecked` is false' );

  this.$( ':checkbox:eq(1)' ).click();
  assert.equal( this.$('.checked-items').text().trim(), '2', '`checkable.checkedItems` has two `item.@each.isChecked`' );
  assert.equal( this.$('.is-all-checked').text().trim(), 'false', '`checkable.isAllChecked` describes that all `item.@each.isChecked` is false' );
  assert.equal( this.$('.is-all-unchecked').text().trim(), 'false', '`checkable.isAllUnchecked` describes that all `item.@each.isChecked` is false' );

  this.$( ':checkbox:eq(2)' ).click();
  assert.equal( this.$('.checked-items').text().trim(), '3', '`checkable.checkedItems` has all three `item.@each.isChecked`' );
  assert.equal( this.$('.is-all-checked').text().trim(), 'true', '`checkable.isAllChecked` describes that all `item.@each.isChecked` is true' );
  assert.equal( this.$('.is-all-unchecked').text().trim(), 'false', '`checkable.isAllUnchecked` describes that all `item.@each.isChecked` is false' );
});
