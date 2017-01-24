import DS from 'ember-data';
import Ember from 'ember';
import SessionService from "ember-simple-auth/services/session";
import computed from 'ember-computed-decorators';

export default SessionService.extend({

  store: Ember.inject.service(),

  @computed( 'isAuthenticated' )
  currentUser( isAuthenticated ) {
    if ( isAuthenticated ) {
      const store = this.get( 'store' );

      // load currentUser, then remove temporary request data from store
      const promise = store.find( 'user', 'current' ).then(currentUser => {
        store.peekAll( 'user' ).filterBy( 'id', 'current' ).invoke( 'unloadRecord' );
        return currentUser;
      });

      return DS.PromiseObject.create({ promise });
    }
  }

});
