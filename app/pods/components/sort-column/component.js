import Ember from 'ember';
import computed from 'ember-computed-decorators';

export default Ember.Component.extend({
  classNames: [ 'component-sort-column' ],

  sortBy: '',

  @computed( 'sortBy' )
  sortByTerm( sortBy ) {
    return sortBy.split( ':' )[0];
  },

  @computed( 'sortBy' )
  sortByDirection( sortBy ) {
    return sortBy.split( ':' )[1] || 'asc';
  },

  @computed( 'term', 'sortByTerm' )
  isTermCurrent( term, sortByTerm ) {
    return term === sortByTerm;
  },

  @computed( 'isTermCurrent', 'sortByDirection' )
  isAscending( isTermCurrent, sortByDirection ) {
    return isTermCurrent ? sortByDirection === 'asc' : true;
  },

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
