var School = require('./models/school.js');
var Profile = require('./models/profile.js');
var Board = require('./models/board.js');
var User = require('./models/user.js');
var koreaSchoolData = require('../koreaSchoolData.js')
var seedData = require('./seedData.js');
var getRandomInt = require('./utils/testUtils.js')().getRandomInt;

//Seed All Data From seedData.
var seedDev = function(){

	var p1,p2,p3,p4;

	//p1. School remove -> School create by SeedData
	p1 = new Promise(function(resolve, reject){
		School.remove({}, function(err){
			School.create(seedData.schoolList, function(err, schools){
				if(err) reject(err);
				resolve(schools);
			});
		});	
	});

	p1.then(function(schools){



		//available한 school만 리스트를 새로 뽑음.
		var availableSchools = schools.filter(function(el){
			return el.available === true;
		});
		//profileList에 랜덤하게 학교를 배정시켜줌. 초, 중, 고에 따라서!
		seedData.profileList.forEach(function(el){
			var randomInt = getRandomInt(availableSchools.length);
			//하나만저장함, DOLATER, Class도 없음.
			el.schools = [];
	
			el.schools.push({school : availableSchools[randomInt]._id, class: [101, 202, 303]});
		});
		//boardList에 school을 채워줌.
		seedData.boardList.forEach(function(el){
			var randomInt = getRandomInt(availableSchools.length);
			el.school = availableSchools[randomInt]._id;
		});

		//p2 -> Profile remove - 위에서 채워진 profileList를 바탕으로, profile create
		p2 = new Promise(function(resolve, reject){
			Profile.remove({}, function(err){
				Profile.create(seedData.profileList, function(err, profiles){
					if(err) reject(err);
					resolve();
				});
			});
		});

		//p3 -> Profile remove - 위에서 채워진 profileList를 바탕으로, profile create
		p3 = new Promise(function(resolve, reject){
			Board.remove({}, function(err){
				Board.create(seedData.boardList, function(err, boards){
					if(err) reject(err);
					resolve();
				});
			});	
		});

		//userData모두 삭제.
		p4 = new Promise(function(resolve, reject){
			User.remove({}, function(err){
				User.create(seedData.userList, function(err, users){
					if(err) reject(err);
					resolve();
				})			
			});
		});

		return Promise.all([p2,p3,p4])
	})
	.then(function(){
		console.log("Data initiating All, Success");
	})
	.catch(function(err){
		console.log("Data initiating All, Fail", err);
		throw new Error("Data initiating All, Fail");
	});
}

//Clear All Models.
var seedClearTest = function(){
	var p1 = new Promise(function(resolve, reject){
		School.remove({}, function(err){
			if(err) reject(err);
			resolve();
		});	
	});

	var p2 = new Promise(function(resolve, reject){
		Profile.remove({}, function(err){
			if(err) reject(err);
			resolve();
		})
	})

	var p3 = new Promise(function(resolve, reject){
		Board.remove({}, function(err){
			if(err) reject(err);
			resolve();
		})
	})

	Promise.all([p1,p2,p3]).then(function(){
		console.log("Data Clear All, Success");
	})
	.catch(function(err){
		console.log("Data Clear All, Fail", err);
		throw new Error("Data Clear All, Fail");
	});
}

//DOLATER process.env에 따른 데이터 변경. 

module.exports =  {
	development: seedDev,
	test: seedClearTest,
};