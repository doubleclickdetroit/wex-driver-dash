import Ember from 'ember';
import { alias } from 'ember-computed-decorators';

export default Ember.Component.extend({
  tagName:    'header',
  classNames: [ 'component-header-app' ],

  session: Ember.inject.service(),

  @alias( 'session.currentUser' )
  currentUser: null,

  @alias( 'currentUser.company' )
  company: null,

  actions: {
    invalidateSession() {
      this.get( 'session' ).invalidate();
    }
  }
});
