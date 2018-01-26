
$(document).ready(function(){
  //<![CDATA[
  // 사용할 앱의 JavaScript 키를 설정해 주세요.
  Kakao.init('32a14cfba5363f5cf4d31a39e426e4a9');
  // 카카오 로그인 버튼을 생성합니다.
  Kakao.Auth.createLoginButton({
    container: '#kakao-login-btn',
    success: function(authObj) {
      alert(JSON.stringify(authObj));
    },
    fail: function(err) {
       alert(JSON.stringify(err));
    }
  });
  //]]>


  //취소버튼을 누르면 뒤로 가는 controller
  //DOLATER 단순히 뒤로가면 안될거 같은데..
  $('.goBack').on('click', function(evt){
    evt.preventDefault();
    location.href = document.referrer;
  });

  // Initialize form validation on the registration form.
  // It has the name attribute "registration"
  $(".registerForm").validate({
    // Specify validation rules
    rules: {
      email:{
        required: true,
        email: true,
      },
      password: {
        required: true,
        minlength: 6,
        maxlength: 20
      },
      passwordConf: {
        required: true,
        equalTo: "#fieldPassword"
      }
    },
    // Specify validation error messages
    messages: {
      email: "이메일은 필수사항입니다리, 이메일 형식//ex)SchoolChonng@gmail.com",
      password: "비밀번호는 6글자 이상 20글자 이하 필수입니다리",
      passwordConf: "비밀번호와 비밀번호 확인이 다른 것 같습니다리",
    },
    submitHandler: function(form, evt) {
      evt.preventDefault();
      console.log($(form).serialize()); 
    }
  });


});