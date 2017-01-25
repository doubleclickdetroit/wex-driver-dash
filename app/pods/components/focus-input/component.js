import Ember from 'ember';
import { on } from 'ember-computed-decorators';

export default Ember.TextField.extend({
  classNames: [ 'component-focus-input' ],

  @on( 'didInsertElement' )
  setFocus() {
    this.$().focus();
  }
});
