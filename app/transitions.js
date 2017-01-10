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

}
