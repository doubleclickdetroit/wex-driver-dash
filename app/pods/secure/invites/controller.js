import Ember from 'ember';
import { sort, observes } from 'ember-computed-decorators';
import computed from 'ember-computed-decorators';

export default Ember.Controller.extend({
  @observes( 'model' )
  initSelectedAccount() {
    this.set( 'selectedAccount', this.get('model.firstObject') );
  },

  // Sorting Properties
  sortBy: 'lastName',

  @sort( 'selectedAccount.drivers', 'sortDefinition' )
  sortedDrivers: null,

  @computed( 'sortBy' )
  sortDefinition(sortBy) { return [ sortBy ]; },

  // Checkbox Properties
  @computed( 'sortedDrivers.@each.isValidPhone' )
  allValidItems( sortedDrivers ) {
    const validItems = sortedDrivers.filter( item => item.get('isValidPhone') );
    return Ember.A( validItems );
  },

  actions: {
    handleToggleAll(isChecked) {
      this.get( 'allValidItems' ).setEach( 'isChecked', isChecked );
    },

    handleToggleItemCheckbox(driver) {
      const isValidPhone = driver.get( 'isValidPhone' );
      driver.set( 'isChecked', isValidPhone );
    },

    handleInviteDrivers(checkedItems) {
      checkedItems.forEach(driver => {
        driver.save().then( () => driver.set('isChecked', false) );
      });
    }
  }
});
