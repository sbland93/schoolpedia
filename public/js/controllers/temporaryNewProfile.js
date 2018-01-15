

$(document).ready(function(){

	//SearchSchoolResult Template Compile
	var NPsearchedSchools = TPL.NPsearchedSchools;
	var NPdynamicInput = TPL.NPdynamicInput;

	$('#addSchoolInput').on('click', function(evt){
		evt.preventDefault();

		$(this).prepend(NPdynamicInput({
			
		}));
		
	})


	//해당버튼을 disabled로 만들고, dynamicInput을 추가한다(hiddenSchoolId, CLassValue)
	var makeDynamicInput = function(buttonJQ, schoolId){
		buttonJQ.attr("disabled", "disabled");
		buttonJQ.parent().after(NPdynamicInput({
			schoolId: schoolId,
			isElementary: (buttonJQ.attr('classNum') === "6");
			category: buttonJQ.attr('category');
		}));
	};

	//각페이지 DefaultValue.
	var NPdefaultValue = $('#NPdefaultValue');

	//disabled가 있는(default school의) button을 찾아내서, 뒤에 다이나믹인풋을 붙인다.
	var defaultButton = $('#'+NPdefaultValue.attr('category')+'btn');
	makeDynamicInput(defaultButton, NPdefaultValue.attr('schoolId'));


	//취소버튼을 누르면 뒤로 가는 controller
	//DOLATER 단순히 뒤로가면 안될거 같은데..
	$('.goBack').on('click', function(evt){
		evt.preventDefault();
		location.href = document.referrer;
	});

	//Form Submit Event Controller
	$('.newProfileForm').on('submit', function(evt){
		evt.preventDefault();
		var profileData = { 
			stories: [],
			schools: [],
		};

		var schoolObjs = {};

		$(this).serializeArray().map(function(a){
			if((a.name === 'elementarySchool') || (a.name === 'middleSchool') || (a.name === 'highSchool')) return schoolObjs[a.name].school = a.value
			if((a.name === 'elementarySchoolClass') || (a.name === 'middleSchoolClass') || (a.name === 'highSchoolClass'))return  schoolObjs[a.name]
			if(a.name === 'stories') return profileData.stories.push({content: a.value});
			profileData[a.name] = a.value;
		});

		console.log(profileData);

		addProfile(profileData).then(function(data){
			if(data.success){
				location.href = '/profile/' + data.id;	
			} else{
				console.log('Some Error');
			}
		}).catch(function(err){
			alert(err);
			console.error(err);
			alert('Error Occured');
		});
	});

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
		if(schoolName === '') return _this.parent().after('<b>학교이름을 입력해주세용</b>');
		
		//DOLATER no school.
		getSchools({name: schoolName}).then(function(data){
			var response = { schools : data };
			//검색된 학교들을 버튼 옆에 붙인다.
			_this.next().html(NPsearchedSchools(response));
			//After Search School Controller
			$('.NPsearchResult').on('click', function(evt){
				evt.preventDefault();
				_this.next().html("");
				//Input에 해당학교의 이름을 넣고
				$(selector).val($(this).html());
				//Hidden SchoolId input과, 학교의 학급 Input을 만들어 넣는다.
				makeDynamicInput(_this, $(this).attr('schoolId'));
			});
		});
	});
});
