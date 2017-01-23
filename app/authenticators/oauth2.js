import ENV from 'driver-dash/config/environment';
import OAuth2PasswordGrant from 'ember-simple-auth/authenticators/oauth2-password-grant';

const scopeStrings = [ 'accounts', 'user:account_management', 'drivers' ];

export default OAuth2PasswordGrant.extend({
  serverTokenEndpoint: `${ENV.CONFIG.API.AUTH}${ENV.APP_CONFIG.ENDPOINTS.AUTH}`,

  authenticate(identification, password, scope=[], headers={}) {
    scope.push( ...scopeStrings );
    return this._super( identification, password, scope, headers );
  }
});
