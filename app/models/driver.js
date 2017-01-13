import Ember from 'ember';
import DS from 'ember-data';
import { validatePhone } from '../helpers/validate-phone';

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

  isValidPhone: Ember.computed('phone', function() {
    return validatePhone( this.get('phone') );
  }),
});
