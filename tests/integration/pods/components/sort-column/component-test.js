import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('sort-column', 'Integration | Component | sort column', {
  integration: true
});

test('it renders either positional param or as block statement', function(assert) {
  this.render(hbs`{{sort-column "lastName" "My Label"}}`);
  assert.equal( this.$().text().trim(), 'My Label', 'positional param "label"' );

  // Template block usage:
  this.render(hbs`
    {{#sort-column "lastName"}}
      <span class="custom-markup">My Custom Label</span>
    {{/sort-column}}
  `);
  assert.ok( this.$('.custom-markup').is(':visible') );
  assert.equal( this.$().text().trim(), 'My Custom Label', 'block statement' );
});

test('it changes sort icon by sortAscending property', function(assert) {
  this.set( 'sortBy', 'lastName' );

  this.render(hbs`{{sort-column "lastName" "My Label" sortBy=(mut sortBy)}}`);
  assert.equal( this.$('.icon-up-dir').length, 1, 'sortAscending default value is ascending' );

  this.$( '.icon-down-dir' ).click();
  assert.equal( this.$('.icon-up-dir').length, 1, 'click changed sortAscending to ascending' );

  this.$( '.icon-up-dir' ).click();
  assert.equal( this.$('.icon-down-dir').length, 1, 'click changed sortAscending to descending' );
});

test('it displays ascending when not the active sortBy term', function(assert) {
  this.set( 'sortBy', 'lastName' );
  this.render(hbs`{{sort-column "lastName" "My Label" sortBy=(mut sortBy)}}`);

  this.$( '.icon-up-dir' ).click();
  assert.equal( this.$('.icon-down-dir').length, 1, 'click changed sortAscending to descending' );

  this.set( 'sortBy', 'firstName' );
  assert.equal( this.$('.icon-up-dir').length, 1, 'defaults to ascending' );

  this.set( 'sortBy', 'firstName:desc' );
  assert.equal( this.$('.icon-up-dir').length, 1, 'maintains ascending while other sortBy term' );

  this.set( 'sortBy', 'lastName' );
  assert.equal( this.$('.icon-up-dir').length, 1, 'defaults to ascending with matching sortBy term' );

  this.$( '.icon-up-dir' ).click();
  assert.equal( this.$('.icon-down-dir').length, 1, 'click changed sortAscending to descending' );
});
