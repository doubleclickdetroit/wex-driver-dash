import moment from 'moment';
import Mirage from 'ember-cli-mirage';
import ENV from 'driver-dash/config/environment';

export default function() {

  // These comments are here to help you get started. Feel free to delete them.

  /*
    Config (with defaults).

    Note: these only affect routes defined *after* them!
  */

  // this.urlPrefix = '';    // make this `http://localhost:8080`, for example, if your API is on a different server
  // this.namespace = 'api';    // make this `api`, for example, if your API is namespaced
  // this.timing = 400;      // delay for each request, automatically set to 0 during testing

  /*
    Shorthand cheatsheet:

    this.get('/posts');
    this.post('/posts');
    this.get('/posts/:id');
    this.put('/posts/:id'); // or this.patch
    this.del('/posts/:id');

    http://www.ember-cli-mirage.com/docs/v0.2.x/shorthands/
  */

  this.get( '/accounts' );

  this.get('/accounts/:id/drivers', function({ accounts }, request) {
    let id = request.params.id;
    return accounts.find( id ).drivers;
  });

  this.put('/drivers/:id', function({ drivers }, request) {
    let numDays = Math.floor( (Math.random() * 4) + 1 );
    let attrs = {
      underliveredAt:  null,
      inviteExpiresAt: moment().add( numDays, 'days' ).toDate()
    };

    return drivers.find( request.params.id ).update( attrs );
  });


  /**
   * Authentication
   */
  function formEncodedToJson(encoded) {
    let result = {};
    encoded.split( '&' ).forEach(function(part) {
      var item = part.split( '=' );
      result[ item[0] ] = decodeURIComponent( item[1] );
    });

    return result;
  }

  this.post('/uaa/oauth/token', function(db, request) {
    let params = formEncodedToJson( request.requestBody );
    if ( params.username === "user" && params.password === "password" ) {
      return {
        token_type:   'bearer',
        access_token: 'abc123xyz789'
      };
    }
    else {
      let body = { error: 'unauthorized' };
      return new Mirage.Response( 401, {}, body );
    }
  });


  /**
   * Users
   */
  this.get('/users/current', function({ users, accounts }, request) {
    if ( request.requestHeaders.Authorization === "Bearer abc123xyz789" ) {
      return users.first();
    }
    else {
      return new Mirage.Response( 401, {}, {} );
    }
  });


  if ( ENV.CONFIG ) {
    this.passthrough( `${ENV.CONFIG.API.AM}/**` );
    this.passthrough( `${ENV.CONFIG.API.AUTH}/**` );
  }
}
