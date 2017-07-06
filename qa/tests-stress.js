var loadtest = require('loadtest');
var expect = require('chai').expect;


describe('Stress Tests', function() {
	it('Homepage should handle 50 requests in a second', function(done){
		this.timeout(1000 * 10);
		var options = {
			url: 'http://localhost:3000',
			concurrency: 4,
			maxRequests: 50,
		};
		loadtest.loadTest(options, function(err, result){
			expect(!err).to.be.equal(true);
			expect(result.totalTimeSeconds < 1);
			done();
		});
	});
});