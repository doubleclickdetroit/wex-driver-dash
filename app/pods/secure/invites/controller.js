import Ember from 'ember';

export default Ember.Controller.extend({
  allValidItems: Ember.computed('model.@each.isValidPhone', function() {
    return this.get( 'model' ).filter(item => {
      const isValidPhone = item.get( 'isValidPhone' );
      item.set( 'isChecked', isValidPhone );
      return isValidPhone;
    });
  }),

  checkedItems: Ember.computed('model.@each.isChecked', function() {
    return this.get( 'model' ).filterBy( 'isChecked', true );
  }),

  isAllChecked: Ember.computed('allValidItems', 'checkedItems', function() {
    return this.get( 'checkedItems.length' ) === this.get( 'allValidItems.length' );
  }),

  actions: {
    handleToggleAll(isChecked) {
      this.get( 'allValidItems' ).setEach( 'isChecked', isChecked );
    }
  }
});
