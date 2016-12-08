'use strict';

var grunt = require('grunt');

/**
 * nodeunit
 * --------
 * https://github.com/caolan/nodeunit
 */

exports.markdownit = {
	setUp: function(done) {
		// setup here if necessary
		done();
	},

	basic: function(test) {
		var srcFile1 = grunt.file.read('.temp/basic/basic.html'),
			expectedFile1 = grunt.file.read('test/expected/basic/basic.html'),
			srcFile2 = grunt.file.read('.temp/basic/markdown.html'),
			expectedFile2 = grunt.file.read('test/expected/basic/markdown.html');

		test.equal(srcFile1, expectedFile1);
		test.equal(srcFile2, expectedFile2);
		test.done();
	},

	html: function(test) {
		var srcFile1 = grunt.file.read('.temp/html/html.html'),
			expectedFile1 = grunt.file.read('test/expected/html/html.html');

		test.equal(srcFile1, expectedFile1);
		test.done();
	},

	html: function(test) {
		var srcFile1 = grunt.file.read('.temp/plugins/plugins.html'),
			expectedFile1 = grunt.file.read('test/expected/plugins/plugins.html');

		test.equal(srcFile1, expectedFile1);
		test.done();
	},

	highlighted: function(test) {
		var srcFile1 = grunt.file.read('.temp/highlighted/highlighted.html'),
			expectedFile1 = grunt.file.read('test/expected/highlighted/highlighted.html');

		test.equal(srcFile1, expectedFile1);
		test.done();
	},
};
