import Ember from 'ember';
import { alias, observes, on } from 'ember-computed-decorators';

export default Ember.Component.extend({
  tagName:    'header',
  classNames: [ 'component-header-app' ],

  session: Ember.inject.service(),

  @alias( 'session.currentUser' )
  currentUser: null,

  @alias( 'currentUser.company' )
  company: null,

  // Temporary: hard-coded until brand endpoints in place
  @on( 'init' )
  @observes( 'currentUser' )
  addFauxBranding() {
    if ( this.get('currentUser') ) {
      const brand = Ember.Object.create({ url: 'assets/images/wex-logo.png' });
      this.set( 'currentUser.brand', brand );
    }
  },

  actions: {
    invalidateSession() {
      this.get( 'session' ).invalidate();
    }
  }
});
