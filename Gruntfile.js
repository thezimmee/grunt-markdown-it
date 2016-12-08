/*
 * grunt-markdown-it
 * https://github.com/thezimmee/grunt-markdown-it
 *
 * copyright (c) 2016 The Zimmee
 * licensed under the MIT license
 */

'use strict';

module.exports = function(grunt) {
	// task configuration
	grunt.initConfig({
		// jshint
		jshint: {
			all: [
				'Gruntfile.js',
				'tasks/*.js',
				'<%= nodeunit.tests %>',
			],
			options: {
				jshintrc: '.jshintrc',
			},
		},

		// clean up
		clean: {
			tests: ['.temp'],
		},

		// markdown-it baby!
		markdownit: {
			basic: {
				options: {},
				files: [{
					cwd: 'test/fixtures/basic/',
					src: ['**/*.md'],
					dest: '.temp/basic',
					expand: true,
					ext: '.html'
				}]
			},

			html: {
				options: {
					html: true,
					langPrefix: 'lang-',
				},
				files: [{
					cwd: 'test/fixtures/html/',
					src: ['**/*.md'],
					dest: '.temp/html/',
					expand: true,
					ext: '.html'
				}]
			},

			plugins: {
				options: {
					plugins: {
						'markdown-it-anchor': {
							level: 1
						},
						'markdown-it-table-of-contents': {
							includeLevel: [2,3],
							containerClass: 'toc-test',
						},
						'markdown-it-attrs': {},
					}
				},
				files: [{
					cwd: 'test/fixtures/plugins/',
					src: ['**/*.md'],
					dest: '.temp/plugins/',
					expand: true,
					ext: '.html'
				}]
			},

			highlighted: {
				options: {
					highlightjs: true,
				},
				files: [{
					src: ['test/fixtures/highlighted/**/*.md'],
					dest: '.temp/highlighted/highlighted.html',
				}]
			},
		},

		// unit tests
		nodeunit: {
			tests: ['test/*_test.js'],
		}

	});

	// load tasks
	grunt.loadTasks('tasks');

	// include plugins
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-nodeunit');

	// test task
	grunt.registerTask('test', ['clean', 'markdownit', 'nodeunit']);

	// default task
	grunt.registerTask('default', ['jshint', 'test']);

};
