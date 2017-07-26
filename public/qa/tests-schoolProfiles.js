//profileList class안에 li들이 여러개 존재 해야한다.
describe('"schoolProfile"page Tests', function() {
	it('page should contain list of profiles', function(){
		expect($('.profileList li').length >= 1).to.be.equal(true);
	});

	it('should be sorted by updated_at property', function(){
		expect($('.profileList li > .updated_at').length >= 1).to.be.equal(true);
		var dateOfFirst = $('.profileList li > .updated_at')[0].innerHTML;
		var dateOfSecond = $('.profileList li > .updated_at')[1].innerHTML;
		expect(dateOfFirst > dateOfSecond).to.be.equal(true);
	});
});