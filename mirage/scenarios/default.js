export default function(server) {

  /*
    Seed your development database using your factories.
    This data will not be loaded in your tests.

    Make sure to define a factory for each model you want to create.
  */

  [
    server.create( 'account', { accountLevel: 1, name: 'State of Maine' } ),
    server.create( 'account', { accountLevel: 2, name: 'Aroostook County' } ),
    server.create( 'account', { accountLevel: 2, name: 'Cumberland County' } ),
    server.create( 'account', { accountLevel: 3, name: 'Washington County' } ),
    server.create( 'account', { accountLevel: 4, name: 'Androscoggin County' } )
  ]
  .forEach(account => {
    const n = Math.floor( (Math.random() * 5) + 1 );
    server.createList( 'driver', n, { accountId: account.id } );
  });

}
