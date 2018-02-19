module.exports = function(grunt){

	//플러그인로딩
	[
		'grunt-cafe-mocha',
		'grunt-contrib-jshint',
		'grunt-exec',
		'grunt-contrib-handlebars',

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
				'lib/**/*.js', '!public/js/templates/*.js'],
			qa: ['Gruntfile.js', 'public/qa/**/*.js', 'qa/**/*.js'],
		},

		exec: {
			linkchecker: 
				{ cmd: 'linkchecker http://localhost:3000' }
		},

		handlebars: {
			options: {
			    namespace: 'TPL',
			    processName: function(filePath) {
			        return filePath.replace(/^public\//, '').replace(/^js\//, '').replace(/^templates\//, '').replace(/^views\//, '').replace(/\.handlebars$/, '')
			        .replace(/^profile_EP\//, 'EP').replace(/^newProfileOne_NPO\//, 'NPO').replace(/^school_SC\//, 'SC').replace(/^home_HM\//, 'HM').replace(/^schoolBoards_SB\//, 'SB').replace(/^register_RG\//, 'RG')
			        .replace(/^newsFeed_NF\//, 'NF').replace(/^schoolProfiles_SP\//, 'SP').replace(/^myControll_MC\//, 'MC').replace(/^newProfile_NP\//, 'NP');
			    },
			},
			all : {
				files: {
					"public/js/templates/templates.js" : ["public/js/templates/views/**/*.handlebars", "!public/js/templates/controllers/**/*.js"],
				}
			}
		}

	});


	grunt.registerTask('default', ['cafemocha', 'jshint', 'exec']);


};
