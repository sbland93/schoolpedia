//기본적으로 school이 들어있어야한다.
describe('"home"page Tests', function() {
	it('should have a school ID', function(){
		console.log($('input[name="school"]').val());
	});
});

