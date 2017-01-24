import Ember from 'ember';

export function validateEmail(email) {
  const regexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return regexp.test( email );
}

export default Ember.Helper.helper(validateEmail);
