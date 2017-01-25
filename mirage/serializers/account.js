import ApplicationSerializer from './application';

export default ApplicationSerializer.extend({

  serialize(/*object, request*/) {
    let json = ApplicationSerializer.prototype.serialize.apply( this, arguments );

    json.forEach(account => {
      // set primaryKey to `accountId`
      account.accountId = account.id

      // add links hash
      account.links = { drivers: `/accounts/${account.id}/drivers` };
    });

    return json;
  }

});
