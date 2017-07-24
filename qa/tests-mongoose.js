var expect = require('chai').expect;
var http = require('http');
var rest = require('restler');
var mongoose = require('mongoose');
var credentials = require('../credentials.js');
var seedData = require('../seedData.js');
var School = require('../models/school.js');


describe('MongooseTest', function(){

	//mongoose 연결을 확실시 하고, schoolDocs를 초기화시킨다.
	before(function(done){
		this.timeout(1000 * 15);
		//mongoose가  disconnect(0)이면 연결시키고, connected(1)상태이면 넘어간다.
		if(mongoose.connection.readyState === 0){
			mongoose.connect(credentials.mongo.test.connectionString, credentials.mongo.options);

			mongoose.connection.on("open", function(ref) {
				console.log("Connected to mongo server.");
				School.remove({}, function(err){
					expect(err).to.be.equal(null);
					School.create(seedData.testSchoolList, function(err, schools){
						done();
					});
				});
			});
		} else if (mongoose.connection.readyState === 1){
			School.remove({}, function(err){
				expect(err).to.be.equal(null);
				School.create(seedData.testSchoolList, function(err, schools){
					done();
				});
			});
		}
	});

});