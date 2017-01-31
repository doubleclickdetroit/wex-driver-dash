#!/bin/bash

# Foundation Sites move _vendor directory inside scss directory and update refs
mv bower_components/foundation-sites/_vendor bower_components/foundation-sites/scss
sed -i 's/\.\.\/_vendor/_vendor/g' bower_components/foundation-sites/scss/foundation.scss
