import Ember from 'ember';

export default Ember.Controller.extend({
  sortedDrivers: Ember.computed.alias( 'sortedItems' ),

  // Sorting Properties
  sortedItems: Ember.computed.sort( 'model', 'sortDefinition' ),

  sortBy: 'lastName',

  sortDefinition: Ember.computed('sortBy', function() {
    return [ this.get('sortBy') ];
  }),

  // Checkbox Properties
  allValidItems: Ember.computed('sortedItems.@each.isValidPhone', function() {
    return this.get( 'sortedItems' ).filter( item => item.get('isValidPhone') );
  }),

  checkedItems: Ember.computed('sortedItems.@each.isChecked', function() {
    return this.get( 'sortedItems' ).filterBy( 'isChecked', true );
  }),

  isAllChecked: Ember.computed('allValidItems', 'checkedItems.@each.isChecked', function() {
    return this.get( 'checkedItems.length' ) === this.get( 'allValidItems.length' );
  }),

  isInvitingDisabled: Ember.computed.equal( 'checkedItems.length', 0 ),

  actions: {
    handleToggleAll(isChecked) {
      Ember.A( this.get('allValidItems') ).setEach( 'isChecked', isChecked );
    },

    handleToggleItemCheckbox(driver) {
      const isValidPhone = driver.get( 'isValidPhone' );
      driver.set( 'isChecked', isValidPhone );
    },

    handleInviteDrivers() {
      this.get( 'checkedItems' ).forEach(driver => {
        driver.save().then( () => driver.set('isChecked', false) );
      });
    }
  }
});
