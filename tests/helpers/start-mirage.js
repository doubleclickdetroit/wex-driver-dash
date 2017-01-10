import Ember from 'ember';
import mirageInitializer from '../../initializers/ember-cli-mirage';

export default function startMirage(container) {
  mirageInitializer.initialize( container );
}
