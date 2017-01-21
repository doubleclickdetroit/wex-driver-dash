import OAuth2PasswordGrant from 'ember-simple-auth/authenticators/oauth2-password-grant';

const grant_type   = 'password';
const scopeStrings = [ 'accounts', 'user:account_management', 'drivers' ];

export default OAuth2PasswordGrant.extend({
  serverTokenEndpoint: '/api/uaa/oauth/token',

  authenticate(identification, password, scope=[], headers={}) {
    headers.grant_type = grant_type;
    scope.push( ...scopeStrings );

    return this._super( identification, password, scope, headers );
  }
});
