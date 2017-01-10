import Ember from 'ember';

export default Ember.Controller.extend({
  allValidItems: Ember.computed('model.[]', function() {
    return this.get( 'model' ).filter( item => !!item.get('phone') );
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
