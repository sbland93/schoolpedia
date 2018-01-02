var expect = require('chai').expect;
var http = require('http');
var rest = require('restler');
var mongoose = require('mongoose');
var credentials = require('../credentials.js');
var seedData = require('../seedData.js');
var School = require('../models/school.js');
var SeperateIndex = require('./seperateIndex');
var ArrayIndex = require('./arrayIndex');


function makeDefaultDocument(howMany, Model){
	var promiseArr = [];
	for(i = 0; i < howMany; i++){
		promiseArr.push(new Promise(function(resolve, reject){
			Model.create({}, function(err){
				if(err) reject(err);
				resolve();
			});	
		}));
	}
	return Promise.all(promiseArr);
} 




describe('MongooseTest', function(){

	//mongoose 연결을 확실시 하고, schoolDocs를 초기화시킨다.
	before(function(done){
		this.timeout(1000 * 30);
		//mongoose가  disconnect(0)이면 연결시키고, connected(1)상태이면 넘어간다.
		if(mongoose.connection.readyState === 0){
			mongoose.connect(credentials.mongo.development.connectionString, credentials.mongo.options);

			mongoose.connection.on("open", function(ref) {
				console.log("Connected to mongo server.");
				Promise.all([SeperateIndex.remove({}), ArrayIndex.remove({})]).then(function(){
					Promise.all([makeDefaultDocument(100, SeperateIndex), makeDefaultDocument(100, ArrayIndex)]).then(function(){
						done();
					})
				})
				
			});
		} else if (mongoose.connection.readyState === 1){
			Promise.all([makeDefaultDocument(100, SeperateIndex), makeDefaultDocument(100, ArrayIndex)]).then(function(){
				done();
			})
		}
	});


	it('should test indexing To array Schema', function(done){
		done();	
	})

});