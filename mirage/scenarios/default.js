import moment from 'moment';

export default function(server) {

  /*
    Seed your development database using your factories.
    This data will not be loaded in your tests.

    Make sure to define a factory for each model you want to create.
  */

  function getRandomNumber(n=5) {
    return Math.floor( Math.random() * n );
  }
  function getRandomBoolean() {
    return getRandomNumber(10) >= 5;
  }
  function getRandomAccount() {
    let n = getRandomNumber( accounts.length );
    return accounts[ n ];
  }
  function getRandomInvitationStatus() {
    let attrs = {};

    // has invite?
    if ( getRandomBoolean() ) {
      let numDays = getRandomNumber();
      attrs = { inviteExpiresAt: moment().add( numDays, 'days' ).toDate() };

      // is underliverable?
      if ( getRandomBoolean() ) {
        attrs.underliveredAt = attrs.inviteExpiresAt;
      }
    }

    return attrs;
  }

  // create accounts
  const accounts = [
    server.create( 'account', { accountLevel: 1, name: 'State of Maine' } ),
    server.create( 'account', { accountLevel: 2, name: 'Aroostook County' } ),
    server.create( 'account', { accountLevel: 2, name: 'Cumberland County' } ),
    server.create( 'account', { accountLevel: 3, name: 'Washington County' } ),
    server.create( 'account', { accountLevel: 4, name: 'Androscoggin County' } )
  ];

  // create current user (with associations)
  server.create('user', {
    company:        getRandomAccount(),
    billingCompany: getRandomAccount()
  });

  // create drivers (with associations)
  accounts.forEach(account => {
    // invite drivers
    let i = 0;
    let n = getRandomNumber() + 1;
    while( i < n ) {
      i++;
      let invitationAttrs = getRandomInvitationStatus();
      server.create( 'driver', { accountId: account.id, ...invitationAttrs } );
    }

    // manage drivers
    n = getRandomNumber(3);
    server.createList('driver', n, {
      accountId:           account.id,
      inviteExpiresAt:     new Date(),
      confirmAcceptedAt:   new Date(),
      isDriverDashEnabled: getRandomBoolean()
    });
  });

}
