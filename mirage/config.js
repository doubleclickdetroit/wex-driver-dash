import moment from 'moment';

export default function() {

  // These comments are here to help you get started. Feel free to delete them.

  /*
    Config (with defaults).

    Note: these only affect routes defined *after* them!
  */

  // this.urlPrefix = '';    // make this `http://localhost:8080`, for example, if your API is on a different server
  this.namespace = 'api';    // make this `api`, for example, if your API is namespaced
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
    let id      = request.params.id;
    let numDays = Math.floor( (Math.random() * 4) + 1 );
    let attrs = { inviteExpiresAt: moment().add( numDays, 'days' ).toDate() };
    return drivers.find( id ).update( attrs );
  });
}
