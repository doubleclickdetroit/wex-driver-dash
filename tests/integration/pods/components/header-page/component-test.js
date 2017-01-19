import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('header-page', 'Integration | Component | header page', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{header-page}}`);

  assert.equal(this.$( '.content-title h2' ).text().trim(), 'Page Title');
  assert.equal(this.$( '.content-title p' ).text().trim(), 'Lorem ipsum dolor sit amet...');

  // Template block usage:
  this.render(hbs`
    {{#header-page}}
      {{#block-slot 'title'}}My Title{{/block-slot}}
      {{#block-slot 'subtitle'}}My Subitle{{/block-slot}}
    {{/header-page}}
  `);

  assert.equal(this.$( '.content-title h2' ).text().trim(), 'My Title');
  assert.equal(this.$( '.content-title p' ).text().trim(), 'My Subitle');
});
