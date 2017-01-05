import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('login', { path: '' });

  this.route('secure', function() {
    this.route('dashboard', { path: '' });
    this.route('invites');
  });
});

export default Router;
