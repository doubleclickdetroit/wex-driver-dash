export default function() {

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
    this.hasClass( 'driver-access' ),
    this.toValue( true ),
    this.use( 'toUp' )
  );

}
