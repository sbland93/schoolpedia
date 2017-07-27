	
$(document).ready(function(){

	//makeArrayFrom classValue
	//var classArr = JSON.parse("[" + $('.checkSchool:disabled').attr('classValue') + "]");

	var UPdynamicInput = TPL.UPdynamicInput;

	var makeDynamicInput = function(buttonJQs, schoolId){
		$.each(buttonJQs, function(index, value){
			var eachButtonJQ = $(value);
			var eachSchoolId = schoolId || eachButtonJQ.attr('schoolId');
			eachButtonJQ.parent().after(UPdynamicInput({
			schoolCategory: eachButtonJQ.attr('category'),
			schoolId: eachSchoolId,
			classCategory: eachButtonJQ.attr('classCategory'),
			n: eachButtonJQ.attr('classNum'),
			classArray: JSON.parse("[" + eachButtonJQ.attr('classArray') + "]"),
			}));
		});
	};

	var defaultButtons = $('.checkSchool:disabled');
	makeDynamicInput(defaultButtons);


	//취소버튼을 누르면 뒤로 가는 controller
	$('.goBack').on('click', function(evt){
		evt.preventDefault();
		location.href = document.referrer;
	});

	var profileId = $('#updateProfileForm').attr('profileId');

	//Form Submit Event Controller
	$('#updateProfileForm').on('submit', function(evt){
		evt.preventDefault();
		var profileData = { 
			elementaryClass: [],
			middleClass: [],
			highClass: [], 
		};

		$(this).serializeArray().map(function(a){
			if((a.name === 'elementaryClass') || (a.name === 'middleClass') || (a.name === 'highClass'))return  profileData[a.name].push(a.value);
			if(a.name === 'stories') return profileData.stories.push({content: a.value});
			profileData[a.name] = a.value;
		});

		console.log(profileData);

		updateProfile(profileId, profileData).then(function(data){
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

	//SearchSchoolResult Template Compile
	var NPsearchedSchools = TPL.NPsearchedSchools;

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
				makeDynamicInput(_this, $(this).attr('schoolId'));				
			});
		});
	});

});
