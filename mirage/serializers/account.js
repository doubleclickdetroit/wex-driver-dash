import ApplicationSerializer from './application';

export default ApplicationSerializer.extend({
  attrs: [ 'id', 'name', 'accountNumber', 'accountLevel' ]
});
