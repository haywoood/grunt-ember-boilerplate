/*
 * grunt-init-node
 * https://gruntjs.com/
 *
 * Copyright (c) 2012 "Cowboy" Ben Alman, contributors
 * Licensed under the MIT license.
 */

'use strict';

// Basic template description.
exports.description = 'Starter project that gives you everything you need to start developing Ember.js applications';

// Template-specific notes to be displayed before question prompts.
exports.notes = '_Project name_ shouldn\'t contain "node" or "js" and should ' +
  'be a unique ID not already in use at search.npmjs.org.';

// Template-specific notes to be displayed after question prompts.
exports.after = 'You should now install project dependencies with _npm ' +
  'install_ and later _grunt watch to start developing.\n'+
  'http://gruntjs.com/getting-started';

// Any existing file or directory matching this wildcard will cause a warning.
exports.warnOn = '*';

// The actual init template.
exports.template = function(grunt, init, done) {

  init.process({type: 'ember app'}, [
    // Prompt for these values.
    init.prompt('name'),
    init.prompt('description'),
    init.prompt('version'),
    init.prompt('repository'),
    init.prompt('homepage'),
    init.prompt('bugs'),
    init.prompt('licenses'),
    init.prompt('author_name'),
    init.prompt('author_email'),
    init.prompt('author_url')
  ], function(err, props) {
    props.keywords = [];
    props.devDependencies = {
      "grunt": "~0.4.1",
      "grunt-contrib-coffee": "~0.6.0",
      "grunt-contrib-stylus": "~0.4.1",
      "grunt-contrib-concat": "~0.1.3",
      "grunt-commonjs": "~0.2.0rc7",
      "grunt-contrib-clean": "~0.4.0",
      "grunt-contrib-uglify": "~0.2.0",
      "grunt-contrib-livereload": "~0.1.2",
      "grunt-regarde": "~0.1.1",
      "grunt-ember-templates": "~0.4.4",
      "grunt-contrib-cssmin": "~0.6.0",
      "grunt-contrib-qunit": "~0.2.1"
    };

    // Files to copy (and process).
    var files = init.filesToCopy(props);

    // Add properly-named license files.
    init.addLicenseFiles(files, props.licenses);

    // Actually copy (and process) files.
    init.copyAndProcess(files, props);

    // Generate package.json file.
    init.writePackageJSON('package.json', props);

    // All done!
    done();
  });

};
