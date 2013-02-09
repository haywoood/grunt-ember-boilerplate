module.exports = function(grunt) {
  grunt.initConfig({
    watch: {
      scripts: {
        files: ['src/coffee/**/*.coffee', 'specs/**/**.coffee'],
        tasks: 'default'
      },
      jade: {
        files: 'src/*.jade',
        tasks: 'jade'
      },
      stylus: {
        files: 'src/stylus/**/*.styl',
        tasks: 'stylus'
      }
    },
    coffee: {
      app: {
        src: ['src/coffee/**/*.coffee'],
        dest: 'build/javascripts'
      },
      test: {
        src: ['specs/**/*.coffee'],
        dest: 'specs/compiled',
        options: {
          preserve_dirs: true,
          base_path: 'specs'
        }
      }
    },
    clientside: {
      main: {
        main: 'build/javascripts/app.js',
        output: 'build/javascripts/app.js'
      }
    },
    stylus: {
      compile: {
        options: {
          paths: ['src/stylus'],
        },
        files: {
          'build/css/app.css': ['src/stylus/**/*.styl'] // compile and concat into single file
        }
      }
    },
    concat: {
      dist: {
        src: ['vendor/zepto.js', 'vendor/underscore.js', 'vendor/backbone.js', 'build/javascripts/app.js'],
        dest: 'build/javascripts/app.js'
      }
    },
    jade: {
      html: {
        src: ['src/*.jade'],
        dest: 'build',
        options: {
          client: false
        }
      }
    },
    jasmine : {
      // Your project's source files
      src : 'build/javascripts/app.js',
      // Your Jasmine spec files
      specs : 'specs/compiled/**/*_spec.js',
      // Your spec helper files
      helpers : 'specs/compiled/helpers/*.js'
    }
  })

  grunt.loadNpmTasks('grunt-coffee')
  grunt.loadNpmTasks('grunt-jade')
  grunt.loadNpmTasks('grunt-clientside')
  grunt.loadNpmTasks('grunt-contrib-stylus')
  grunt.loadNpmTasks('grunt-jasmine-runner')

  grunt.registerTask('default', 'coffee:app clientside concat coffee:test jasmine')

}
