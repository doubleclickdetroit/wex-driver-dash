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
  this.setProperties({
    sortBy: 'lastName',
    sortAscending: true
  });

  this.render(hbs`{{sort-column "lastName" "My Label" sortBy=(mut sortBy) sortAscending=(mut sortAscending)}}`);
  assert.equal( this.$('.icon-sort-up').length, 1, 'sortAscending default value is ascending' );

  this.set( 'sortAscending', false );
  assert.equal( this.$('.icon-sort-down').length, 1, 'sortAscending manually changed to descending' );

  this.$( '.icon-sort-down' ).click();
  assert.equal( this.$('.icon-sort-up').length, 1, 'click changed sortAscending to ascending' );

  this.$( '.icon-sort-up' ).click();
  assert.equal( this.$('.icon-sort-down').length, 1, 'click changed sortAscending to descending' );
});

test('it displays ascending when not the active sortBy term', function(assert) {
  this.setProperties({
    sortBy: 'lastName',
    sortAscending: true
  });

  this.render(hbs`{{sort-column "lastName" "My Label" sortBy=(mut sortBy) sortAscending=(mut sortAscending)}}`);

  this.$( '.icon-sort-up' ).click();
  assert.equal( this.$('.icon-sort-down').length, 1, 'click changed sortAscending to descending' );

  this.setProperties({
    sortBy: 'firstName',
    sortAscending: true
  });
  assert.equal( this.$('.icon-sort-up').length, 1, 'defaults to ascending' );

  this.set( 'sortAscending', false );
  assert.equal( this.$('.icon-sort-up').length, 1, 'maintains ascending while other sortBy term' );

  this.setProperties({
    sortBy: 'lastName',
    sortAscending: true
  });
  assert.equal( this.$('.icon-sort-up').length, 1, 'defaults to ascending with matching sortBy term' );

  this.$( '.icon-sort-up' ).click();
  assert.equal( this.$('.icon-sort-down').length, 1, 'click changed sortAscending to descending' );
});
