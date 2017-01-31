import Ember from 'ember';
import SlotsMixin from 'ember-block-slots';

export default Ember.Component.extend(SlotsMixin, {
  tagName:    'header',
  classNames: [ 'component-header-page' ],

  // hardcode "partners" data; for now
  partners: Ember.A([
    { url: 'assets/images/logo-phillips.png' }
  ])
});
