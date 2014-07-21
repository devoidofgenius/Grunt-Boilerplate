module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    concat: { 
      options: {
        stripBanners: true,
      },
        js: {
            src: [
                'js/*.js', // All JS in the folder
            ],
            dest: 'js/build/production.js',
        }
    },
    uglify: {
      my_target: {
        files: {
          'js/build/production.min.js': ['js/build/production.js']
        }
      }
    },
    sass: {
      dist: {
        options: {
          style: 'expanded'
        },
        files: {
          'css/build/styles.css': 'css/*.scss',
        }
      }
    },
    autoprefixer: {
        options: {
        browsers: ['last 2 version']
      },
      single_file: {
        src: 'css/styles.css',
        dest: 'css/main.css'
      }
    },
    cssmin: {
      options: {
        keepSpecialComments: 0,
      },
      css: {
        src: 'css/main.css',
        dest: 'css/build/main.min.css'
      }
    },
    imagemin: {
    dynamic: {
        files: [{
            expand: true,
            cwd: 'img/',
            src: ['**/*.{png,jpg,gif}'],
            dest: 'img/build/'
        }]
      }
    },
    watch: {
      options: {
        livereload: true,
      },
      scripts: {
        files: ['js/*.js'],
        tasks: ['concat', 'uglify'],
        options: {
          spawn: false,
        }
      },
      css: {
        files: ['css/*.scss', 'css/styles.css', 'css/main.css'],
        tasks: ['sass', 'autoprefixer', 'cssmin'],
        options: {
          spawn: false,
        }
      },
      images: {
        files: ['img/*.{png,jpg,gif}'],
        tasks: ['imagemin:dynamic'],
        options: {
          spawn: false,
        }
      },
      php:{
        files: ['./**/*.php', './inc/*.php'],
        tasks: [],
        options: {
          spawn: false
        }
      }
    }

  });
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task(s).
  grunt.registerTask('default', ['concat', 'uglify', 'sass', 'autoprefixer', 'cssmin', 'imagemin', 'watch']);

};