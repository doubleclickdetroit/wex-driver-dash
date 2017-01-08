import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
  firstName: DS.attr(),
  lastName:  DS.attr(),
  phone:     DS.attr(),
  driverId:  DS.attr( 'number' ),

  fullName: Ember.computed('firstName', 'lastName', function() {
    const firstName = this.get( 'firstName' );
    const lastName  = this.get( 'lastName' );
    return `${firstName} ${lastName}`;
  }),

  displayPhone: Ember.computed('phone', function() {
    const phone = this.get( 'phone' );
    let numStr  = `${phone}`.replace( /[^0-9]/g, '' );
    let isValid = numStr.match( /^(\d{3})(\d{3})(\d{4})$/ );
    return numStr.replace( /(\d{3})(\d{3})(\d{4})/, '$1-$2-$3' );
  })
});
