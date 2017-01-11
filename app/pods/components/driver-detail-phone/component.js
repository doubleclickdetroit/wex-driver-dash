import Ember from 'ember';

export default Ember.Component.extend({
  phone:  '',
  buffer: '',

  isEditable:   false,
  displayPhone: false,

  initBuffer: Ember.on('init', function() {
    const phone = this.get( 'phone' );

    this.setProperties({
      buffer: phone,
      displayPhone: !!phone
    });
  }),

  actions: {
    handleAddPhone() {
      this.send( 'handleIsEditable' );
      this.set( 'displayPhone', true );
    },
    handleIsEditable(isEditable=true) {
      this.set( 'isEditable', isEditable );
      Ember.run.later(() => { $( '.phone-input' ).focus(); }, 500);
    },

    handleLeaveField() {
      this.send( 'handleIsEditable', false );

      if ( !this.get('buffer') ) {
        this.set( 'displayPhone', false );
      }
    },
    handleEnterKey() {
      this.set( 'phone', this.get('buffer') );
      this.send( 'handleLeaveField' );
    },
    handleEscapeKey() {
      // rollback value
      this.set( 'buffer', this.get('phone') );
      this.send( 'handleLeaveField' );
    }
  }

}).reopenClass({
  positionalParams: [ 'phone' ]
});
