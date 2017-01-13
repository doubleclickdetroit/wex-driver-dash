import { Serializer } from 'ember-cli-mirage';

export default Serializer.extend({
  attrs: [ 'id', 'firstName', 'lastName', 'driverId', 'phone' ]
})
