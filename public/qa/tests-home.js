//schoolList class안에 li들이 여러개 존재 해야한다.
describe('"home"page Tests', function() {
	it('page should contain list of schools', function(){
		expect($('.schoolList li').length >= 1).to.be.equal(true);
		console.log(Date.parse($('.schoolList li > .updated_at')[0].innerHTML));
	});

	it('page should contain list of schools', function(){
		expect($('.boardList li').length >= 1).to.be.equal(true);
		console.log(Date.parse($('.boardList li > .updated_at')[0].innerHTML));
	});

	it('page should contain list of schools', function(){
		expect($('.boardList li').length >= 1).to.be.equal(true);
		console.log(Date.parse($('.boardList li > .updated_at')[0].innerHTML));
	});

	it('should be sorted by updated_at property', function(){
		expect($('.schoolList li > .updated_at').length >= 1).to.be.equal(true);
		var dateOfFirst = $('.schoolList li > .updated_at')[0].innerHTML;
		var dateOfSecond = $('.schoolList li > .updated_at')[1].innerHTML;
		expect(dateOfFirst > dateOfSecond).to.be.equal(true);
	});
});

