/* jshint node: true */

module.exports = function(environment) {
  const CONFIG = require( './project' ).config;

  var ENV = {
    modulePrefix:    'driver-dash',
    podModulePrefix: 'driver-dash/pods',
    environment: environment,
    baseURL: '/',
    locationType: 'auto',
    EmberENV: {
      EXTEND_PROTOTYPES: {
        Date: false,
      },
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    }
  };

  ENV.APP_CONFIG = CONFIG.ALL;
  ENV.MOCK       = CONFIG.MOCK;

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;

    var api = process.env.api;
    if ( api ) { api = api.toUpperCase() }

    ENV.CONFIG = CONFIG[ api ] || CONFIG.DIT;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';

    ENV.CONFIG = CONFIG.MOCK;
  }

  if (environment === 'production') {
    ENV.CONFIG = CONFIG.PROD;
  }

  ENV[ 'ember-simple-auth' ] = {
    authenticationRoute:         'login',
    routeAfterAuthentication:    'secure',
    routeIfAlreadyAuthenticated: 'secure'
  };

  return ENV;
};
