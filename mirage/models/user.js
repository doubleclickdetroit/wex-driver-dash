import { Model, belongsTo } from 'ember-cli-mirage';

export default Model.extend({
  company:        belongsTo( 'account' ),
  billingCompany: belongsTo( 'account' )
});
