import Ember from 'ember';

export default Ember.Component.extend({
  tagName:    'header',
  classNames: [ 'component-header-app' ],

  session: Ember.inject.service(),

  actions: {
    invalidateSession() {
      this.get( 'session' ).invalidate();
    }
  }
});
