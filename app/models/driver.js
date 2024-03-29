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
  isDriverDashEnabled: DS.attr( 'boolean' ),

  // seems these three attrs should be a nested/separate resource
  inviteExpiresAt:   DS.attr( 'date' ),
  confirmAcceptedAt: DS.attr( 'date' ),
  underliveredAt:    DS.attr( 'date' ),

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

  @computed( 'underliveredAt' )
  isUndeliverable( underliveredAt ) {
    return underliveredAt instanceof Date;
  },

  @computed( 'hasInvite', 'isUndeliverable' )
  isInviteCurrent( hasInvite, isUndeliverable ) {
    if ( isUndeliverable ) { return false; }

    const expiresAt = moment( this.get('inviteExpiresAt') ),
          startDate = moment().startOf( 'day' ),
          endDate   = moment().add( 7, 'days' ).endOf( 'day' ),
          isBetween = expiresAt.isBetween( startDate, endDate, 'days', '[]' );

    return hasInvite && isBetween;
  },

  isInviteExpired: Ember.computed.equal( 'isInviteCurrent', false )
});
