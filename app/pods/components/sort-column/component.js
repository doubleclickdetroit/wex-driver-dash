import Ember from 'ember';

export default Ember.Component.extend({
  classNames: [ 'component-sort-column' ],

  sortBy: '',

  sortByTerm: Ember.computed('sortBy', function() {
    return this.get( 'sortBy' ).split( ':' )[0];
  }),

  sortByDirection: Ember.computed('sortBy', function() {
    return this.get( 'sortBy' ).split( ':' )[1] || 'asc';
  }),

  isTermCurrent: Ember.computed('term', 'sortByTerm', function() {
    return this.get( 'term' ) === this.get( 'sortByTerm' );
  }),

  isAscending: Ember.computed('isTermCurrent', 'sortByDirection', function() {
    if ( this.get('isTermCurrent') ) {
      return this.get( 'sortByDirection' ) === 'asc';
    }
    return true;
  }),

  click() {
    const term = this.get( 'term' );

    if ( this.get('isTermCurrent') ) {
      const dir = this.get( 'isAscending' ) ? 'desc' : 'asc';
      this.set( 'sortBy', `${term}:${dir}` );
    }
    else {
      this.set( 'sortBy', `${term}:asc` );
    }
  },
}).reopenClass({
  positionalParams: [ 'term', 'label' ]
});
