import ApplicationSerializer from './application';

export default ApplicationSerializer.extend({

  serialize(user, request) {
    let json = ApplicationSerializer.prototype.serialize.apply( this, arguments );

    const serialize = ApplicationSerializer.prototype.serialize;
    json.company        = serialize.apply( this, [ user.company, request ] );
    json.billingCompany = serialize.apply( this, [ user.billingCompany, request ] );

    delete json.companyId;
    delete json.billingCompanyId;

    return json;
  }

});
