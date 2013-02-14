module.exports = function(grunt) {
  grunt.initConfig({
    watch: {
      scripts: {
        files: ['src/coffee/**/*.coffee', 'specs/**/**.coffee', 'src/templates/**/*.hbs'],
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
    handlebars: {
      compile: {
        options: {
          namespace: 'tpl',
          wrapped: true,
          processPartialName: function(filePath) { // input:  templates/_header.hbs
            var pieces = filePath.split("/");
            return pieces[pieces.length - 1].slice(0, -4); // output: _header.hbs
          },
          processName: function(filePath) { // input:  templates/_header.hbs
            var pieces = filePath.split("/");
            return pieces[pieces.length - 1].slice(0, -4); // output: _header.hbs
          }
        },
        files: {
          "build/javascripts/templates.js": ["src/templates/**/*.hbs"]
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
    clean: {
      folder: ['build/javascripts', 'specs/compiled'],
    },
    concat: {
      dist: {
        src: ['vendor/zepto.js', 'vendor/underscore.js', 'vendor/backbone.js', 'vendor/handlebars.runtime.js', 'vendor/swag.js', 'build/javascripts/templates.js', 'build/javascripts/app.js'],
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
  grunt.loadNpmTasks('grunt-clean')
  grunt.loadNpmTasks('grunt-contrib-handlebars')

  grunt.registerTask('default', 'clean coffee:app handlebars clientside concat coffee:test jasmine')

}
