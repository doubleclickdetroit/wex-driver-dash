import Ember from 'ember';
import ENV from 'driver-dash/config/environment';
import OAuth2PasswordGrant from 'ember-simple-auth/authenticators/oauth2-password-grant';

const APP_CONFIG = ENV.APP_CONFIG;
const API_CONFIG = ENV.CONFIG.API;

export default OAuth2PasswordGrant.extend({
  serverTokenEndpoint: `${API_CONFIG.AUTH}${APP_CONFIG.ENDPOINTS.AUTH}`,

  authenticate(identification, password, scope=[], headers={}) {
    scope.push( ...APP_CONFIG.AUTH.SCOPE );
    return this._super( identification, password, scope, headers );
  },

  makeRequest(url, data) {
    const authToken = btoa( `${APP_CONFIG.AUTH.CLIENT_ID}:${APP_CONFIG.AUTH.CLIENT_SECRET}` );
    return Ember.$.ajax({
        url,
        data,
        type:        'POST',
        dataType:    'json',
        contentType: 'application/x-www-form-urlencoded',
        crossDomain: true,
        headers: { Authorization: `Basic ${authToken}` }
    });
  }
});
