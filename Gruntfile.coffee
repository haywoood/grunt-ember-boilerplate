module.exports = (grunt) ->
  grunt.initConfig
    coffee:
      all:
        options:
          bare: true
        src: ['libs/**/*.coffee']
        dest: 'js/application.js'

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
          'vendor/jquery.js'
          'vendor/handlebars.runtime.js'
          'vendor/ember.js'
          'js/templates.js'
          'js/application.js'
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

  grunt.registerTask 'default', ['coffee', 'stylus', 'ember_handlebars', 'concat']
