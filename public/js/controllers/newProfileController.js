	
$(document).ready(function(){
	//취소버튼을 누르면 뒤로 가는 controller
	$('.goBack').on('click', function(evt){
		evt.preventDefault();
		location.href = document.referrer;
	});

	//Form Submit Event Controller
	$('.newProfileForm').on('submit', function(evt){
		evt.preventDefault();
		$('.schoolInput').attr('disabled', true);
		addProfile($(this).serialize()).then(function(data){
			if(data.success){
				if({{newSchool}}){
					updateSchool('{{schoolInfo.id}}', {available: true})
					.then(function(data){
						if(data.success){
							alert('{{schoolInfo.name}}교문이 열렸어요. 더많은 친구들의 정보를 업데이트하고 함께 즐겨요.');
							location.href = '/school/{{schoolInfo.id}}';	
						} else {
							alert('Error Occured');
						}
					});	
				}
				location.href = '/profile/' + data.id;	
			}
		}).catch(function(){
			alert('Error Occured');
		});
	});

	//사용자 경험을 위해 글쓰기를 누른 페이지로부터의 school정보를 폼에 자동입력한다.
	var defaultCategory = '{{schoolInfo.category}}';
	var defaultName = '{{schoolInfo.name}}'
	var defaultId = '{{schoolInfo.id}}'
	var defaultInputSelector = '#' + defaultCategory + 'Field';
	var defaultButtonSelector = 'button[category="' + defaultCategory + '"]';
	//해당학교 Input Disabled
	$(defaultInputSelector).attr('value', defaultName).attr('disabled', true);
	//학교확인버튼 삭제
	$(defaultButtonSelector).remove();
	//hidden Input(For schoolId) 생성.
	$('<input type="hidden">').attr('name', defaultCategory).attr('value', defaultId).appendTo('#newProfileForm');

	//SearchSchoolResult Template Compile
	var NPsearchedSchools = TPL['NPsearchedSchools'];

	//Check School Event Controller
	$('.checkSchool').on('click', function(evt){
		evt.preventDefault();

		var _this = $(this);
		_this.next().text('');
		
		var category = _this.attr('category');
		//display Input Field의 select연산자.
		var selector = '#' + category + 'Field';
		//공백제거한 selector Input Field의 value.(schoolName)
		var schoolName = $(selector).val().split(' ').join('');
		if(schoolName === '') return _this.next().html('<b>학교이름을 입력해주세용</b>');
		
		//DOLATER no school.
		getSchools({name: schoolName}).then(function(data){
			var response = { schools : data };
			_this.next().html(NPsearchedSchools(response));
			//After Search School Controller
			$('.NPsearchResult').on('click', function(evt){
				evt.preventDefault();
				$(selector).val($(this).html());
				_this.next().text('확인되었어용');
				_this.next().html('	<input type="hidden" value="'+$(this).attr('id')+'" name="'+ category +'">');
			});
		});
	});
});
