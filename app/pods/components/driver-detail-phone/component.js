import Ember from 'ember';

export default Ember.Component.extend({
  isEditable:   false,
  displayPhone: false,

  phoneDidChange: Ember.on('init', Ember.observer('phone', function() {
    this.set( 'displayPhone', !!this.get('phone') );
  })),

  actions: {
    handleAddPhone() {
      this.send( 'handleIsEditable' );
      this.set( 'displayPhone', true );
    },
    handleIsEditable(isEditable=true) {
      this.set( 'isEditable', isEditable );
    },

    handleLeaveField() {
      this.send( 'handleIsEditable', false );
      if ( !this.get('phone') ) {
        this.set( 'displayPhone', false );
      }
    },
    handleEscapeKey() {
      // rollback value
      this.send( 'handleLeaveField' );
    }
  }

}).reopenClass({
  positionalParams: [ 'phone' ]
});
