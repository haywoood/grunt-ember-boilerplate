module.exports = (grunt) ->
  grunt.initConfig
    clean:
      all: ['.tmp', 'css', 'js']

    coffee:
      options:
        bare: true
      glob_to_multiple:
        expand: true
        cwd: 'libs/js'
        src: ['**/*.coffee']
        dest: '.tmp/js'
        ext: '.js'

    commonjs:
      modules:
        cwd: '.tmp/js/'
        src: '**/*.js'
        dest: '.tmp/js/'

    stylus:
      compile:
        files:
          'css/application.css': ['libs/**/*.styl']

    ember_handlebars:
      options:
        processName: (filename) ->
          pieces = filename.split '/'
          name = pieces[pieces.length - 1]
          name = name.replace '_', '/'
          name = name.slice 0, -4
      compile:
        files:
          'js/templates.js': ['libs/**/*.hbs']

    concat:
      styles:
        src: [
          'vendor/normalize.css'
          'css/application.css'
        ]
        dest: 'css/application.css'
      scripts:
        src: [
          'vendor/commonjs.js'
          'vendor/jquery.js'
          'vendor/handlebars.runtime.js'
          'vendor/ember.js'
          'js/templates.js'
          '.tmp/**/*.js'
        ]
        dest: 'js/application.js'

    watch:
      main:
        files: [
          'lib/**/*'
        ]
        tasks: ['default']

  grunt.loadNpmTasks 'grunt-contrib-coffee'
  grunt.loadNpmTasks 'grunt-contrib-stylus'
  grunt.loadNpmTasks 'grunt-ember-handlebars'
  grunt.loadNpmTasks 'grunt-contrib-concat'
  grunt.loadNpmTasks 'grunt-contrib-watch'
  grunt.loadNpmTasks 'grunt-commonjs'
  grunt.loadNpmTasks 'grunt-contrib-clean'

  grunt.registerTask 'default', [
    'clean'
    'coffee'
    'commonjs'
    'stylus'
    'ember_handlebars'
    'concat'
  ]
