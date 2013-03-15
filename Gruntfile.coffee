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
          template = pieces.slice 3
          template.join('/').slice 0, -11
      compile:
        files:
          '.tmp/js/templates.js': ['libs/**/*.handlebars']

    concat:
      styles:
        src: [
          'vendor/normalize.css'
          'css/application.css'
        ]
        dest: 'css/application.css'
      precompile:
        src: [
          'vendor/jquery.js'
          'vendor/common.js'
          'vendor/handlebars.runtime.js'
          'vendor/ember.js'
          '.tmp/js/templates.js'
          '.tmp/**/*.js'
        ]
        dest: 'js/application.js'
      scripts:
        src: [
          'vendor/jquery.js'
          'vendor/common.js'
          'vendor/handlebars.runtime.js'
          'vendor/ember.min.js'
          '.tmp/js/templates.js'
          '.tmp/**/*.js'
        ]
        dest: 'js/application.js'

    uglify:
      precompile:
        files:
          'js/application.js': ['js/application.js']

    watch:
      main:
        files: [
          'libs/**/*'
        ]
        tasks: ['default']

  grunt.loadNpmTasks 'grunt-contrib-coffee'
  grunt.loadNpmTasks 'grunt-contrib-uglify'
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

  grunt.registerTask 'precompile', [
    'clean'
    'coffee'
    'commonjs'
    'stylus'
    'ember_handlebars'
    'concat:precompile'
    'concat:styles'
    'uglify'
  ]
