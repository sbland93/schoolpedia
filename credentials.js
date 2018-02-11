module.exports = {

	cookieSecret : 'coastcocookie is the best ever',


	mongo: {
		development: {
			connectionString : 'mongodb://sbland93:remind2015-@ds261247.mlab.com:61247/websbland2'
		},
		production: {
			connectionString : 'mongodb://sbland93:remind2015-@ds261247.mlab.com:61247/websbland2'
		},
		test: {
			connectionString: 'mongodb://sbland93test:remind2015-@ds145302.mlab.com:45302/schoolchoongtest'
		},
		options : { server: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } }, 

                replset: { socketOptions: { keepAlive: 300000, connectTimeoutMS : 30000 } } },
	}

};