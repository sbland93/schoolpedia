//Board Page Test
describe('"profile"page Tests', function() {
	it('page should contain a profile', function(){
		expect($('.profile').length).to.be.equal(1);
		expect($('.profile .name').html().length > 0).to.be.equal(true);
		expect($('.profile .description').html().length > 0).to.be.equal(true);
		expect($('.profile .updated_at').html().length > 0).to.be.equal(true);
	});
});