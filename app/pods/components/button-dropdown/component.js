/* global Foundation */

import Ember from 'ember';

export default Ember.Component.extend({
  classNames: [ 'component-button-dropdown' ],

  init() {
    this._super( ...arguments );
    this.set( 'dropdownId', (new Date()).getMilliseconds() );
  },

  didInsertElement() {
    const el = this.$( '.dropdown-pane' );
    new Foundation.Dropdown( el );
  },

  openPane() {
    this.$( '.dropdown-pane' ).foundation( 'open' );
  },

  closePane() {
    this.$( '.dropdown-pane' ).foundation( 'close' );
  },

  actions: {
    handleUpdateSelectedItem(item) {
      this.set( 'selectedItem', item );
      this.closePane();
    }
  }
});
