import { RestSerializer } from 'ember-cli-mirage';

export default RestSerializer.extend({
  attrs: [ 'id', 'firstName', 'lastName', 'driverId', 'phone', 'inviteExpiresAt', 'accountId' ]
});
