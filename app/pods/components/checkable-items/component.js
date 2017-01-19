import Ember from 'ember';
import { equal, oneWay } from 'ember-computed-decorators';
import computed from 'ember-computed-decorators';

export default Ember.Component.extend({
  defaultAllChecked: false,

  @oneWay( 'defaultAllChecked' )
  allValidItems: null,

  @computed( 'items.@each.isChecked' )
  checkedItems( items ) {
    return items.filterBy( 'isChecked', true );
  },

  @computed( 'items', 'allValidItems', 'checkedItems.@each.isChecked' )
  isAllChecked( items, allValidItems, checkedItems ) {
    if ( allValidItems === false ) {
      return items.length === checkedItems.length;
    }
    return allValidItems.length === checkedItems.length;
  },

  @equal( 'checkedItems.length', 0 )
  isAllUnchecked: null
});
