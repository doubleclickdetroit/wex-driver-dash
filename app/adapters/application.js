import DS from 'ember-data';
import ENV from 'driver-dash/config/environment';
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';

export default DS.RESTAdapter.extend(DataAdapterMixin, {
  authorizer: 'authorizer:oauth2',
  host:       ENV.CONFIG.API.AM
});
