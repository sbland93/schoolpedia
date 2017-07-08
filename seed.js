var School = require('./models/school.js');
var Profile = require('./models/profile.js');
var Board = require('./models/board.js');
var koreaSchoolData = require('../koreaSchoolData.js')
var seedData = require('./seedData.js');




//DOLATER process.env에 따른 데이터 변경. 




module.exports = function(){

	var p1,p2,p3;
	p1 = new Promise(function(resolve, reject){
		School.remove({}, function(err){
			School.create(seedData.schoolList, function(err, schools){
				if(err) reject(err);
				resolve();
			});
		});	
	});

	p2 = new Promise(function(resolve, reject){
		p1.then(function(){
			//profile들을 모두 삭제한 후,
			//profile에 있는 school을 바탕으로 id를 찾아넣는다.
			Profile.remove({}, function(err){
				if(err) reject(err);
				var promiseArr = [];
				seedData.profileList.forEach(function(el){
					var query = {};
					if(el.school) query.name = el.school;
					console.log(query);
					promiseArr.push(new Promise(function(res , rej){
						School.find(query, function(err, schools){
							if(err) reject(err);
							el.school = [schools[0]._id];
							console.log(el.school);
							Profile.create(el, function(err, profile){
								if(err) rej(err);
								res();
							});				
						});	
					}));
				});
				Promise.all(promiseArr).then(function(){resolve();})
					.catch(function(){reject();})
			});
		});
	});
	
	p3 = new Promise(function(resolve, reject){
		Board.remove({}, function(err){
			Board.create(seedData.boardList, function(err, boards){
				if(err) reject(err);
				resolve();
			});
		});	
	});

	Promise.all([p2, p3]).then(function(){
		console.log("Data initiating All, Clear.");
	}).catch(function(err){
		console.log("Data initiating All, Fail", err);
		throw new Error("Data initiating All, Fail");
	});

}


