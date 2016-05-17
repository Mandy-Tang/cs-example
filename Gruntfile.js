module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    root: __dirname,
    server: __dirname + '/server',
    client: __dirname + '/client', // source directoty for client file
    app: __dirname + '/client/app', // source directory for the app
    bowerComponentsDir: __dirname + '/client/bower_components',

    meta: {
      banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? " * " + pkg.homepage + "\\n" : "" %>' +
      ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.company %>;' +
      ' Licensed <%= pkg.license %> */\n'
    },
    hintFiles: [
      'Gruntfile.js',
      '<%= server %>/**/*.js',
      '<%= client %>/app/**/*.js',
      '<%= client %>/js/**/*.js'
    ],
    lessFiles: [
      '<%= client %>/styles/less/**/*.less'
    ],
    publicCssFiles: [
      '<%= client %>/styles/css/font-awesome.css'
    ],
    serverFiles: [
      '<%= server %>/**/*.js'
    ],
    appFiles: [
      '<%= app %>/app.config.js',
      '<%= app %>/app.js',
      '<%= app %>/**/module.js',
      '<%= app %>/**/!(module)*.js'
    ],
    vendorFiles: [
      '<%= client %>/bower_components/jquery/dist/jquery.min.js',
      '<%= client %>/bower_components/lodash/dist/lodash.min.js',
      '<%= client %>/bower_components/angular/angular.min.js',
      '<%= client %>/bower_components/angular-cookies/angular-cookies.min.js',
      '<%= client %>/bower_components/angular-ui-router/release/angular-ui-router.min.js',
      '<%= client %>/bower_components/angular-bootstrap/ui-bootstrap.min.js',
      '<%= client %>/bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js'
    ],
    less: {
      bst: {
        options: {
          strictMath: true,
          sourceMap: true,
          //outputSourceFiles: true,
          sourceMapURL: 'bootstrap.css.map',
          sourceMapFilename: '<%= client %>/styles/css/bootstrap.css.map'
        },
        src: '<%= client %>/styles/less/bootstrap.less',
        dest: '<%= client %>/styles/css/bootstrap.css'
      }
    },
    autoprefixer: {
      bst: {
        options: {
          map: true
        },
        src: '<%= client %>/styles/css/bootstrap.css'
      }
    },
    csscomb: {
      options: {
        config: '<%= client %>/styles/less/.csscomb.json'
      },
      bst: {
        src: '<%= client %>/styles/css/bootstrap.css',
        dest: '<%= client %>/styles/css/bootstrap.css'
      }
    },
    cssmin: {
      options: {
        keepSpecialComments: '*',
        sourceMap: true,
        advanced: false
      },
      bst: {
        src: '<%= client %>/styles/css/bootstrap.css',
        dest: '<%= client %>/styles/css/bootstrap.min.css'
      },
      'public': {
        src: '<%= publicCssFiles %>',
        dest: '<%= client %>/styles/css/public.min.css'
      }
    },
    jshint: {
      source: {
        files: {
          src: '<%= hintFiles %>'
        }
      },
      options: {
        jshintrc: true
      }
    },
    jscs: {
      options: {
        config: '.jscsrc'
      },

      // just lint the source dir
      source: {
        src: '<%= hintFiles %>'
      },

      // fix any linting errors that can be fixed
      fixup: {
        src: '<%= hintFiles %>',
        options: {
          fix: true
        }
      }
    },
    concat: {
      options: {
        separator: '\n;\n',
        sourceMap: true,
        stripBanners: true,
        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %> */',
      },
      app: {
        src: '<%= appFiles %>',
        dest: '<%= client %>/build/app.js'
      },
      vendor: {
        src: '<%= vendorFiles %>',
        dest: '<%= client %>/build/vendor.js'
      }
    },
    ngAnnotate: {
      options: {
        singleQuotes: true,
      },
      app: {
        files: {
          '<%= client %>/build/app.js': ['<%= client %>/build/app.js']
        }
      }
    },
    uglify: {
      app: {
        options: {
          sourceMap: true,
          sourceMapIncludeSources: true,
          sourceMapIn: '<%= client %>/build/app.js.map'
        },
        files: {
          '<%= client %>/build/app.min.js': ['<%= client %>/build/app.js']
        }
      },
      vendor: {
        files: {
          '<%= client %>/build/vendor.min.js': ['<%= client %>/build/vendor.js']
        }
      }
    },
    ngtemplates: {
      app: {
        options: {
          prefix: '/',
          htmlmin: {
            collapseBooleanAttributes:      true,
            collapseWhitespace:             true,
            removeAttributeQuotes:          true,
            removeComments:                 true, // Only if you don't use comment directives!
            removeEmptyAttributes:          true,
            removeRedundantAttributes:      true,
            removeScriptTypeAttributes:     true,
            removeStyleLinkTypeAttributes:  true
          }
        },
        cwd: 'client',
        src: 'app/**/*.html',
        dest: 'client/build/templates.js'
      }
    },
    watch: {
      clientSide: {
        files: [
          '<%= root %>/.rebooted',
          '<%= client %>/views/**/*',
          '<%= client %>/app/**/*',
          '<%= client %>/styles/css/bootstrap.min.css',
          '<%= client %>/styles/css/public.min.css'
        ],
        options: {
          livereload: true
        }
      },
      'css-bst': {
        files: '<%= lessFiles %>',
        tasks: ['css-bst']
      },
      'css-public': {
        files: '<%= publicCssFiles %>',
        tasks: ['css-public']
      },
      // uncomment while in production environment
      //'build-app': {
      //  files: '<%= appFiles %>',
      //  tasks: ['build-app']
      //},
      //'build-vendor': {
      //  files: '<%= vendorFiles %>',
      //  tasks: ['build-vendor']
      //}
    },
    nodemon: {
      dev: {
        script: 'server/bin/www',
        options: {
          args: ['dev'],
          nodeArgs: ['--debug'],
          callback: function (nodemon) {
            nodemon.on('log', function (event) {
              console.log(event.colour);
            });

            // opens browser on initial server start
            nodemon.on('config:update', function () {
              // Delay before server listens on port
              setTimeout(function () {
                require('open')('http://localhost:3000', 'chrome');
              }, 1000);
            });

            // refreshes browser when server reboots
            nodemon.on('restart', function () {
              // Delay before server listens on port
              setTimeout(function () {
                require('fs').writeFileSync('./.rebooted', 'rebooted at ' + require('moment')().format('YYYY-MM-DD, HH:mm:ss'));
              }, 1000);
            });
          },
          env: {
            PORT: '3000'
          },
          cwd: '<%= root %>',
          watch: '<%= serverFiles %>',
          //ignore: ['data/*'],
          ext: 'js, yml, json',
          delay: 1000,
          legacyWatch: true
        }
      }
    },
    concurrent: {
      dev: {
        tasks: ['nodemon', 'watch'],
        options: {
          logConcurrentOutput: true
        }
      }
    }
    });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-jscs');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-csscomb');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-angular-templates');
  grunt.loadNpmTasks('grunt-ng-annotate');


  grunt.registerTask('hint', ['jshint:source', 'jscs:source']);
  grunt.registerTask('css', ['less:bst', 'autoprefixer:bst', 'csscomb:bst', 'cssmin:bst', 'cssmin:public']);
  grunt.registerTask('css-bst', ['less:bst', 'cssmin:bst']);
  grunt.registerTask('css-public', ['cssmin:public']);
  grunt.registerTask('build', ['concat', 'ngAnnotate:app', 'ngtemplates:app', 'uglify']);
  grunt.registerTask('build-app', ['concat:app', 'ngAnnotate:app', 'uglify:app', 'ngtemplates:app']);
  grunt.registerTask('build-vendor', ['concat:vendor', 'uglify:vendor']);
  grunt.registerTask('all', ['css', 'build']);
  grunt.registerTask('dev', ['css-bst', 'css-public', 'build', 'concurrent']);
  grunt.registerTask('default', ['dev']);

};
