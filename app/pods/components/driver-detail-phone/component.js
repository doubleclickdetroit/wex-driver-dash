import Ember from 'ember';

export default Ember.Component.extend({
  classNames: [ 'component-driver-detail-phone' ],

  phone:  '',
  buffer: '',

  hasError:     false,
  isEditable:   false,
  displayPhone: false,

  initBuffer: Ember.on('init', function() {
    const phone = this.get( 'phone' );

    this.setProperties({
      buffer: phone,
      displayPhone: !!phone
    });
  }),

  updateHasError: Ember.observer('buffer', function() {
    if ( this.get('hasError') && this.validateBuffer() ) {
      this.set( 'hasError', false );
    }
  }),

  validateBuffer() {
    const buffer = this.get( 'buffer' );
    return buffer === '' || buffer.match( /\d/g ).length === 10;
  },

  closeField() {
    this.set( 'hasError', false );

    // allow `toDown` transition to completes before toggle isEditable
    Ember.run.later(() => {
      if ( this.isDestroyed ) { return; } // teardown in tests may have already taken place
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
      if ( this.validateBuffer() ) {
        this.set( 'phone', this.get('buffer') );
        this.closeField();
        this.sendAction( 'onUpdatePhone' );
      }
      else { this.set( 'hasError', true ); }
    },
    handleEscapeKey() {
      this.set( 'buffer', this.get('phone') );
      this.closeField();
    }
  }

}).reopenClass({
  positionalParams: [ 'phone' ]
});
