import ApplicationAdapter from './application';
import ENV from 'driver-dash/config/environment';

export default ApplicationAdapter.extend({
  host: ENV.MOCKS.API.AM
});
