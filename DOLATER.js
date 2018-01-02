//학교의 이름을 받아서, 해당학교를 찾고, 이미 열려있다면 해당페이지로 리다이렉트
	//닫혀있었다면, 열어준다음 해당 학교로 리다이렉트. AJAX와 http전송을 구별.
	app.post('/api/school', function(req, res){
		if(!req.body.name) return next('학교명을 입력하세요');
		School.findOne({name: req.body.name}, function(err, school){
			/*DOLATER err 처리 */
			if(school.available){
				req.session.flash = {
					type: 'danger',
					intro: 'Already',
					message: 'The School you wanted to open has been already opened'
				}
				return res.redirect(303, '/school/'+ school.name);
			}else if(!school.available){
				school.available = true;
				school.save(function(err, el){
					if(err) return next(err);
					req.session.flash = {
					type: 'success',
					intro: 'Thank you!',
					message: 'You opened this school first! Please feel free to make document'
					}
					return res.redirect(303, '/school/' + school.name);
				})
			}
		})
	});




	//profile 페이지 라우팅
	app.get('/profile', function(req, res){
		Profile.find({}).sort({updated_at : '-1'})
			.limit(5).populate('highSchool middleSchool elementarySchol')
			.exec(function(err, profiles){
			if(err) next(err);
			res.render('profile', {
				profileList : profiles.map(function(a){
					return {
						id: a._id,
						highSchool: a.highSchool,
						middleSchool: a.middleSchool,
						elementarySchool: a.elementarySchool,
						class: a.class,
						name: a.name,
						age: a.age,
						gender: a.gender,
						description: a.description,
						replies : a.replies,
						updated_at: a.updated_at,
					};
				}),
				pageTestScript: '/qa/tests-profile.js'
			});
		})
	});

	//board 페이지 라우팅
	app.get('/board', function(req, res){
		Board.find({}).sort({updated_at : '-1'})
		.exec(function(err, boards){
			if(err) next(err);
			res.render('board', {
				boardList : boards.map(function(a){
					return {
						id: a._id,
						title: a.title,
						school: a.school,
						content: a.content,
						replies : a.replies,
						updated_at: a.updated_at,
					};
				}),
				pageTestScript: '/qa/tests-board.js'
			});
		});
	});


//업데이트 Mechanism

/*

	버전을 최근 다섯개 까지 가지고 있는다.
	하지만 한 세션? ip?당 한 문서는 세번이상 고칠 수 없도록 한다.
	버전되돌리기를 가능케한다.
	cookie나 세션을 활용해서, 총 10번의 update counting을 주고, 그 이상은 불가하도록 한다.
	인증 유저는 몇번이고 다시 할 수 있도록 하고.

*/



//School모델을 통해서, available을 바꿔둔 모든 school을
	//다시 default값인 false로 만든다.
	after(function(done){
		School.find({available: true}, function(err, schools){
			console.log('schools', schools);
			var promiseArr = [];
			schools.forEach(function(el){
				console.log('11111111111111');
				promiseArr.push(	
					new Promise(function(resolve, reject){
						el.available = false;
						el.save(function(err){
							expect(err).to.be.equal(null);
							resolve();
						})
					})
				);
			});
			Promise.all(promiseArr).then(function(){
				console.log('Yes!');
				done();
			})
		})
	});



switch(process.env.NODE_ENV){
case 'production' :
	//전국 학교 데이터 입력.
	School.find({}, function(err, schools){
		if(schools.length) return;
		var promiseArr = [];
		koreaSchoolData.forEach(function(el){
			promiseArr.push(new Promise(function(resolve, reject){
				new School({
				name: el['학교명'],
				location: el['시도교육청명'],
				category: el['학교급구분'],
				}).save(function(err){
					if(err) return reject(err);
					resolve();
				});
			}));
			Promise.All(promiseArr).then(function(){
				console.log('Dev School Data initiating has been finished...');
			});
		});
	});
	break;
case 'development':
case 'test':
	//test용 학교 데이터 입력.
	School.remove({}, function(err){
		School.create(seedData.schoolLists, function(err, schools){
			if(err) throw(err);
			console.log('Test School Data initiating has been finished...');
		});
	})
	break;
default :
	console.log('Please specify the NODE_ENV(development, test, production)');
	throw new Error('Please specify the NODE_ENV(development, test, production)');
	break;
}




