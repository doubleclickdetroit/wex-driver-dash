import Ember from 'ember';
import { observes, on } from 'ember-computed-decorators';
import computed from 'ember-computed-decorators';

export default Ember.Controller.extend({
  session: Ember.inject.service(),

  isEnabled: false,
  isPending: false,

  @computed( 'identification', 'password' )
  hasCredentials( identification, password ) {
    return !!identification && !!password;
  },

  @on( 'init' )
  @observes( 'isPending', 'hasCredentials' )
  toggleIsEnabled() {
    const isPending      = this.get( 'isPending' );
    const hasCredentials = this.get( 'hasCredentials' );
    this.set( 'isEnabled', !isPending && hasCredentials );
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
        .catch(reason => {
          this.setProperties({
            isPending:    false,
            errorMessage: reason.error
          });
        });

      this.set( 'isPending', true );
    }
  }
});
