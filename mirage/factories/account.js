import { Factory, faker } from 'ember-cli-mirage';

export default Factory.extend({
  name: faker.company.companyName,

  accountNumber() {
    return faker.random.number( 10000000000000 );
  },
  wexAccountNumber() {
    return this.accountNumber;
  }
});
