import DS from 'ember-data';

export default DS.Model.extend({
  firstName: DS.attr(),
  email:     DS.attr(),
  username:  DS.attr()
});
