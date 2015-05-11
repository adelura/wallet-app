module.exports = function (grunt) {
	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		jscs: {
			src: [
				'tests/*.js',
				'tests/**/*.js',
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
