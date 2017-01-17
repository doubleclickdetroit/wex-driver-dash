import ApplicationSerializer from './application';

export default ApplicationSerializer.extend({
  attrs: [ 'id', 'firstName', 'lastName', 'driverId', 'phone', 'inviteExpiresAt', 'accountId' ]
});
