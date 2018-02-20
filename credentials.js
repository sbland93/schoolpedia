var bcrypt = require('bcrypt-nodejs');

module.exports = {

	cookieSecret : 'schoolpion king',


	mongo: {
		//기본 mlab주소.
		development: {
			connectionString : 'mongodb://SBLAND:tmznfvldhszld@ds261247.mlab.com:61247/websbland2'
		},
		//deploy된 상태에서의 mongodb mlab 주소.
		production: {
			connectionString : 'mongodb://SBLAND:tmznfvldhszld@ds243718-a0.mlab.com:43718,ds243718-a1.mlab.com:43718/schoolpion?replicaSet=rs-ds243718'
		},
		test: {
			connectionString: 'mongodb://SBLAND:tmznfvldhszld@ds145302.mlab.com:45302/websbland2'
		},
		options : { server: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } }, 

        replset: { socketOptions: { keepAlive: 300000, connectTimeoutMS : 30000 } } },
	},

	adminUserInfo : 
	{
		name: "관리자",
		kakaoEmail: "tmznfvldhszld@tmznfvldhszld.tmznfvldhszld",
		email: "admin@admin.admin",
		password: bcrypt.hashSync("930312", bcrypt.genSaltSync(8), null),
		anonym: "관리자",
		graduation: 2012,
	},

	userList : [
		{
			name: "김승범",
			kakaoEmail: "tmznfvldhszld@tmznfvldhszld.tmznfvldhszld",
			email: "rltmqj@gmail.com",
			password: bcrypt.hashSync("930312", bcrypt.genSaltSync(8), null),
			anonym: bcrypt.hashSync(this.kakaoEmail, bcrypt.genSaltSync(8), null).substring(20, 28),
			graduation:"1972",
		},
		{
			name: "한용희",
			kakaoEmail: "tmznfvldhszld@tmznfvldhszld.tmznfvldhszld",
			email: "hyh4829@naver.com",
			password: bcrypt.hashSync("930312", bcrypt.genSaltSync(8), null),
			anonym: bcrypt.hashSync(this.kakaoEmail, bcrypt.genSaltSync(8), null).substring(20, 28),
			graduation:"2012",
		}
	],


};