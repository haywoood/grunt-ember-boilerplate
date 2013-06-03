'use strict'
path = require 'path'
lrSnippet = require('grunt-contrib-livereload/lib/utils').livereloadSnippet

folderMount = (connect, point) ->
  connect.static(path.resolve(point))

module.exports = (grunt) ->
  grunt.initConfig
    livereload:
      port: 35729
      
    qunit:
      all: ['tests/**/*.html']

    clean:
      all: ['.tmp/**/*.*', 'public/css', 'public/js']

    coffee:
      options:
        bare: true
      glob_to_multiple:
        expand: true
        cwd: ''
        src: ['libs/**/*.coffee', 'tests/integration/**/*.coffee']
        dest: '.tmp/js'
        ext: '.js'

    commonjs:
      modules:
        cwd: '.tmp/js/libs/js/'
        src: '**/*.js'
        dest: '.tmp/js/libs/js/'

    stylus:
      compile:
        files:
          'public/css/application.css': ['libs/**/*.styl']

    cssmin: {
      compress: {
        files: {
          'public/css/application.css': ['public/css/application.css']
        }
      }
    }

    emberTemplates:
      compile:
        options:
          templateName: (sourceFile) ->
            sourceFile.replace(/libs\/js\/templates\//, '')
        files:
          '.tmp/js/libs/templates.js': ['libs/**/*.handlebars']

    concat:
      styles:
        src: [
          'vendor/normalize.css'
          'public/css/application.css'
        ]
        dest: 'public/css/application.css'
      tests:
        src: [
          'tests/integration/**/*.js'
          '.tmp/js/tests/**/*.js'
        ]
        dest: 'tests/test_bundle.js'
      precompile:
        src: [
          'vendor/jquery.js'
          'vendor/common.js'
          'vendor/handlebars.runtime.js'
          'vendor/ember.min.js'
          'vendor/ember-data.min.js'
          '.tmp/js/libs/templates.js'
          '.tmp/js/libs/js/**/*.js'
        ]
        dest: 'public/js/application.js'
      scripts:
        src: [
          'vendor/jquery.js'
          'vendor/common.js'
          'vendor/handlebars.runtime.js'
          'vendor/ember.js'
          'vendor/ember-data.js'
          '.tmp/js/libs/templates.js'
          '.tmp/js/libs/js/**/*.js'
        ]
        dest: 'public/js/application.js'

    uglify:
      precompile:
        files:
          'public/js/application.js': ['public/js/application.js']

    regarde:
      coffee:
        files: 'libs/js/**/*.coffee'
        tasks: ['default', 'livereload', 'regarde']
      handlebars:
        files: 'libs/**/*.handlebars'
        tasks: ['default', 'livereload', 'regarde']
      stylus:
        files: 'libs/**/*.styl'
        tasks: ['default', 'livereload', 'regarde']
      tests:
        files: ['tests/integration/**/*.js', 'tests/integration/**/*.coffee']
        tasks: ['test', 'livereload', 'regarde']


  grunt.loadNpmTasks 'grunt-contrib-livereload'
  grunt.loadNpmTasks 'grunt-contrib-coffee'
  grunt.loadNpmTasks 'grunt-contrib-uglify'
  grunt.loadNpmTasks 'grunt-contrib-stylus'
  grunt.loadNpmTasks 'grunt-contrib-cssmin'
  grunt.loadNpmTasks 'grunt-ember-templates'
  grunt.loadNpmTasks 'grunt-contrib-concat'
  grunt.loadNpmTasks 'grunt-commonjs'
  grunt.loadNpmTasks 'grunt-contrib-clean'
  grunt.loadNpmTasks 'grunt-regarde'
  grunt.loadNpmTasks 'grunt-contrib-qunit'


  grunt.registerTask 'default', [
    'clean'
    'coffee'
    'commonjs'
    'stylus'
    'emberTemplates'
    'concat:scripts'
    'concat:styles'
  ]

  grunt.registerTask 'watch', [
    'livereload-start'
    'regarde'
  ]

  grunt.registerTask 'precompile', [
    'clean'
    'coffee'
    'commonjs'
    'stylus'
    'emberTemplates'
    'concat:precompile'
    'concat:styles'
    'uglify'
    'cssmin'
  ]

  grunt.registerTask 'test', [
    'default'
    'concat:tests'
    'qunit'
  ]
