import Ember from 'ember';

export default Ember.Component.extend({
  classNames: [ 'component-driver-detail-phone' ],

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

  closeField() {
    // allow `toDown` transition to completes before toggle isEditable
    Ember.run.later(() => {
      this.send( 'handleIsEditable', false );
    }, 500);

    if ( !this.get('buffer') ) {
      this.set( 'displayPhone', false );
    }
  },

  actions: {
    handleAddPhone() {
      this.send( 'handleIsEditable' );
      this.set( 'displayPhone', true );
    },
    handleIsEditable(isEditable=true) {
      this.set( 'isEditable', isEditable );
      Ember.run.later(() => { $( '.phone-input' ).focus(); }, 500);
    },
    handleClearBuffer() {
      this.set( 'buffer', '' );
    },


    handleEnterKey() {
      this.set( 'phone', this.get('buffer') );
      this.closeField();
    },
    handleEscapeKey() {
      this.set( 'buffer', this.get('phone') );
      this.closeField();
    }
  }

}).reopenClass({
  positionalParams: [ 'phone' ]
});
