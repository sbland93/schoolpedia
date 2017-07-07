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