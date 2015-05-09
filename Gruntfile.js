module.exports = function (grunt) {
	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		jscs: {
			src: [
				'public/js/*/*.js',
				'public/js/**/*.js'
			],
			options: {
				config: '.jscsrc'
			}
		}
	});

	grunt.loadNpmTasks('grunt-jscs');

	grunt.registerTask('codestyle', ['jscs']);

};
