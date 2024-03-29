module.exports = function( grunt ) {
	'use strict';

	grunt.initConfig({
		pkg: '<json:package.json>',
		meta: {
			banner: '/*!\n' +
				'* <%= pkg.name %>\n' +
				'* v<%= pkg.version %> - ' +
				'<%= grunt.template.today("yyyy-mm-dd") %>\n' +
				'<%= pkg.homepage ? "* " + pkg.homepage + "\n" : "" %>' +
				'* (c) <%= pkg.author.name %>;' +
				' <%= _.pluck(pkg.licenses, "type").join(", ") %> License\n' +
				'*/'
		},
		concat: {
			'dist/responsivetools.js': [
				'<banner>',
				'<file_strip_banner:lib/responsivetools.js>'
			]
		},
		min: {
			'dist/responsivetools.min.js': [
				'<banner>',
				'dist/responsivetools.js'
			]
		},
		lint: {
			files: [
				'grunt.js',
				'lib/responsivetools.js'
			]
		},
		qunit: {
			index: ['http://localhost:8080/test/index.html']
		},
		watch: {
			files: '<config:lint.files>',
			tasks: 'lint test'
		},
		server: {
			base: '.',
			port: 8080
		},
		jshint: {
			options: {
				es5: true,
				esnext: true,
				bitwise: true,
				curly: true,
				eqeqeq: true,
				newcap: true,
				noarg: true,
				noempty: true,
				regexp: true,
				undef: true,
				strict: true,
				trailing: true,
				smarttabs: true,
				browser: true,
				node: true,
				nonstandard: true,
				expr: true
			}
		}
	});

	// Dev - default
	grunt.registerTask('default', 'lint concat min');

	// Release
	grunt.registerTask('release', 'lint server qunit concat min');

	//Tests
	grunt.registerTask('test', 'lint server qunit');
};
