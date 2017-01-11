import Ember from 'ember';

export function validatePhone(phone) {
  return !!phone && phone.match( /\d/g ).length === 10;
}

export default Ember.Helper.helper(validatePhone);
