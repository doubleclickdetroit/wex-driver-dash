import Ember from 'ember';
import { sort, filterBy, observes } from 'ember-computed-decorators';
import computed from 'ember-computed-decorators';

export default Ember.Controller.extend({
  @observes( 'model' )
  initSelectedAccount() {
    this.set( 'selectedAccount', this.get('model.firstObject') );
  },


  // Unconfirmed Sorting Properties
  sortByUnconfirmed: 'lastName',

  @computed( 'sortByUnconfirmed' )
  sortDefinitionUnconfirmed(sortByUnconfirmed) { return [ sortByUnconfirmed ]; },

  @filterBy( 'selectedAccount.drivers', 'isConfirmed', false )
  driversUnconfirmed: null,

  @sort( 'driversUnconfirmed', 'sortDefinitionUnconfirmed' )
  sortedDriversUnconfirmed: null,


  // Confirmed Sorting Properties
  sortByConfirmed: 'lastName',

  @computed( 'sortByConfirmed' )
  sortDefinitionConfirmed(sortByConfirmed) { return [ sortByConfirmed ]; },

  @filterBy( 'selectedAccount.drivers', 'isConfirmed', true )
  driversConfirmed: null,

  @sort( 'driversConfirmed', 'sortDefinitionConfirmed' )
  sortedDriversConfirmed: null,


  // Checkbox Properties
  @computed( 'sortedDriversUnconfirmed.@each.isValidPhone' )
  allValidItems( sortedDriversUnconfirmed ) {
    const validItems = sortedDriversUnconfirmed.filter( item => item.get('isValidPhone') );
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