var School = require('./models/school.js');
var Profile = require('./models/profile.js');
var Board = require('./models/board.js');
var koreaSchoolData = require('../koreaSchoolData.js')
var seedData = require('./seedData.js');
var getRandomInt = require('./utils/testUtils.js').getRandomInt;



//DOLATER process.env에 따른 데이터 변경. 




module.exports = function(){

	var p1,p2,p3;
	p1 = new Promise(function(resolve, reject){
		School.remove({}, function(err){
			School.create(seedData.schoolList, function(err, schools){
				if(err) reject(err);
				resolve(schools);
			});
		});	
	});

	p2 = new Promise(function(resolve, reject){
		Profile.remove({}, function(err){
			Profile.create(seedData.profileList, function(err, profiles){
				if(err) reject(err);
				resolve(profiles);
			});
		});
	});
	
	p3 = new Promise(function(resolve, reject){
		Board.remove({}, function(err){
			Board.create(seedData.boardList, function(err, boards){
				if(err) reject(err);
				resolve(boards);
			});
		});	
	});


	Promise.all([p1, p2, p3]).then(function(rtnArr){
		var schoolDocs = rtnArr[0];		
		var profileDocs = rtnArr[1];		
		var boardDocs = rtnArr[2];
		var availableSchools = schoolDocs.filter(function(el){
			return el.available === true;
		});
		profileDocs.forEach(function(el){
			var randomInt = getRandomInt(availableSchools.length);
			if(availableSchools[randomInt].profileList === undefined) availableSchools[randomInt].profileList = [];
			availableSchools[randomInt].profileList.push(el._id);
		});
		boardDocs.forEach(function(el){
			var randomInt = getRandomInt(availableSchools.length);
			if(availableSchools[randomInt].boardList === undefined) availableSchools[randomInt].boardList = [];
			availableSchools[randomInt].boardList.push(el._id);
		});
		availableSchools.forEach(function(el){
			var haveProfileList = (el.profileList === undefined);
			var haveBoardList = (el.boardList === undefined);
			if(haveProfileList){
				el.profileList.forEach(function(a){
					profileDocs.forEach(function(b){
						if(a === b._id) b.schoolList = []
					})
				})
			}

		});
	}).catch(function(err){
		console.log("Data initiating All, Fail", err);
		throw new Error("Data initiating All, Fail");
	})


}


/*

profile에 school Array 가 있으면, index처리가 힘들것 같다.

1. school에 profileLIst를 넣는다.

	=> 이럴경우, school자체가 굉장히 무거워지고,
	profile query limit 10 같은것을 school 기반으로 날리기가 어려워진다.

2. profile에 school을 하나만 배정한다.

	=> 최상의 시나리오, 제일 간단한 형태다.
	profile에 school을 배정하고, index처리를 하면 굉장히 깔끔.
	하지만, profile을 통한 확산이 힘들어진다.

3. profile에 school Array를 배정한다.

	=> 제일 원하는 시나리오 형태이다.
	하지만 인덱싱 처리가 힘들다.


4. 2번과 3번의 중간은 없을까?

 	=> profile에 highSchool, middleSchool, lowschool? 나눈다.
	=> 검색쿼리를 살핀후, middle경우에, middle로 검색하고,
	=> highschool이면 highschool field에 검색하고,

	profile, board 에 schoolID를 배정하고, 그걸 index처리.


*/

var testprofileData = [];


describe('Mongoose Index Test', function() {

	//Insert Database from SeedData
	before(function(done){
		this.timeout(1000 * 20);
		mongoose.connect(credentials.mongo.test.connectionString, credentials.mongo.options);

		mongoose.connection.on("open", function(ref) {
			console.log("Connected to mongo server.");
			done();
		});	
	});
	
	it('Test for No index', function(done) {
		this.timeout(1000 * 30);
		var p1 = new Promise(function(resolve, reject){
			Test.No.remove({}, function(err){
				console.log('here');
				Test.No.create(Test.testSeed, function(err, nos){
					if(err) reject(err);
					console.log(nos);
					resolve();
				});
			});	
		});
		var p2 = new Promise(function(resolve, reject){
			Test.Single.remove({}, function(err){
				Test.Single.create(Test.testSeed, function(err, profiles){
					if(err) reject(err);
					resolve();
				});
			});	
		});
		var p3 = new Promise(function(resolve, reject){
			Test.Double.remove({}, function(err){
				Test.Double.create(Test.testSeed, function(err, profiles){
					if(err) reject(err);
					resolve();
				});
			});	
		});
		Promise.all([p1, p2, p3]).then(function(){
			done();
		});
	});

});














