import Ember from 'ember';

export function errorsLogin([status]) {
  let response;

  switch (status) {
    case 'unauthorized':
      response = 'Invalid login information. Please check your username and password or go online to set up or recover your username and password.';
    break;

    default:
      response = 'Services are down. Please try again later.';
  }

  return response;
}

export default Ember.Helper.helper(errorsLogin);
