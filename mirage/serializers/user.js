import ApplicationSerializer from './application';

export default ApplicationSerializer.extend({
  attrs: [ 'id', 'firstName', 'email', 'username', 'onlineApplication', 'company', 'billingCompany' ]
});
