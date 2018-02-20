var School = require('./models/school.js');
var Profile = require('./models/profile.js');
var Info = require('./models/info.js');
var Board = require('./models/board.js');
var User = require('./models/user.js');
var schoolData = require('./koreaSchoolData.json');
var seedData = require('./seedData.js');
var credentials = require('./credentials.js');
var getRandomInt = require('./utils/testUtils.js')().getRandomInt;
var fs = require('fs');


//Seed All Data From seedData.
var seedDev = function(){

	var p1,p2,p3,p4,p5;


	//p1. School remove -> School create by SeedData
	p1 = new Promise(function(resolve, reject){
		School.remove({}, function(err){
			School.create(schoolData, function(err, schools){
				if(err) reject(err);
				resolve(schools);
			});
		});	
	});

	//userData모두 삭제후 seedData기반 user생성.
	p2 = new Promise(function(resolve, reject){
		User.remove({}, function(err){
			User.create(seedData.userList, function(err, users){
				if(err) reject(err);
				resolve(users);
			})			
		});
	});

	Promise.all([p1, p2]).then(function(responseArr){

		schools = responseArr[0];
		users = responseArr[1];

		var defaultClass = {elementary: [100, 200, 300, 400, 500, 600], middle: [100, 200, 300], high: [100, 200, 300]};

		var seedUser = function(obj, userId){
			obj["user"] = userId;
		};

		//profileList에 세개의 학교(백영고, 평촌중, 평촌초)를 넣어줌!
		//방명록 특징, 썰에 유저를 넣어줌!
		seedData.profileList.forEach(function(el){
			el.schools = [];
			for(var a=0; a<3; a++) el.schools.push({school : schools[a]._id, class: defaultClass[schools[a].category]});
			
			if(el.features) for(var b=0; b<el.features.length; b++) seedUser(el.features[b], users[0]);
			
			if(el.stories) for(var c=0; c<el.stories.length; c++) seedUser(el.stories[c], users[0]);
			
			if(el.replies) for(var d=0; d<el.replies.length; d++) seedUser(el.replies[d], users[0]);
		});

		//boardList에 school을 채워줌 셋중 하나로!
		seedData.boardList.forEach(function(el){
			var randomInt = getRandomInt(3);
			el.school = schools[randomInt]._id;
		});

		//p2 -> Profile remove - 위에서 채워진 profileList를 바탕으로, profile create
		p3 = new Promise(function(resolve, reject){
			Profile.remove({}, function(err){
				Profile.create(seedData.profileList, function(err, profiles){
					if(err) reject(err);
					resolve();
				});
			});
		});

		//p3 -> Profile remove - 위에서 채워진 profileList를 바탕으로, profile create
		p4 = new Promise(function(resolve, reject){
			Board.remove({}, function(err){
				Board.create(seedData.boardList, function(err, boards){
					if(err) reject(err);
					resolve();
				});
			});	
		});


		//infoData모두 삭제후 seedData기반 info생성.
		/*p5 = new Promise(function(resolve, reject){
			Info.remove({}, function(err){
				Info.create(seedData.infoList, function(err, infos){
					if(err) reject(err);
					resolve();
				})			
			});
		}); */

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
var seedTest = function(){
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


var seedProduction = function(){
	//production에서 처음만 학교데이터 생성.
	School.find({}, function(err, schools){
		if(err) throw new Error("Data Fail");
		if(schools.length > 0) return;
		School.create(schoolData, function(err, schools){
			if(err) throw new Error("Data Fail");
		});
	});

	User.find({}, function(err, users){
		if(err) throw new Error("Data initializing fail");
		if(users.length > 0) return;
		User.create(credentials.adminUserInfo, function(err){
			if(err) throw new Error("Data Fail");
		});
	});
}

//DOLATER process.env에 따른 데이터 변경. 

module.exports =  {
	development: seedDev,
	test: seedTest,
	production: seedProduction,
};