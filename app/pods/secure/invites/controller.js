import Ember from 'ember';

export default Ember.Controller.extend({
  allValidItems: Ember.computed('model.@each.isValidPhone', function() {
    return this.get( 'model' ).filter( item => item.get('isValidPhone') );
  }),

  checkedItems: Ember.computed('model.@each.isChecked', function() {
    return this.get( 'model' ).filterBy( 'isChecked', true );
  }),

  isAllChecked: Ember.computed('allValidItems', 'checkedItems.@each.isChecked', function() {
    return this.get( 'checkedItems.length' ) === this.get( 'allValidItems.length' );
  }),

  isInvitingDisabled: Ember.computed.equal( 'checkedItems.length', 0 ),

  actions: {
    handleToggleAll(isChecked) {
      this.get( 'allValidItems' ).setEach( 'isChecked', isChecked );
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
