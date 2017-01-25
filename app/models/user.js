import DS from 'ember-data';
const { attr, belongsTo } = DS;

export default DS.Model.extend({
  company:        belongsTo( 'account', { inverse: 'users' } ),
  billingCompany: belongsTo( 'account', { inverse: 'usersBilling' } ),

  firstName: attr(),
  email:     attr(),
  username:  attr()
});
