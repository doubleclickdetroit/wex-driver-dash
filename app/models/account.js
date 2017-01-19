import DS from 'ember-data';
import { hasMany } from 'ember-data/relationships';

export default DS.Model.extend({
  drivers: hasMany( 'driver' ),

  name:          DS.attr(),
  accountNumber: DS.attr(),
  accountLevel:  DS.attr()
});
