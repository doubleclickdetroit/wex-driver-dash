import ApplicationSerializer from './application';

export default ApplicationSerializer.extend({
  // still refer to it as `id` on the model
  // Ember Data will serialize/deserialize appropriately
  primaryKey: 'accountId'
});
