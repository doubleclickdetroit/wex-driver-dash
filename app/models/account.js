import DS from 'ember-data';
const { hasMany, attr } = DS;

export default DS.Model.extend({
  drivers:      hasMany( 'driver' ),
  users:        hasMany( 'user', { inverse: 'company' } ),
  usersBilling: hasMany( 'user', { inverse: 'billingCompany' } ),

  name:             attr(),
  accountLevel:     attr(),
  accountNumber:    attr(),
  wexAccountNumber: attr(),
});
