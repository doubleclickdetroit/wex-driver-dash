import Ember from 'ember';
import DS from 'ember-data';
import { belongsTo } from 'ember-data/relationships';
import moment from 'moment';
import { validatePhone } from '../helpers/validate-phone';

export default DS.Model.extend({
  account: belongsTo( 'account' ),

  firstName: DS.attr(),
  lastName:  DS.attr(),
  phone:     DS.attr(),
  driverId:  DS.attr( 'number' ),
  inviteExpiresAt:   DS.attr( 'date' ),
  confirmAcceptedAt: DS.attr( 'date' ),

  fullName: Ember.computed('firstName', 'lastName', function() {
    const firstName = this.get( 'firstName' );
    const lastName  = this.get( 'lastName' );
    return `${firstName} ${lastName}`;
  }),

  isValidPhone: Ember.computed('phone', function() {
    return validatePhone( this.get('phone') );
  }),

  isConfirmed: Ember.computed('confirmAcceptedAt', function() {
    return this.get( 'confirmAcceptedAt' ) instanceof Date;
  }),

  hasInvite: Ember.computed('inviteExpiresAt', function() {
    return this.get( 'inviteExpiresAt' ) instanceof Date;
  }),

  isInviteCurrent: Ember.computed('hasInvite', function() {
    const hasInvite = this.get( 'hasInvite' ),
          expiresAt = moment( this.get('inviteExpiresAt') ),
          startDate = moment().startOf( 'day' ),
          endDate   = moment().add( 5, 'days' ).endOf( 'day' ),
          isBetween = expiresAt.isBetween( startDate, endDate, 'days', '[]' );

    return hasInvite && isBetween;
  }),

  isInviteExpired: Ember.computed.equal( 'isInviteCurrent', false )
});
