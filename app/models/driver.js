import Ember from 'ember';
import DS from 'ember-data';
import { belongsTo } from 'ember-data/relationships';
import computed from 'ember-computed-decorators';
import moment from 'moment';
import { validatePhone } from '../helpers/validate-phone';

export default DS.Model.extend({
  account: belongsTo( 'account' ),

  firstName:           DS.attr(),
  lastName:            DS.attr(),
  phone:               DS.attr(),
  driverId:            DS.attr( 'number' ),
  inviteExpiresAt:     DS.attr( 'date' ),
  confirmAcceptedAt:   DS.attr( 'date' ),
  isDriverDashEnabled: DS.attr( 'boolean' ),

  @computed( 'firstName', 'lastName' )
  fullName( firstName, lastName ) {
    return `${firstName} ${lastName}`;
  },

  @computed( 'phone' )
  isValidPhone( phone ) {
    return validatePhone( phone );
  },

  @computed( 'confirmAcceptedAt' )
  isConfirmed( confirmAcceptedAt ) {
    return confirmAcceptedAt instanceof Date;
  },

  @computed( 'inviteExpiresAt' )
  hasInvite( inviteExpiresAt ) {
    return inviteExpiresAt instanceof Date;
  },

  @computed( 'hasInvite' )
  isInviteCurrent( hasInvite ) {
    const expiresAt = moment( this.get('inviteExpiresAt') ),
          startDate = moment().startOf( 'day' ),
          endDate   = moment().add( 7, 'days' ).endOf( 'day' ),
          isBetween = expiresAt.isBetween( startDate, endDate, 'days', '[]' );

    return hasInvite && isBetween;
  },

  isInviteExpired: Ember.computed.equal( 'isInviteCurrent', false )
});
