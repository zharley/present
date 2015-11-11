/* jshint node: true */
module.exports = function(grunt) {
  // Node dependencies
  var path = require('path');
  var fs = require('fs');

  // Configuration
  var config = {};
  config.basePath = process.cwd();
  grunt.option('revealPath', path.resolve(require.resolve('reveal.js'), '..', '..'));
  config.revealPath = path.resolve(require.resolve('reveal.js'), '..', '..');
  config.port = grunt.option('port') || 8000;
  config.title = grunt.option('title') || 'Example Title';
  config.author = grunt.option('author') || '';
  config.description = grunt.option('description') || '';
  config.slides = grunt.option('slides') || 'src/slides.md';
  config.separator = grunt.option('separator') || "^---";
  config.theme = grunt.option('theme') || 'open';
  config.assets = grunt.option('assets') || 'assets';

  // Slide preprocessing
  var markdown = fs.readFileSync(config.slides).toString();
  var slides = markdown.split(new RegExp(config.separator, 'mgi'));
  var beforeSlide = '<section data-markdown><script type="text/template">\n';
  var afterSlide = '\n</script></section>';
  var html = 'No slides';
  if (slides.length > 0) {
    html = beforeSlide;
    html += slides.join(afterSlide + beforeSlide);
    html += afterSlide;
  }

  // Main Grunt config
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    meta: {
      banner:
        '/*!\n' +
        ' * <%= pkg.name %> <%= pkg.version %> (<%= grunt.template.today("yyyy-mm-dd, HH:MM") %>)\n' +
        ' */'
    },

    template: {
      index: {
        options: {
          data: {
            title: config.title,
            author: config.author,
            description: config.description,
            slides: html,
            theme: config.theme
          }
        },
        files: {
          'dist/index.html': ['src/index.html.tpl']
        }
      }
    },

    copy: {
      main: {
        files: [{ 
          expand: true, 
          cwd: config.assets,
          src: [ '*' ], 
          dest: 'dist/assets', 
          filter: 'isFile' 
        }],
      },
    },

    uglify: {
      options: {
        banner: '<%= meta.banner %>\n'
      },
      reveal: {
        src: path.join(config.revealPath, 'js', 'reveal.js'),
        dest: 'dist/js/reveal.min.js'
      },
      reveal_lib: {
        files: [{
          expand: true,
          cwd: path.join(config.revealPath, 'lib'),
          src: '**/*.js',
          dest: 'dist/lib'
        }]
      },
      reveal_plugins: {
        files: [{
          expand: true,
          cwd: path.join(config.revealPath, 'plugin'),
          src: '**/*.js',
          dest: 'dist/plugin'
        }]
      }
    },

    sass: {
      reveal_themes: {
        files: [
          {
            expand: true,
            cwd: path.join(config.revealPath, 'css', 'theme', 'source'),
            src: ['*.scss'],
            dest: 'dist/css/theme',
            ext: '.css'
          }
        ]
      },
      reveal_core: {
        files: [
          {
            expand: true,
            cwd: path.join(config.revealPath, 'css'),
            src: ['*.scss'],
            dest: 'dist/css',
            ext: '.css'
          }
        ]
      },
      custom_themes: {
        options: {
          includePaths: [ path.join(config.revealPath, 'css', 'theme', 'template') ]
        },
        files: [
          {
            expand: true,
            cwd: path.join('src', 'css', 'theme'),
            src: ['*.scss'],
            dest: 'dist/css/theme',
            ext: '.css'
          }
        ]
      }
    },

    autoprefixer: {
      dist: {
        src: 'dist/css/reveal.css'
      }
    },

    cssmin: {
      compress: {
        files: {
          'dist/css/reveal.min.css': [ 'dist/css/reveal.css' ]
        }
      }
    },

    jshint: {
      options: {
        curly: false,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        eqnull: true,
        browser: true,
        expr: true,
        globals: {
          head: false,
          module: false,
          console: false,
          unescape: false,
          define: false,
          exports: false
        }
      },
      files: [ 'Gruntfile.js', 'js/reveal.js' ]
    },

    connect: {
      server: {
        options: {
          port: config.port,
          base: 'dist',
          livereload: true,
          open: true
        }
      }
    },

    watch: {
      options: {
        livereload: true
      },
      js: {
        files: [ 'Gruntfile.js' ],
        tasks: 'js'
      },
      theme: {
        files: [ 'src/css/theme/*.scss' ],
        tasks: 'sass'
      },
      html: {
        files: [ 'src/*.tpl', config.slides ],
        tasks: 'template'
      },
    }
  });

  // Dependencies
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-template');
  grunt.loadNpmTasks('grunt-contrib-copy');

  // Default task
  grunt.registerTask('default', [ 'css', 'js', 'template', 'copy' ]);

  // JS task
  grunt.registerTask('js', [ 'jshint', 'uglify' ]);

  // All CSS
  grunt.registerTask('css', [ 'sass', 'autoprefixer', 'cssmin' ] );

  // Serve presentation locally
  grunt.registerTask('serve', [ 'connect', 'watch' ] );
};
