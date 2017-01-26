import ApplicationSerializer from './application';

export default ApplicationSerializer.extend({

  serialize(/*object, request*/) {
    let json = ApplicationSerializer.prototype.serialize.apply( this, arguments );

    json.forEach(account => {
      // set primaryKey to `accountId`
      // this is also added in `afterCreate` in the factory
      // when embeded, this is ignored; doesn't seem to get serialized ಠ_ಠ
      account.accountId = account.id

      // add links hash
      account.links = { drivers: `/accounts/${account.id}/drivers` };
    });

    return json;
  }

});
