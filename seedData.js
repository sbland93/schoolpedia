var bcrypt = require('bcrypt-nodejs');


module.exports = {

	infoList: [
		{
			title: "공지사항1",
			content: "컨텐츠입니다 컨텐츠입니다 컨텐츠입니다 컨텐츠입니다 컨텐츠입니다 컨텐츠입니다 컨텐츠입니다 컨텐츠입니다 컨텐츠입니다 컨텐츠입니다 컨텐츠입니다 컨텐츠입니다 컨텐츠입니다 컨텐츠입니다 컨텐츠입니다 컨텐츠입니다 컨텐츠입니다 컨텐츠입니다 컨텐츠입니다 컨텐츠입니다",
		},
		{
			title: "공지사항2",
			content:"컨텐츠입니다 컨텐츠입니다 컨텐츠입니다 컨텐츠입니다 컨텐츠입니다 컨텐츠입니다 컨텐츠입니다 컨텐츠입니다 컨텐츠입니다 컨텐츠입니다 컨텐츠입니다 컨텐츠입니다 컨텐츠입니다 컨텐츠입니다 컨텐츠입니다",
		}	
	],

	userList: [
		{
			name: "김승범",
			kakaoEmail: "rltmqj12@gmail.com",
			email: "rltmqj@gmail.com",
			password: bcrypt.hashSync("123098", bcrypt.genSaltSync(8), null),
			anonym: bcrypt.hashSync(this.kakaoEmail, bcrypt.genSaltSync(8), null).substring(20, 28),
		},
		{
			name: "한용희",
			kakaoEmail: "hyh4829@naver.com",
			email: "hyh4827@naver.com",
			password: bcrypt.hashSync("930729", bcrypt.genSaltSync(8), null),
			anonym: bcrypt.hashSync(this.kakaoEmail, bcrypt.genSaltSync(8), null).substring(20, 28),
		}
	],

	profileList : [
		{
			name: '김승범',
			birth: 930312,
			graduation: 2012,
			gender: true,
			stories: [{content: '1-7 반장, 2-12 반장, 3-14 반장' +
			'김승범임' +
			'반장 많이함' + '김승범'}],
			updated_at: Date.now() + 10000,
		},
		{
			name: '임태환',
			birth: 930312,
			graduation: 2012,
			gender: true,
			stories: [{content: '전교부회장 역임' +
			'지조로 유명했음' +
			'공부를 열심히 했음' +
			'관련일화: 반전체 눈치게임을 하는데, 끝까지 일어나지 않아서 45번으로 벌칙에 걸렸다는 일화..' + ' 김승범'}],
			updated_at: Date.now() + 20000,
		},
		{
			name: '김인경',
			birth: 930312,
			graduation: 2012,
			gender: false,
			stories: [{content: '털털하고 시원한 성격의 인구' +
			'별명이 인구였는데 왜 인구가 되었는지는 아무도 모르고 있음.' +
			'아는사람 업데이트 바람.' + ' 김승범'}],
			updated_at: Date.now() + 30000,
		},
		{
			name: '김재환',
			birth: 930312,
			graduation: 2012,
			gender: true,
			stories: [{content: '성격 좋고 노래 잘함' +
			'얼굴이 큰 편이여서 대두, 대갈장군 등의 이름을 가지고 있었음.' +
			'3학년때 장난기가 많은 편이였음.'}],
			updated_at: Date.now() + 40000,
		},
		{
			name: '강성식',
			birth: 930312,
			graduation: 2012,
			gender: true,
			stories: [{content: '성식이 1학년때 1번이여씀ㅋㅋㅋㅋ' +
			'성식이 과학수학 개잘함 천재여씀' +
			'은근히 낯가리는데 친해지면 꿀잼임'}],
			updated_at: Date.now() + 50000,
		},
		{
			name: '김용준',
			birth: 930312,
			graduation: 2012,
			gender: true,
			stories: [{content: '별명 용꼬임' +
			'노는거 좋아해씀ㅋㅋㅋㅋ' +
			'낯가리는거 없고 장난치는거 좋아함ㅋㅋ'}],
		},
		{
			name: '고근석',
			birth: 930312,
			graduation: 2012,
			gender: true,
			stories: [{content: '고근석임' +
			'귀인중나와서 백영고등학교 다녔음' +
			'뿔테안경꼈음'}],
		},
		{
			name: '유호규',
			birth: 930312,
			graduation: 2012,
			gender: true,
			stories: [{content: '키 ㄹㅇ 개큼 엄지척' +
			'노는거 좋아해씀ㅋㅋㅋㅋ' +
			'105였음'}],
		},
		{
			name: '장유진',
			birth: 930312,
			graduation: 2012,
			gender: true,
			stories: [{content: '정확히는 모르겠는데, 알고 있기론 해외다녀와서 일년 낮춰 다닌거로 알고 있음' +
			'정이 많았음' +
			'맨날 웃고다녔고 친구들 많았음 ㅋㅋㅋㅋ'}],
		},
		{
			name: '한용희',
			birth: 930312,
			graduation: 2012,
			gender: true,
			stories: [
				{content: '이야기1', up: 7, down: -1},
				{content: '이야기2', up: 6, down: -1},
				{content: '이야기3', up: 5, down: -1},
				{content: '이야기4', up: 4, down: -1},
				{content: '이야기5', up: 3, down: -1},
				{content: '이야기6', up: 2, down: -1},
				{content: '이야기6', up: 2, down: -1},
				{content: '이야기6', up: 2, down: -1},
				{content: '이야기6', up: 2, down: -1},
				{content: '이야기6', up: 2, down: -1},
				{content: '이야기6', up: 2, down: -1},
				{content: '이야기6', up: 2, down: -1},
				{content: '이야기6', up: 2, down: -1},
				{content: '이야기6', up: 2, down: -1},
				{content: '이야기6', up: 2, down: -1},
				{content: '이야기6', up: 2, down: -1},
				{content: '이야기6', up: 2, down: -1},
				{content: '이야기6', up: 2, down: -1},
				{content: '이야기7', up: 1, down: -1},
			],
			replies: [
				{content: '방명록1', up: 2, down: -2},
				{content: '방명록2', up: 3, down: -2},
				{content: '방명록3', up: 4, down: -2},
				{content: '방명록4', up: 5, down: -2},
				{content: '방명록5', up: 6, down: -2},
				{content: '방명록6', up: 7, down: -2},
				{content: '방명록7', up: 8, down: -2},
			],
			features: [
				{feature: '특징1', up: 7, down: -3},
				{feature: '특징2', up: 6, down: -4},
				{feature: '특징3', up: 5, down: -5},
				{feature: '특징4', up: 4, down: -6},
				{feature: '특징5', up: 3, down: -1},
				{feature: '특징6', up: 2, down: -2},
			]
		}
	],

	boardList : [
		{
			title: '1학년때 김준선생님 담임이였는데..',
			content: '잘계시는지 궁금하네요ㅋㅋㅋㅋ 이상한 애니메이션 보여주던 기억이 납니다.',
			updated_at: Date.now() + 10000,
			up: 10,
		},
		{
			title: '긴글 테스트',
			content: '긴글테스트 긴글테스트 긴글테스트 긴글테스트 긴글테스트 긴글테스트 긴글테스트 긴글테스트 긴글테스트 긴글테스트 긴글테스트 긴글테스트 긴글테스트 긴글테스트 긴글테스트 긴글테스트 긴글테스트 긴글테스트 긴글테스트 긴글테스트 긴글테스트 긴글테스트 긴글테스트 긴글테스트 긴글테스트 긴글테스트 긴글테스트 긴글테스트 긴글테스트 긴글테스트 긴글테스트 긴글테스트 긴글테스트 긴글테스트 긴글테스트 긴글테스트 긴글테스트 긴글테스트 긴글테스트 긴글테스트 긴글테스트 긴글테스트 긴글테스트 긴글테스트 긴글테스트 긴글테스트 긴글테스트 긴글테스트 긴글테스트 긴글테스트 긴글테스트 긴글테스트 긴글테스트 긴글테스트 긴글테스트 긴글테스트 긴글테스트 긴글테스트 긴글테스트 긴글테스트 긴글테스트 긴글테스트 긴글테스트 긴글테스트 긴글테스트 긴글테스트 긴글테스트 긴글테스트 긴글테스트 긴글테스트 긴글테스트 긴글테스트 긴글테스트 긴글테스트 긴글테스트 긴글테스트 긴글테스트 긴글테스트 긴글테스트 긴글테스트 긴글테스트 긴글테스트 긴글테스트 긴글테스트 긴글테스트 긴글테스트 긴글테스트 긴글테스트 긴글테스트 긴글테스트 긴글테스트 긴글테스트 긴글테스트 긴글테스트 긴글테스트 긴글테스트 긴글테스트 긴글테스트 긴글테스트 긴글테스트 긴글테스트 긴글테스트 긴글테스트 긴글테스트 긴글테스트 긴글테스트 긴글테스트 긴글테스트 긴글테스트 긴글테스트 긴글테스트 긴글테스트 긴글테스트 긴글테스트 긴글테스트 긴글테스트 긴글테스트 긴글테스트 긴글테스트 긴글테스트 긴글테스트 긴글테스트 긴글테스트 긴글테스트 긴글테스트 긴글테스트 긴글테스트 긴글테스트 긴글테스트 긴글테스트 긴글테스트 긴글테스트 긴글테스트 긴글테스트 긴글테스트 긴글테스트',
			updated_at: Date.now() + 10000,
			up: 10,
		},
		{
			title: '체육대회 3일이던 시절 분들 여기 계신가요? 기수로는..',
			content: '기수로는 언젠지 모르겠는데, 한창 저희 체육대회 겸 축제 재밌다고 주변 학교에 소문났던시절인데....',
			updated_at: Date.now() + 20000,
			up: 9,
		},
		{
			title: '이페이지는 누가 만든건가요',
			content: '짐작가는 사람이 있긴한데 ㅅㅂ... 누구지...ㅅㅂ?',
			updated_at: Date.now() + 30000,
			up: 5,
		},
		{
			title: '친구들아보고싶다',
			content: '12회 졸업생인데 다들 잘 지내는지 궁금하다',
			updated_at: Date.now() + 40000,
			up: 23,
		},
		{
			title: '지금와서 생각해보는거지만',
			content: '사실 고등학교때가 제일 좋았던거 같다 걱정은 많았지만, 걱정의 종류가 많지 않아서 잘 다스릴 수 있었는 듯.',
			updated_at: Date.now() + 50000,
			up: 19,
		},
		{
			title: '전 고등학교때 별로였어요',
			content: '지금은 많이 변했지만, 그때 자존감이 낮았어서 재밌는 생활을 못한게 후회되네요.',
			up: 29,
		},
		{
			title: '여기 졸업생 게시판임?',
			content: '재학생은 없나요??? 313 소리질러!',
			up: 220,
		},
		{
			title: '학교 찾아가본지 진짜 오래됐다',
			content: '벌써 한 10년은 지난듯 졸업직후에는 선생님들 뵈러 꽤 갔었는데ㅋㅋㅋ',
			up: 129,
		},
		{
			title: '생각보다 유저가 많은것 같다 조회수로 보면 1000명은 훌쩍 넘는듯?',
			content: '한번 동문회라도 추진해볼까요?',
			up: 2,
		},
		{
			title: '동문회 어떠신가요',
			content: '동문회 ㄱㄱ? 제가 총대메고 추진해보겠슴니다.',
			up: 400,
		},
		{
			title: '1학년때 김준선생님 담임이였는데..',
			content: '잘계시는지 궁금하네요ㅋㅋㅋㅋ 이상한 애니메이션 보여주던 기억이 납니다.',
			updated_at: Date.now() + 10000,
			up: 10,
		},
		{
			title: '체육대회 3일이던 시절 분들 여기 계신가요? 기수로는..',
			content: '기수로는 언젠지 모르겠는데, 한창 저희 체육대회 겸 축제 재밌다고 주변 학교에 소문났던시절인데....',
			updated_at: Date.now() + 20000,
			up: 9,
		},
		{
			title: '이페이지는 누가 만든건가요',
			content: '짐작가는 사람이 있긴한데 ㅅㅂ... 누구지...ㅅㅂ?',
			updated_at: Date.now() + 30000,
			up: 5,
		},
		{
			title: '친구들아보고싶다',
			content: '12회 졸업생인데 다들 잘 지내는지 궁금하다',
			updated_at: Date.now() + 40000,
			up: 23,
		},
		{
			title: '지금와서 생각해보는거지만',
			content: '사실 고등학교때가 제일 좋았던거 같다 걱정은 많았지만, 걱정의 종류가 많지 않아서 잘 다스릴 수 있었는 듯.',
			updated_at: Date.now() + 50000,
			up: 19,
		},
		{
			title: '전 고등학교때 별로였어요',
			content: '지금은 많이 변했지만, 그때 자존감이 낮았어서 재밌는 생활을 못한게 후회되네요.',
			up: 29,
		},
		{
			title: '여기 졸업생 게시판임?',
			content: '재학생은 없나요??? 313 소리질러!',
			up: 220,
		},
		{
			title: '학교 찾아가본지 진짜 오래됐다',
			content: '벌써 한 10년은 지난듯 졸업직후에는 선생님들 뵈러 꽤 갔었는데ㅋㅋㅋ',
			up: 129,
		},
		{
			title: '생각보다 유저가 많은것 같다 조회수로 보면 1000명은 훌쩍 넘는듯?',
			content: '한번 동문회라도 추진해볼까요?',
			up: 2,
		},
		{
			title: '동문회 어떠신가요',
			content: '동문회 ㄱㄱ? 제가 총대메고 추진해보겠슴니다.',
			up: 400,
		},
	],

	schoolList : [
		{
			name: '백영고등학교',
			location: '경기도교육청',
			category: 'highSchool',
			available: true,
			updated_at: Date.now() + 10000,
		},
		{
			name: '평촌중학교',
			location: '경기도교육청',
			description: '소개글이다',
			category: 'middleSchool',
			available: true,
			updated_at : Date.now() + 20000,
		},
		{
			name: '평촌초등학교',
			location: '경기도교육청',
			category: 'elementarySchool',
			available: true,
			updated_at: Date.now() + 30000,
		},
		{
			name: '평촌초등학교',
			location: '충남교육청',
			category: 'elementarySchool',
			available: false,
			updated_at: Date.now() + 40000,	
		},
		{
			name: '충남외국어고등학교',
			location: '충남교육청',
			category: 'highSchool',
			available: false,
			updated_at: Date.now() + 50000,	
		},
		{
			name: '삼성초등학교',
			location: '서울교육청',
			category: 'elementarySchool',
			available: false,
		},
		{
			name: '귀인중학교',
			location: '경기도교육청',
			category: 'middleSchool',
			available: false,
		},
		{
			name: '충남고등학교',
			location: '충남교육청',
			category: 'highSchool',
			available: false,
		},
		{
			name: '충북고등학교',
			location: '충북교육청',
			category: 'highSchool',
			available: false,
		},
		{
			name: '경기고등학교',
			location: '경기도교육청',
			category: 'highSchool',
			available: false,
		},
		{
			name: '제주고등학교',
			location: '제주도교육청',
			category: 'highSchool',
			available: false,
		},
		{
			name: '전남고등학교',
			location: '전남교육청',
			category: 'highSchool',
			available: false,
		},
		{
			name: '전북고등학교',
			location: '전북교육청',
			category: 'highSchool',
			available: false,
		},
		{
			name: '강원고등학교',
			location: '강원교육청',
			category: 'highSchool',
			available: false,
		},
	],

	testSchoolList : [
		{
			name: '백영고등학교',
			location: '경기도교육청',
			category: 'highSchool',
			available: true,
			updated_at: Date.now() + 10000,
		},
		{
			name: '평촌중학교',
			location: '경기도교육청',
			category: 'middleSchool',
			available: true,
			updated_at : Date.now() + 20000,
		},
		{
			name: '평촌초등학교',
			location: '경기도교육청',
			category: 'elementarySchool',
			available: true,
			updated_at: Date.now() + 30000,
		},
		{
			name: '승범초등학교',
			location: '경기도교육청',
			category: 'elementarySchool',
			available: false,
			updated_at: Date.now() + 30000,
		},
	],

	testBoardList : [
		{
			title: '1학년때 김준선생님 담임이였는데..',
			content: '잘계시는지 궁금하네요ㅋㅋㅋㅋ 이상한 애니메이션 보여주던 기억이 납니다.',
			updated: Date.now(),
		},
		{
			title: '체육대회 3일이던 시절 분들 여기 계신가요? 기수로는..',
			content: '기수로는 언젠지 모르겠는데, 한창 저희 체육대회 겸 축제 재밌다고 주변 학교에 소문났던시절인데....',
			updated: Date.now(),
		},
		{
			title: '이페이지는 누가 만든건가요',
			content: '짐작가는 사람이 있긴한데 ㅅㅂ... 누구지...ㅅㅂ?',
			updated: Date.now(),
		},
	],

	testProfileList : [
		{
			name: '임태환',
			birth: 930312,
			graduation: 2012,
			gender: true,
			stories: [ {content: '전교부회장 역임' +
			'지조로 유명했음' +
			'공부를 열심히 했음' +
			'관련일화: 반전체 눈치게임을 하는데, 끝까지 일어나지 않아서 45번으로 벌칙에 걸렸다는 일화..'}],
			replies : [{user: '21jij234', content: '역시 임지조.'}, 
			{user: '42qjk455', content: '최근에 태환이랑 연락되는 사람 있나요? 보고싶네ㅋㅋㅋ'}],
		}, 
		{
			name: '김인경',
			birth: 930312,
			graduation: 2012,
			gender: false,
			stories: [ {content: '털털하고 시원한 성격의 인구' +
			'별명이 인구였는데 왜 인구가 되었는지는 아무도 모르고 있음.' +
			'아는사람 업데이트 바람.'}],
			replies : [{user: '49kik5k9', content: '인경이 요즘 뭐하고 지내나ㅋㅋㅋ'}, 
			{user: '89828sk', content: '분명히 이거 보고 모른척 했을듯 인구'}],
		}, 
		{
			name: '김재환',
			birth: 930312,
			graduation: 2012,
			gender: true,
			stories: [ {content: '성격 좋고 노래 잘함' +
			'얼굴이 큰 편이여서 대두, 대갈장군 등의 이름을 가지고 있었음.' +
			'3학년때 장난기가 많은 편이였음.'}],
			replies : [{user: '8391eifk', content: '동생이 아마 백영고 였을걸?'}, 
			{user: '6726001', content: '장수현쌤일때 같은반이였는데 성격 ㄱㅊ'}],
		},
	],

}