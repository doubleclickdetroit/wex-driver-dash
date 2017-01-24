import { Factory, faker } from 'ember-cli-mirage';

export default Factory.extend({
  name: faker.company.companyName,

  accountNumber() {
    return faker.random.number( 10000000000000, { min: 13 } );
  },

  afterCreate(account) {
    account.update({
      links: { drivers: `/accounts/${account.id}/drivers` }
    });
  }
});
