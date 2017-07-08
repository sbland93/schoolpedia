//Board Page Test
//게시판이 나와야한다.
describe('"board"page Tests', function() {
	it('page should contain list of Boards', function(){
		expect($('.boardList li').length >= 1).to.be.equal(true);
	});


	it('should be sorted by updated_at property', function(){
		expect($('.boardList li > .updated_at').length >= 1).to.be.equal(true);
		var dateOfFirst = $('.boardList li > .updated_at')[0].innerHTML;
		var dateOfSecond = $('.boardList li > .updated_at')[1].innerHTML;
		console.log(dateOfFirst);
		console.log(dateOfSecond);
		expect(dateOfFirst > dateOfSecond).to.be.equal(true);
	});
});