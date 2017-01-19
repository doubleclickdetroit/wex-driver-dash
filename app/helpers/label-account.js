import Ember from 'ember';

export function labelAccount(params) {
  const account = params[0];
  if ( !account ) { return ''; }

  const accountName   = account.get( 'name' ),
        accountNumber = account.get( 'accountNumber' ),
        accountLevel  = account.get( 'accountLevel' );

  return `<span class="account-name">${accountName}</span>
          <span class="sep">|</span>
          <span class="account-number">#${accountNumber}</span>
          <span class="sep">|</span>
          <span class="account-level">L${accountLevel}</span>`;
}

export default Ember.Helper.helper(labelAccount);
