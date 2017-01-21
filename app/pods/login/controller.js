import Ember from 'ember';
import computed from 'ember-computed-decorators';

export default Ember.Controller.extend({
  session: Ember.inject.service(),

  @computed( 'identification', 'password' )
  hasCredentials( identification, password ) {
    return !!identification && !!password;
  },

  actions: {
    authenticate() {
      let { identification, password } = this.getProperties( 'identification', 'password' );
      this.get( 'session' ).authenticate('authenticator:oauth2', identification, password).catch(reason => {
        this.set( 'errorMessage' , reason.error || reason );
      });
    }
  }
});
