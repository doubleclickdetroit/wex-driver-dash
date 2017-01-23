import ENV from 'driver-dash/config/environment';
import OAuth2PasswordGrant from 'ember-simple-auth/authenticators/oauth2-password-grant';

const grant_type   = 'password';
const scopeStrings = [ 'accounts', 'user:account_management', 'drivers' ];

export default OAuth2PasswordGrant.extend({
  serverTokenEndpoint: `${ENV.CONFIG.API.AUTH}${ENV.APP_CONFIG.ENDPOINTS.AUTH}`,

  authenticate(identification, password, scope=[], headers={}) {
    headers.grant_type = grant_type;
    scope.push( ...scopeStrings );

    return this._super( identification, password, scope, headers );
  }
});
