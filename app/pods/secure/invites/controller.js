import Ember from 'ember';
import { alias, sort, equal, observes } from 'ember-computed-decorators';
import computed from 'ember-computed-decorators';

export default Ember.Controller.extend({
  @alias( 'sortedItems' ) sortedDrivers: null,

  @observes( 'model' )
  initSelectedAccount() {
    this.set( 'selectedAccount', this.get('model.firstObject') );
  },

  // Sorting Properties
  sortBy: 'lastName',

  @sort( 'selectedAccount.drivers', 'sortDefinition' )
  sortedItems: null,

  @computed( 'sortBy' )
  sortDefinition(sortBy) { return [ sortBy ]; },

  // Checkbox Properties
  @computed( 'sortedItems.@each.isValidPhone' )
  allValidItems( sortedItems ) {
    return sortedItems.filter( item => item.get('isValidPhone') );
  },

  @computed( 'sortedItems.@each.isChecked' )
  checkedItems( sortedItems ) {
    return sortedItems.filterBy( 'isChecked', true );
  },

  @computed( 'allValidItems', 'checkedItems.@each.isChecked' )
  isAllChecked( allValidItems, checkedItems ) {
    return allValidItems.length === checkedItems.length;
  },

  @equal( 'checkedItems.length', 0 )
  isInvitingDisabled: null,

  actions: {
    handleToggleAll(isChecked) {
      Ember.A( this.get('allValidItems') ).setEach( 'isChecked', isChecked );
    },

    handleToggleItemCheckbox(driver) {
      const isValidPhone = driver.get( 'isValidPhone' );
      driver.set( 'isChecked', isValidPhone );
    },

    handleUpdateSelectedAccount(account) {
      this.set( 'selectedAccount', account );
    },

    handleInviteDrivers() {
      this.get( 'checkedItems' ).forEach(driver => {
        driver.save().then( () => driver.set('isChecked', false) );
      });
    }
  }
});
