import Ember from 'ember';

export function formatPhone(phone) {
  let numStr  = `${phone}`.replace( /[^0-9]/g, '' );
  return numStr.replace( /(\d{3})(\d{3})(\d{4})/, '$1-$2-$3' );
}

export default Ember.Helper.helper(formatPhone);
