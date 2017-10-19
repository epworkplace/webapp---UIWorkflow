// bundle.config.js
module.exports = {
  bundle: {
    main: {
      scripts: [
        './lbd/js/*.js'
      ]
    },
    vendor: {
      // scripts: './bower_components/angular/angular.js'
    }
  },
  copy: './content/**/*.{png,svg}'
};