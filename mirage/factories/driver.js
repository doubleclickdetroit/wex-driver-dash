import { Factory, faker } from 'ember-cli-mirage';

export default Factory.extend({
  firstName: faker.name.firstName,
  lastName:  faker.name.lastName,

  driverId() {
    return faker.random.number( 1000000, { min: 6 } );
  },

  phone() {
    return faker.phone.phoneNumberFormat();
  }
});
