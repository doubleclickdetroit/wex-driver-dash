import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return this.store.findAll( 'driver' )

      // for the sake of developing adding a phone number
      .then(drivers => {
        drivers.get( 'firstObject' ).set( 'phone', '' );
        return drivers;
      });
  }
});
