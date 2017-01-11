import Ember from 'ember';

export default Ember.Component.extend({
  classNames: [ 'component-tooltip-text' ],

  text: 'Lorem ipsum',

  didInsertElement() {
    this.$().attr( 'data-tooltip', this.get('text') );
  }
});
