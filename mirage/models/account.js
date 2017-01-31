import { Model, hasMany } from 'ember-cli-mirage';

export default Model.extend({
  drivers:      hasMany(),
  users:        hasMany( 'user', { inverse: 'company' } ),
  usersBilling: hasMany( 'user', { inverse: 'billingCompany' } ),
});
