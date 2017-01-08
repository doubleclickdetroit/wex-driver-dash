import { Factory, faker } from 'ember-cli-mirage';

export default Factory.extend({
  firstName: faker.name.firstName,
  lastName:  faker.name.lastName,
  driverId:  () => faker.random.number(1000000, {min: 6}),
  phone:     () => faker.phone.phoneNumberFormat()
});
