'use strict';
var LIVERELOAD_PORT = 35729;
var lrSnippet = require('connect-livereload')({port: LIVERELOAD_PORT});
var mountFolder = function (connect, dir) {
	return connect.static(require('path').resolve(dir));
};

module.exports = function(grunt) {
	var fs = require('fs');

	// load all grunt tasks
	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

	var path = require('path');
	var fs = require('fs');
	var _ = require('underscore');
	var sprite 	= require('node-sprite');
	var im = require('imagemagick');
	var url = require('url');
	var httpProxy = require('http-proxy');

	grunt.loadNpmTasks('grunt-contrib-handlebars');
	grunt.loadTasks(__dirname + "/tasks");


	// configurable paths
	var yeomanConfig = {
		app: 'app',
		dist: 'dist'
	};


	grunt.initConfig({
		yeoman: yeomanConfig,

		/* Compiling less files */
		less: {
			all: {
				src: 'app/styles/less/aspe.less',
				dest: 'app/styles/css/aspe.css',
				options: {
					compress: true
				}
			}
		},
		clean: {
			sprite: {
				files: [{
					dot: true,
					src: [
						'<%= yeoman.app %>/images/sprites/*.png',
					]
				}]
			},
			dist: {
				files: [{
					dot: true,
					src: [
						'.tmp',
						'<%= yeoman.dist %>/*',
						'!<%= yeoman.dist %>/.git*'
					]
				}]
			},
		},
		imagemin: {
			dist: {
				files: [{
					expand: true,
					cwd: '<%= yeoman.app %>/images',
					src: '{,*/}*.{png,jpg,jpeg}',
					dest: '<%= yeoman.dist %>/images'
				}]
			}
		},
		svgmin: {
			dist: {
				files: [{
					expand: true,
					cwd: '<%= yeoman.app %>/images',
					src: '{,*/}*.svg',
					dest: '<%= yeoman.dist %>/images'
				}]
			}
		},
		cssmin: {
			dist: {
				files: {
					'<%= yeoman.dist %>/styles/css/aspe.css': [
						'.tmp/styles/{,*/}*.css',
						'<%= yeoman.app %>/styles/css/aspe.css'
					]
				}
			}
		},
		// Put files not handled in other tasks here
		copy: {
			dist: {
				files: [{
					expand: true,
					dot: true,
					cwd: '<%= yeoman.app %>',
					dest: '<%= yeoman.dist %>',
					src: [
						'*.{ico,txt}',
						'.htaccess',
						'images/{,*/}*.{webp,gif}',
						'images_static/{,*/}*.*',
						'fonts/*'
					]
				}]
			}
		},

		sprites: {
			sourcePath: "app/images/sprites/",
			webPath: 	"/images/sprites/",
			lessPath: 	"app/styles/less/sprite.less",
		},

		server: {
			base: 		"./app",
			port: 		3015,
			keepalive: 	true
		},


		watch:{},

		staging: 'temp',
		// final build output
		output: 'dist'		
	});
	

	grunt.registerTask('spritegen', [
		'clean:sprite',
		'sprite',
	]);

	grunt.registerTask('build', [
		'spritegen',
		'less',
		
		'clean:dist',
		'imagemin',
		'svgmin',

		'cssmin',
		'copy:dist',
	]);
};