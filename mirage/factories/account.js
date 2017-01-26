import { Factory, faker } from 'ember-cli-mirage';

export default Factory.extend({
  name: faker.company.companyName,

  accountNumber() {
    return faker.random.number( 10000000000000 );
  },
  wexAccountNumber() {
    return this.accountNumber;
  },

  afterCreate(account) {
    // set primaryKey to `accountId`
    // unsure how else to add `accountId`?
    // when embeded, doesn't seem to be serialized ಠ_ಠ
    account.update({ accountId: account.id });
  }
});
