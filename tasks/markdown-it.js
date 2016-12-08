/**
 * grunt-markdown-it: wrapper for markdown-it.
 * https://github.com/thezimmee/grunt-markdown-it
 *
 * copyright (c) 2016 The Zimmee
 * licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

	// see http://gruntjs.com/creating-tasks for more info regarding creating grunt tasks
	grunt.registerMultiTask('markdownit', 'A markdown parser, done right, with markdown-it.', function () {
		// merge options to defaults
		var options = this.options();
		var html;

		// add highlight.js
		if (options.highlightjs && !options.highlight) {
			var hljs = require('highlight.js');
			var prefix = options.prefix || '<pre class="hljs"><code class="{{langClass}}">';
			var suffix = options.suffix || '</code></pre>';
			options.highlight = function (str, lang) {
				var langClass = (options.langPrefix || 'language-') + lang;
				if (lang && hljs.getLanguage(lang)) {
					try {
						return prefix.replace('{{langClass}}', langClass) + hljs.highlight(lang, str, true).value + suffix;
					} catch (__) {}

					return prefix + md.utils.escapeHtml(str) + suffix;
				}
			}
		}

		// init markdown-it
		var md = require('markdown-it')(options);

		// use plugins
		if (options.plugins) {
			var keys = Object.keys(options.plugins);
			for (var i = 0; i < keys.length; i++) {
				md.use(require(keys[i]), options.plugins[keys[i]]);
			}
		}

		// iterate over all specified file groups
		this.files.forEach(function(f) {
			// concatenate files
			var src = f.src.filter(function(filepath) {
				// warn on and remove invalid source files (if nonull was set)
				if (!grunt.file.exists(filepath)) {
					grunt.log.warn('Source file "' + filepath + '" not found.');
					return false;
				} else {
					return true;
				}
			}).map(function(filepath) {
				// read file source
				return grunt.file.read(filepath);
			}).join('');


			// parse markdown
			html = md.render(src);

			// write to destination
			grunt.file.write(f.dest, html);

			// log a success message
			grunt.log.writeln('File "' + f.dest + '" created.');
		});
	});

};
