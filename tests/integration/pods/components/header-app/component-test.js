import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

const sessionStub = Ember.Service.extend({
  currentUser: Ember.Object.create({
    firstName: 'John',

    company: Ember.Object.create({
      name:          'State of Maine',
      accountNumber: '1234567890'
    }),

    brand: Ember.Object.create({
      url: 'assets/images/wex-logo.png'
    })
  })
});

moduleForComponent('header-app', 'Integration | Component | header app', {
  integration: true,
  beforeEach() {
    this.register( 'service:session', sessionStub );
    this.inject.service( 'session' );
  }
});

test('it renders', function(assert) {
  assert.expect(4);

  this.render(hbs`{{header-app}}`);

  // hard-coded values until dynamic
  assert.equal( this.$('.top-bar-title img').length, 1, 'image for branded logo exists' );
  assert.equal( this.$('.top-bar-title img').attr('src'), 'assets/images/wex-logo.png', 'renders proper branded logo' );

  assert.equal( this.$('.account-name').text().trim(), 'State of Maine' );
  assert.equal( this.$('.account-number').text().trim(), '#1234567890' );
});
