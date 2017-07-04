module.exports = function(grunt){

	//플러그인로딩
	[
		'grunt-cafe-mocha',
		'grunt-contrib-jshint',
		'grunt-exec',
	].forEach(function(task){
		grunt.loadNpmTasks(task);
	});

	//플러그인 설정
	grunt.initConfig({
		
		cafemocha: {
			all: { src: 'qa/tests-*.js' }
		},


		jshint: {
			app: ['schoolchoong.js', 'public/js/**/*.js', 
				'lib/**/*.js',],
			qa: ['Gruntfile.js', 'public/qa/**/*.js', 'qa/**/*.js'],
		},

		exec: {
			linkchecker: 
				{ cmd: 'linkchecker http://localhost:3000' }
		},

	});


	grunt.registerTask('default', ['cafemocha', 'jshint', 'exec']);


};
