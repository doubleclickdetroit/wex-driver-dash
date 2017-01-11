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

  isValidPhoneDidChange: Ember.observer('allValidItems.@each.isPhoneDirty', function() {
    const dirtyModels = this.get( 'allValidItems' ).filterBy( 'isPhoneDirty', true );
    Ember.A( dirtyModels ).setEach( 'isChecked', true );
  }),

  actions: {
    handleToggleAll(isChecked) {
      this.get( 'allValidItems' ).setEach( 'isChecked', isChecked );
    }
  }
});
