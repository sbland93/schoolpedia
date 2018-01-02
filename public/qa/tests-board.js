//Board Page Test
describe('"board"page Tests', function() {
	it('page should contain a board', function(){
		expect($('.board').length).to.be.equal(1);
		expect($('.board .title').html().length > 0).to.be.equal(true);
		expect($('.board .content').html().length > 0).to.be.equal(true);
		expect($('.board .updated_at').html().length > 0).to.be.equal(true);
	});
});