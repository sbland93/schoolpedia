
$(document).ready(function(){

    Kakao.init('32a14cfba5363f5cf4d31a39e426e4a9');
    // 카카오 로그인 버튼을 생성합니다.
    Kakao.Auth.createLoginButton({
      container: '#kakao-login-btn',
      success: function(authObj) {        
        // 로그인 성공시, API를 호출하여 사용자 정보를 가져옵니다.
        Kakao.API.request({
          url: '/v1/user/me',
          //사용자 정보를 가져오는것까지 성공시에
          //사용자의 카카오아이디가 이미 인증에 사용된것이 아닌지 확인합니다.
          success: function(res) {
            getUsers({kakaoEmail: res.kaccount_email}).then(function(data){
              
              //카카오 이메일이 인증에 사용되지 않았다면,
              if(data.length === 0){
                
                //카카오 인증을 성공시켜준다. hiddenKakao Field 인증.
                $("#verified").val(true);
                $("#fieldKakaoEmail").val(res.kaccount_email);
                $("#kakaoMessage").html("인증완료");
                                                            
              }else{

                alert("이미 카카오 계정이 인증에 사용된것 같습니다! 카카오 계정을 통해 아이디를 찾아보세요!");

              }

            });
          },
          fail: function(error) {
            alert(JSON.stringify(error));
          }
        });

      },
      fail: function(err) {
         alert(JSON.stringify(err));
      }
    });


    //취소버튼을 누르면 뒤로 가는 controller
    //DOLATER 단순히 뒤로가면 안될거 같은데..
    $('.goBack').on('click', function(evt){
      evt.preventDefault();
      location.href = document.referrer;
    });
    var EPaddSchool = TPL.EPaddSchool;
    $("#addSchool").on('click',function(evt){
      
      evt.preventDefault();
      
      $("#addSchoolTPL").html(EPaddSchool());
      $("#cancelUpdateSchool").on('click',function(evt){
        evt.preventDefault();
        $("#addSchoolTPL").html("");
      })
      $("#searchSchool").validate({
        rules:{
          name:{
            required:true,
            minlength:1,
            maxlength:10,
          }
        },
        messages:{
          name:"한글자 이상입니다리."
        },
        submitHandler:function(form,evt){
          evt.preventDefault();
          var sendingData = $(form).serialize();
          getSchools(sendingData).then(function(data){
            if(data.length){
              var template2 = TPL.RGsearchedSchools;
              $("#searchedSchoolsTPL").html(template2({searchedList:data}));
              $(".sendData").on('click',function(evt){
                evt.preventDefault();
                var schoolId = $(this).attr("schoolId");
                var schoolName = $(".inputName").val();
                var input = document.createElement("INPUT");
                input.setAttribute("type","hidden");
                input.setAttribute("name","schools");
                input.setAttribute("value",schoolId);
                document.getElementById("registerForms").appendChild(input);
                var li = document.createElement("LI");
                var text = document.createTextNode(schoolName);
                li.appendChild(text);
                document.getElementById("addSchoolTemplate").appendChild(li);
                //첫번째 register form에 동적으로 input을 생성 그래야 registerForm 을 서브밋할때 같이 스쿨정보가 가기때문
                $("#addSchoolTPL").html("");
              })
              
               
            }
          })
        }
      })  
      
    })
    // Initialize form validation on the registration form.
    // It has the name attribute "registration"
    $(".registerForm").validate({
      ignore: [],
      // Specify validation rules

      rules: {

        email:{
          required: true,
          email: true,
        },

        name:{
          required: true,
          minlength: 2,
          maxlength: 5,
        },
        
        password: {
          required: true,
          minlength: 6,
          maxlength: 20
        },
        
        passwordConf: {
          required: true,
          equalTo: "#fieldPassword"
        },

        verified: {
          required: true,
        },
        graduation:{
          required: true,
          min: 1950,
        },
      
      },
      // Specify validation error messages
      messages: {
      
        email: "이메일은 필수사항입니다리, 이메일 형식//ex)SchoolChonng@gmail.com",
        name: "예) 홍길동 // 두글자이상 다섯글자이하입니다.",
        password: "비밀번호는 6글자 이상 20글자 이하 필수입니다리",
        passwordConf: "비밀번호와 비밀번호 확인이 다른 것 같습니다리",
        graduation: "졸업년도 선택은 필수 입니다리",
        verified: "카카오인증을 해주세요!",
      },
      submitHandler: function(form, evt) {
        console.log("Here");
        evt.preventDefault();
        form.submit();
      }
    });
    /*$("#addSchool").on('click',function(evt){
      var EPupdateSchool = TPL.EPupdateSchool;
      evt.preventDefault();
      $("#addSchoolTPL").html(EPupdateSchool());
      $(".addSchoolForm").validate({
        rules:{
          name:{
            required:true,
            minlength:1,
            maxlength:10,
          }
        },
        messages:{
          name:"한글자 이상입니다."
        },
        submitHandler:function(form,evt){
          evt.preventDefault();
          var sendingData = $(form).serialize();
          getSchools(sendingData).then(function(data){
            if(data.length){
              var template2 = TPL.EPsearchedSchools;
              $("#searchedSchoolsTPL").html(template2({searchedList:data}));
              $(".sendData").on('click',function(evt){
                evt.preventDefault();
                form.submit();
              })
              $("#addSchoolTPL").html("");
                   
                  
                  
                
            }
          });

          

        } 
      })
      
      
    })*/


});


