export default function() {

  /**
   * Login
   */
  this.transition(
    this.hasClass( 'login-is-pending' ),
    this.toValue( true ),
    this.use( 'toLeft' ),
    this.reverse( 'toRight' )
  );
  this.transition(
    this.fromRoute( 'login' ),
    this.toRoute( 'secure' ),
    this.use( 'crossFade' )
  );

  /**
   * Invites
   */
  this.transition(
    this.hasClass( 'login-is-pending' ),
    this.toValue( true ),
    this.use( 'toLeft' ),
    this.reverse( 'toRight' )
  );

  this.transition(
    this.hasClass( 'phone' ),
    this.toValue( true ),
    this.use( 'toUp' ),
    this.reverse( 'toDown' )
  );
  this.transition(
    this.hasClass( 'isEditable' ),
    this.toValue( true ),
    this.use( 'crossFade' )
  );
  this.transition(
    this.hasClass( 'drivers-selected' ),
    this.toValue( true ),
    this.use( 'toRight', { duration: 500 } ),
    this.reverse( 'toLeft' )
  );
  this.transition(
    this.hasClass( 'driver-invite' ),
    this.toValue( true ),
    this.use( 'toUp' )
  );

}
