var School = require('./models/school.js');
var Profile = require('./models/profile.js');
var Board = require('./models/board.js');
var koreaSchoolData = require('../koreaSchoolData.js')

var testSchoolData = [
	{
		name: '백영고등학교',
		location: '경기도교육청',
	},
	{
		name: '평촌중학교',
		location: '경기도교육청',
	},
	{
		name: '평촌초등학교',
		location: '경기도교육청',
	},
	{
		name: '평촌초등학교',
		location: '충남교육청',
	},
	{
		name: '삼성초등학교',
		location: '서울교육청',
	},
	{
		name: '귀인중학교',
		location: '경기도교육청',
	},
];

module.exports = function(){

	School.find(function(err, schools){
		if(err) return console.error(err);
		if(schools.length) return;

		switch(process.env.NODE_ENV){
			case 'development':
			case 'production' :
				//전국 학교 데이터 입력.
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
				break;
			case 'test':
				//test용 학교 데이터 입력.
				School.create(testSchoolData, function(err, schools){
					if(err) throw(err);
					console.log('Test School Data initiating has been finished...');
				});
				break;
			default :
				console.log('Please specify the NODE_ENV(development, test, production)');
				throw new Error('Please specify the NODE_ENV(development, test, production)');
				break;
		}
		

	});

	Profile.find(function(err, profiles){
		if(err) return console.error(err);
		if(profiles.length) return;

		profiles.forEach(function(el){
			new Profile(el).save();
		});		
	});

	Board.find(function(err, boards){
		if(err) return console.error(err);
		if(boards.length) return;

		boards.forEach(function(el){
			new Board(el).save();
		});		
	});
	
}


var profiles = [
			{
				school: ['백영고등학교', '평촌중학교', '평촌초등학교'],
				name: '김승범',
				age: '1993',
				gender: 'male',
				description: '1-7 반장, 2-12 반장, 3-14 반장' +
				'조금 극단적인 성격' +
				'공부를 열심히 했음'
			},
			{
				school: ['백영고등학교'],
				name: '임태환',
				age: '1993',
				gender: 'male',
				description: '전교부회장 역임' +
				'지조로 유명했음' +
				'공부를 열심히 했음' +
				'관련일화: 반전체 눈치게임을 하는데, 끝까지 일어나지 않아서 45번으로 벌칙에 걸렸다는 일화..'
			},
			{
				school: ['백영고등학교'],
				name: '김인경',
				age: '1993',
				gender: 'female',
				description: '털털하고 시원한 성격의 인구' +
				'별명이 인구였는데 왜 인구가 되었는지는 아무도 모르고 있음.' +
				'아는사람 업데이트 바람.'
			},
			{
				school: ['백영고등학교'],
				name: '김재환',
				age: '1991',
				gender: 'male',
				description: '성격 좋고 노래 잘함' +
				'얼굴이 큰 편이여서 대두, 대갈장군 등의 이름을 가지고 있었음.' +
				'3학년때 장난기가 많은 편이였음.'
			},
		];

var boards = [
			
			{
				school: '백영고등학교',
				title: '1학년때 김준선생님 담임이였는데..',
				content: '잘계시는지 궁금하네요ㅋㅋㅋㅋ 이상한 애니메이션 보여주던 기억이 납니다.',
				updated: Date.now(),
			},
			{

				school: '백영고등학교',
				title: '체육대회 3일이던 시절 분들 여기 계신가요? 기수로는..',
				content: '기수로는 언젠지 모르겠는데, 한창 저희 체육대회 겸 축제 재밌다고 주변 학교에 소문났던시절인데....',
				updated: Date.now(),
			},
			{
				school: '백영고등학교',
				title: '이페이지는 누가 만든건가요',
				content: '짐작가는 사람이 있긴한데 ㅅㅂ... 누구지...ㅅㅂ?',
				updated: Date.now(),
			}

		];