import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('header-page', 'Integration | Component | header page', {
  integration: true
});

test('it renders', function(assert) {

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

  assert.equal( this.$( '.content-partners .partner-logo').length, 1, 'has one partner' );
  assert.equal( this.$( '.content-partners img').attr('src'), 'assets/images/logo-phillips.png', 'renders partner logo' );
});
