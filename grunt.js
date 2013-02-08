module.exports = function(grunt) {
  grunt.initConfig({
    coffee: {
      app: {
        src: ['src/coffee/**/*.coffee'],
        dest: 'build/javascripts'
      }
    },
    watch: {
      scripts: {
        files: 'src/coffee/**/*.coffee',
        tasks: 'coffee clientside concat'
      },
      jade: {
        files: 'src/*.jade',
        tasks: 'jade'
      }
    },
    clientside: {
      main: {
        main: 'build/javascripts/app.js',
        output: 'build/javascripts/app.js'
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
    }
  })

  grunt.loadNpmTasks('grunt-coffee')
  grunt.loadNpmTasks('grunt-jade')
  grunt.loadNpmTasks('grunt-clientside')

  grunt.registerTask('default', 'coffee jade')
}
