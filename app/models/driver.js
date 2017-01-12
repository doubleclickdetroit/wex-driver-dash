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

  isValidPhone: Ember.computed('phone', function() {
    const phone = this.get( 'phone' );
    return !!phone && phone.match( /\d/g ).length === 10;
  }),

  isPhoneDirty: Ember.computed('phone', function() {
    const changedAttributes = this.changedAttributes();
    if ( !changedAttributes.phone ) { return false; }
    return ( changedAttributes.phone[0] !== changedAttributes.phone[1] );
  }),
});
