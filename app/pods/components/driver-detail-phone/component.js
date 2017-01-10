import Ember from 'ember';

export default Ember.Component.extend({
  isEditable:   false,
  displayPhone: false,

  keyPress: function(evt) {
    if ( evt.which === 13 ) {
      this.send( 'handleIsEditable', false );

      // if no phone on complete, revert back to "add"
      if ( !this.get('phone') ) {
        this.set( 'displayPhone', false );
      }
    }
  },

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
    }
  }

}).reopenClass({
  positionalParams: [ 'phone' ]
});
