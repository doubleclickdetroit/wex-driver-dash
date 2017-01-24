import Ember from 'ember';
import { observes } from 'ember-computed-decorators';
import computed from 'ember-computed-decorators';

export default Ember.Controller.extend({
  session: Ember.inject.service(),

  @computed( 'identification', 'password' )
  hasCredentials( identification, password ) {
    return !!identification && !!password;
  },

  @observes( 'identification', 'password' )
  dismissErrorMessage() {
    if ( this.get('errorMessage') ) {
      this.set( 'errorMessage', '' );
    }
  },

  actions: {
    handleAuthentication() {
      let { session, identification, password } = this.getProperties( 'session', 'identification', 'password' );
      session.authenticate( 'authenticator:oauth2', identification, password )
        .catch(reason => { this.set( 'errorMessage' , reason.error ); });
    }
  }
});
