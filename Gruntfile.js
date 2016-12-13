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
						'markdown-it-container': function (md) {
							var container = require('markdown-it-container');
							var tags = [];
							md.use(container, 'html', {
								validate: function (name) {
									return name.trim().match(/([a-z]+)?\(.*\)/);
								},
								render: function (tokens, idx) {
									if (tokens[idx].nesting === 1) {
										var info = tokens[idx].info.trim();
										var attrs = info.match(/\(.*\)/) ? info.match(/\(.*\)/)[0] : null;
										var tag = info.split('(')[0];
										tags.push(tag);
										return '<' + tag + (attrs ?  ' ' + attrs.slice(1, attrs.length - 1) : '') + '>\n';
									} else {
										var html = '</' + tags[tags.length - 1] + '>\n';
										tags.pop();
										return html;
									}
								}
							});
							// md.use(container, 'class', {
							// 	validate: function (name) {
							// 		return name.trim().match(/([a-z]+)?(\.)([a-z|\.]+)/);
							// 	},
							// 	render: function (tokens, idx) {
							// 		console.log('CLASS...');
							// 		var classes = tokens[idx].info.trim().split('.');
							// 		var tag = classes.shift() || 'div';
							// 		if (tokens[idx].nesting === 1) {
							// 			console.log('classes: ', classes);
							// 			console.log('tag: ', tag);
							// 			return '<' + tag + ' class="' + classes.join(' ') + '">\n';
							// 		} else {
							// 			return '</' + tag + '>\n';
							// 		}
							// 	}
							// });
							// md.use(container, 'id', {
							// 	validate: function (name) {
							// 		return name.trim().match(/([a-z]+)?(\#)([a-z|\.]+)/);
							// 	},
							// 	render: function (tokens, idx) {
							// 		console.log('ID...');
							// 		var id = tokens[idx].info.trim().split('#');
							// 		var tag = id.shift() || 'div';
							// 		if (tokens[idx].nesting === 1) {
							// 			console.log('id: ', id);
							// 			console.log('tag: ', tag);
							// 			return '<' + tag + ' id="' + id[0] + '">\n';
							// 		} else {
							// 			return '</' + tag + '>\n';
							// 		}
							// 	}
							// });
						}
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
