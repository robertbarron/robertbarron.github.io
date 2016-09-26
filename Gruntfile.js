'use strict';

module.exports = function (grunt) {
  grunt.initConfig({
    ambientes : {
      dist: 'app',
      sass: 'sass',
      css: 'app/css',
      js_sources: 'js_sources',
      js: 'app/js',
      vendors: 'vendors'
    },
    concat: {
      css: {
        dest: '<%= ambientes.css %>/robertobarron.min.css',
        src: [
          '<%= ambientes.vendors %>/foundation/foundation.css',
          '<%= ambientes.vendors %>/animate/animate.css',
          '<%= ambientes.vendors %>/grayscale/grayscale.min.css',
          '<%= ambientes.css %>/allfiles.css'

        ]
      },
      
      js_dev: {
        dest: '<%= ambientes.js %>/compiled.min.js',
        src: [
        '<%= ambientes.vendors %>/jquery/jquery.min.js',
        '<%= ambientes.vendors %>/jquery-mobile/jquery.mobile.custom.min.js',
          '<%= ambientes.vendors %>/**/*.js',
          '<%= ambientes.js_sources %>/models/*.js',
          '<%= ambientes.js_sources %>/controllers/*.js',
          '<%= ambientes.js_sources %>/bootstraps/*.js'

        ]
      },

      js_prod: {
        dest: '<%= ambientes.js %>/compiled.min.js',
        src: [
          '<%= ambientes.vendors %>/**/*.js',
          '<%= ambientes.js_sources %>/compiled.min.js'

        ]
      }
    },
    sass: {
      dist: {
        options: {
          sourceMap: false,
          style: 'compact',
        },
        files: {
          '<%= ambientes.css %>/allfiles.css': '<%= ambientes.sass %>/main.scss'
        }
      }
    },
    clean: {
      dev: {
        src: ['<%= ambientes.css %>/*.css', '<%= ambientes.js %>/', '<%= ambientes.js_sources %>/compiled.js']
      },
      prod: {
        src: ['<%= ambientes.css %>/allfiles.css','<%= ambientes.css %>/allfiles.css.map', '<%= ambientes.js_sources %>/compiled.js']
      }
    },

    uglify: {
      dist: {
        files: {
          '<%= ambientes.js %>/robertobarron.min.js': [
            '<%= ambientes.js %>/compiled.min.js'
          ]
        }
      },
      css: {
        files: {
          '<%= ambientes.js %>/robertobarron.min.js': [
            '<%= ambientes.js %>/compiled.min.js'
          ]
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('default', [
    'clean:dev',
    'sass:dist',
    'concat:css',
    'concat:js_dev',
  ]);

  grunt.registerTask('produccion', [
    'clean:dev',
    'sass:dist',
    'concat:css',
    'concat:js_dev',
    'uglify'
  ]);
};