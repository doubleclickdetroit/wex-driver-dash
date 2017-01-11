/*jshint node:true*/
/* global require, module */
var EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  var app = new EmberApp(defaults, {
    'ember-cli-foundation-6-sass': {
      'foundationJs': 'all'
      // load js partials: http://foundation.zurb.com/sites/docs/accordion.html#sass-variables
    }
  });

  // Use `app.import` to add additional libraries to the generated
  // output files.
  //
  // If you need to use different assets in different
  // environments, specify an object as the first parameter. That
  // object's keys should be the environment name and the values
  // should be the asset to use in that environment.
  //
  // If the library that you are including contains AMD or ES6
  // modules that you would like to import into your application
  // please specify an object with the list of modules as keys
  // along with the exports of each module as its value.

  // Fontello
  app.import( 'vendor/fontello/css/animation.css' );
  app.import( 'vendor/fontello/css/fontello.css' );
  app.import( 'vendor/fontello/font/fontello.eot', { destDir: 'font' } );
  app.import( 'vendor/fontello/font/fontello.woff2', { destDir: 'font' } );
  app.import( 'vendor/fontello/font/fontello.woff', { destDir: 'font' } );
  app.import( 'vendor/fontello/font/fontello.ttf', { destDir: 'font' } );
  app.import( 'vendor/fontello/font/fontello.svg', { destDir: 'font' } );

  // Tablet Gothic Condensed Regular
  app.import( 'vendor/tabletgothic/tabletgothic_condensed_regular/stylesheet.css' );
  app.import( 'vendor/tabletgothic/tabletgothic_condensed_regular/TabletGothicCondensed-Regular.eot', { destDir: 'font' } );
  app.import( 'vendor/tabletgothic/tabletgothic_condensed_regular/TabletGothicCondensed-Regular.woff', { destDir: 'font' } );
  app.import( 'vendor/tabletgothic/tabletgothic_condensed_regular/TabletGothicCondensed-Regular.ttf', { destDir: 'font' } );
  app.import( 'vendor/tabletgothic/tabletgothic_condensed_regular/TabletGothicCondensed-Regular.svg', { destDir: 'font' } );

  // Tablet Gothic Condensed Semibold
  app.import( 'vendor/tabletgothic/tabletgothic_condensed_semibold/stylesheet.css' );
  app.import( 'vendor/tabletgothic/tabletgothic_condensed_semibold/TabletGothicCondensed-SemiBold.eot', { destDir: 'font' } );
  app.import( 'vendor/tabletgothic/tabletgothic_condensed_semibold/TabletGothicCondensed-SemiBold.woff', { destDir: 'font' } );
  app.import( 'vendor/tabletgothic/tabletgothic_condensed_semibold/TabletGothicCondensed-SemiBold.ttf', { destDir: 'font' } );
  app.import( 'vendor/tabletgothic/tabletgothic_condensed_semibold/TabletGothicCondensed-SemiBold.svg', { destDir: 'font' } );

  // Tablet Gothic Condensed Bold
  app.import( 'vendor/tabletgothic/tabletgothic_condensed_bold/stylesheet.css' );
  app.import( 'vendor/tabletgothic/tabletgothic_condensed_bold/TabletGothicCondensed-Bold.eot', { destDir: 'font' } );
  app.import( 'vendor/tabletgothic/tabletgothic_condensed_bold/TabletGothicCondensed-Bold.woff', { destDir: 'font' } );
  app.import( 'vendor/tabletgothic/tabletgothic_condensed_bold/TabletGothicCondensed-Bold.ttf', { destDir: 'font' } );
  app.import( 'vendor/tabletgothic/tabletgothic_condensed_bold/TabletGothicCondensed-Bold.svg', { destDir: 'font' } );

  // Open Sans Regular
  app.import( 'vendor/opensans/opensans_regular/stylesheet.css' );
  app.import( 'vendor/opensans/opensans_regular/OpenSans-Regular-webfont.eot', { destDir: 'font' } );
  app.import( 'vendor/opensans/opensans_regular/OpenSans-Regular-webfont.woff', { destDir: 'font' } );
  app.import( 'vendor/opensans/opensans_regular/OpenSans-Regular-webfont.ttf', { destDir: 'font' } );
  app.import( 'vendor/opensans/opensans_regular/OpenSans-Regular-webfont.svg', { destDir: 'font' } );

  // Open Sans Italic
  app.import( 'vendor/opensans/opensans_italic/stylesheet.css' );
  app.import( 'vendor/opensans/opensans_italic/OpenSans-Italic-webfont.eot', { destDir: 'font' } );
  app.import( 'vendor/opensans/opensans_italic/OpenSans-Italic-webfont.woff', { destDir: 'font' } );
  app.import( 'vendor/opensans/opensans_italic/OpenSans-Italic-webfont.ttf', { destDir: 'font' } );
  app.import( 'vendor/opensans/opensans_italic/OpenSans-Italic-webfont.svg', { destDir: 'font' } );

  // Open Sans Semibold
  app.import( 'vendor/opensans/opensans_semibold/stylesheet.css' );
  app.import( 'vendor/opensans/opensans_semibold/OpenSans-Semibold-webfont.eot', { destDir: 'font' } );
  app.import( 'vendor/opensans/opensans_semibold/OpenSans-Semibold-webfont.woff', { destDir: 'font' } );
  app.import( 'vendor/opensans/opensans_semibold/OpenSans-Semibold-webfont.ttf', { destDir: 'font' } );
  app.import( 'vendor/opensans/opensans_semibold/OpenSans-Semibold-webfont.svg', { destDir: 'font' } );

  // Open Sans Bold
  app.import( 'vendor/opensans/opensans_bold/stylesheet.css' );
  app.import( 'vendor/opensans/opensans_bold/OpenSans-Bold-webfont.eot', { destDir: 'font' } );
  app.import( 'vendor/opensans/opensans_bold/OpenSans-Bold-webfont.woff', { destDir: 'font' } );
  app.import( 'vendor/opensans/opensans_bold/OpenSans-Bold-webfont.ttf', { destDir: 'font' } );
  app.import( 'vendor/opensans/opensans_bold/OpenSans-Bold-webfont.svg', { destDir: 'font' } );


  return app.toTree();
};
