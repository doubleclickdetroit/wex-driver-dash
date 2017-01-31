import Ember from 'ember';

export default Ember.Component.extend({
  classNames: [ 'component-driver-detail-invite' ],
}).reopenClass({
  positionalParams: [ 'driver' ]
});
