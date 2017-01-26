import { Factory, faker } from 'ember-cli-mirage';

export default Factory.extend({
  firstName:         faker.name.firstName,
  email:             faker.internet.email,
  username:          faker.internet.userName,
  onlineApplication: faker.random.arrayElement([ 'CLASSIC', 'DISTRIBUTOR', 'WOL_NP' ])
});
