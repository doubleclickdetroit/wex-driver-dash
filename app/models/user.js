import DS from 'ember-data';
const { attr, belongsTo } = DS;

export default DS.Model.extend({
  company:        belongsTo( 'account' ),
  billingCompany: belongsTo( 'account' ),

  firstName:         attr(),
  email:             attr(),
  username:          attr(),
  onlineApplication: attr()
});
