/* global Foundation */

import Ember from 'ember';
import computed from 'ember-computed-decorators';

export default Ember.Component.extend({
  classNames: [ 'component-button-dropdown' ],

  @computed()
  dropdownId() {
    return ( new Date() ).getMilliseconds();
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
