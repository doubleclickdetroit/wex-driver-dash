import Ember from 'ember';

export default Ember.Component.extend({

  sortBy:        '',
  sortAscending: true,

  sortByTerm: Ember.computed('sortBy', function() {
    return this.get( 'sortBy' ).split( ':' )[0];
  }),

  isTermCurrent: Ember.computed('term', 'sortByTerm', function() {
    return this.get( 'term' ) === this.get( 'sortByTerm' );
  }),

  isAscending: Ember.computed('isTermCurrent', 'sortAscending', function() {
    if ( this.get('isTermCurrent') ) {
      return this.get( 'sortAscending' );
    }

    return true;
  }),

  sortByColumn() {
    const term = this.get( 'term' );

    if ( this.get('isTermCurrent') ) {
      this.toggleProperty( 'sortAscending' );
      const dir = this.get( 'isAscending' ) ? 'asc' : 'desc';
      this.set( 'sortBy', `${term}:${dir}` );
    }
    else {
      this.setProperties({
        sortBy: `${term}:asc`,
        sortAscending: true
      });
    }
  },

  actions: {
    handleToggleSortAscending() {
      this.sortByColumn();
    }
  }

}).reopenClass({
  positionalParams: [ 'term', 'label' ]
});
