var School = require('./models/school.js');
var Profile = require('./models/profile.js');
var Info = require('./models/info.js');
var Board = require('./models/board.js');
var User = require('./models/user.js');
var schoolData = require('./koreaSchoolData.json');
var seedTestData = require('./seedTestData.js');
var getRandomInt = require('./utils/testUtils.js')().getRandomInt;
var fs = require('fs');


//Seed All Data From seedData.
var seedDev = function(){

	var p1,p2,p3,p4,p5;

	var schoolArr, profileArr, boardArr, userArr, infoArr;

	//학교데이터 생성, 학교데이터의 첫번째, 두번째, 세번쨰에 백영고, 평촌중, 평촌고가 놓여져있음.
	p1 = new Promise(function(resolve, reject){
		School.remove({}, function(err){
			School.create(schoolData, function(err, schools){
				if(err) reject(err);
				schoolArr = schools;
				resolve(schools);
			});
		});	
	});

	var mySchoolIds = [schoolArr[0]._id, schoolArr[1]._id, schoolArr[2]._id];

	//p2 -> Profile remove - 위에서 채워진 profileList를 바탕으로, profile create
	p2 = new Promise(function(resolve, reject){
		Profile.remove({}, function(err){
			Profile.create(seedData.profileList, function(err, profiles){
				if(err) reject(err);
				profileArr = profiles;
				resolve(profiles);
			});
		});
	});


	//p3 -> Profile remove - 위에서 채워진 profileList를 바탕으로, profile create
	p3 = new Promise(function(resolve, reject){
		Board.remove({}, function(err){
			Board.create(seedData.boardList, function(err, boards){
				if(err) reject(err);
				boardArr = boards;
				resolve(boards);
			});
		});	
	});


	//userData모두 삭제후 seedData기반 user생성.
	p4 = new Promise(function(resolve, reject){
		User.remove({}, function(err){
			User.create(seedData.userList, function(err, users){
				if(err) reject(err);
				userArr = users;
				resolve(users);
			})			
		});
	});

	
}

module.exports =  {
	development: seedDev,
	test: seedClearTest,
};