app.get('/school/:id', function(req, res, next){
		var schoolDocument;
		var profilePromise = new Promise(function(resolve, reject){
			School.findById(req.params.id, function(err, school){
				if(err) next(err);
				//DOLATER if !school
				schoolDocument = school;
				if(!school) return next('No Data');
				var query;
				switch(school.category){
					case '고등학교' :
						query = {highSchool: school._id};
						break;
					case '중학교' :
						query = {middleSchool: school._id};
						break;
					case '초등학교' :
						query = {elementarySchool: school._id};
						break;
				};
				Profile.find(query).sort({updated_at : '-1'})
				.limit(5).populate('highSchool middleSchool elementarySchool')
				.exec(function(err, profiles){
					if(err) reject(err);
					resolve(profiles);
				});
			});
		});
		var boardPromise = new Promise(function(resolve, reject){
			Board.find({school : req.params.id}).sort({updated_at : '-1'})
			.limit(5).populate('school').exec(function(err, boards){
				if(err) reject(err);
				resolve(boards);
			});
		});
		Promise.all([profilePromise, boardPromise]).then(function(rtnArr){
			res.render('school', {
				schoolInfo: schoolViewModel(schoolDocument),
				profileList : rtnArr[0],
				boardList : rtnArr[1],
			});
		}).catch(function(err){ next(err); });
	});



<div class="middleSchoolDiv">
		<div class="form-group">
			<label for="middleSchoolField" class="col-sm-2 control-label">중학교</label>
			<div class="col-sm-2">
				<input type="text" class="form-control schoolInput" id="middleSchoolField" placeholder="입력후 학교확인" value="{{profile.middleSchool.name}}" {{#if profile.middleSchool.name}} disabled {{/if}}>
			</div>
			<button class="btn btn-danger col-sm-1 checkSchool" category="middleSchool" {{#if profile.middleSchool.name}} disabled {{/if}}>학교 확인</button>
			<span class="dynamicInput"></span>
		</div>

		<div class="middleClass">
			{{#iterateForClass 3}}
			<div class="form-group">
				<label for="fieldMiddle{{index}}" class="col-sm-2 control-label">{{index}}학년 학급</label>
				<div class="col-sm-4">
					<select class="form-control" name="middleClass" id="fieldMiddle{{index}}">
						<option value="{{gradeNumber}}">기억이 잘안나요</option>
						{{#iterateWithPlus 20 gradeNumber}}
							<option value="{{this}}">{{this}}</option>
						{{/iterateWithPlus}}
					</select>
				</div>
			</div>
			{{/iterateForClass}}
		</div>
	</div>
	
	<div class="elementarySchoolDiv">
		<div class="form-group">
			<label for="elementarySchoolField" class="col-sm-2 control-label">초등학교</label>
			<div class="col-sm-2">
				<input type="text" class="form-control schoolInput" id="elementarySchoolField" placeholder="입력후 학교확인" value="{{profile.elementarySchool.name}}" {{#if profile.elementarySchool.name}} disabled {{/if}}>
			</div>
			<button class="btn btn-danger col-sm-1 checkSchool" category="elementarySchool" {{#if profile.elementarySchool.name}} disabled {{/if}}>학교 확인</button>
			<span class="dynamicInput"></span>
		</div>
		<div class="elementaryClass">
			{{#iterateForClass 6}}
			<div class="form-group">
				<label for="fieldElementary{{index}}" class="col-sm-2 control-label">{{index}}학년 학급</label>
				<div class="col-sm-4">
					<select class="form-control" name="elementaryClass" id="fieldElementary{{index}}">
						<option value="{{gradeNumber}}">기억이 잘안나요</option>
						{{#iterateWithPlus 20 gradeNumber}}
							<option value="{{this}}">{{this}}</option>
						{{/iterateWithPlus}}
					</select>
				</div>
			</div>
			{{/iterateForClass}}
		</div>
	</div>