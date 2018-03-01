this["TPL"] = this["TPL"] || {};

this["TPL"]["HMsearchedSchools"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "		<a href=\"/school/"
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\">\n			<li>"
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + " ("
    + alias4(((helper = (helper = helpers.location || (depth0 != null ? depth0.location : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"location","hash":{},"data":data}) : helper)))
    + ")</li>\n		</a>\n";
},"3":function(container,depth0,helpers,partials,data) {
    return "		그런학교 없다 ㄹㅇㅠㅠ. 정확한 이름이 필요하다리 ex) 외고(x) 외국어고등학교(o)\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<!-- 학교검색 template-->\n<ul class=\"schoolList\">\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.schoolList : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data})) != null ? stack1 : "")
    + "</ul>\n\n";
},"useData":true});

this["TPL"]["MCupdatePassword"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<form class=\"form-horizontal updatePasswordForm\" role=\"form\" action=\"/api/user\" method=\"PUT\">\n	<!--개인비밀번호 수정-->\n	<div class=\"form-group\">\n		<div class=\"col-md-12 col-sm-12 col-xs-12\">\n			<label for=\"fieldwPassword\">새로운 비밀번호</label>\n			<input type=\"password\" class=\"form-control\" name=\"password\" id=\"fieldPassword\" />\n		</div>\n	</div>\n\n	<div class=\"form-group\">\n		<div class=\"col-md-12 col-sm-12 col-xs-12\">\n			<label for=\"fieldwPasswordConf\">새로운 비밀번호 확인</label>\n			<input type=\"password\" class=\"form-control\" name=\"passwordConf\" id=\"fieldPasswordCOnf\" />\n		</div>\n	</div>\n\n	<button type=\"submit\" class=\"pull-right btn btn-default btn-sm buttonGroup\">수정</button>\n</form>\n\n	<button class=\"btn btn-default btn-sm\" id=\"cancelUpdatePassword\">취소</button>";
},"useData":true});

this["TPL"]["NPaddSchool"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = (helpers.forLoop || (depth0 && depth0.forLoop) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),6,{"name":"forLoop","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n";
},"2":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "	<div class=\"form-group\">\n		<label for=\"class\" class=\"col-xs-12 col-sm-2 control-label\">"
    + alias4(((helper = (helper = helpers.index || (depth0 != null ? depth0.index : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"index","hash":{},"data":data}) : helper)))
    + "학년 학급</label>\n		<div class=\"col-xs-9 col-sm-6 col-md-5\">\n			<select class=\"form-control\" name=\"class"
    + alias4(((helper = (helper = helpers.index || (depth0 != null ? depth0.index : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"index","hash":{},"data":data}) : helper)))
    + "\" id=\"class\">\n				<option value=\"0\">기억이 잘안나요</option>\n"
    + ((stack1 = (helpers.forLoop || (depth0 && depth0.forLoop) || alias2).call(alias1,20,{"name":"forLoop","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "			</select>\n		</div>\n	</div>\n";
},"3":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "					<option value=\""
    + alias4(((helper = (helper = helpers.index || (depth0 != null ? depth0.index : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"index","hash":{},"data":data}) : helper)))
    + "\">"
    + alias4(((helper = (helper = helpers.index || (depth0 != null ? depth0.index : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"index","hash":{},"data":data}) : helper)))
    + "</option>\n";
},"5":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = (helpers.forLoop || (depth0 && depth0.forLoop) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),3,{"name":"forLoop","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<!--newProfile에서 schoolInfo를 확인받아 넘겨 만드는 동적 학교 추가 템플릿 -->\n\n\n<!-- 학교이름 / input으로 처리하지말것 -->\n<div class=\"form-group\">\n	<label for=\"school\" class=\"col-xs-12 col-sm-2 control-label\">학교</label>\n	<div class=\"col-xs-9 col-sm-6 col-md-5\">\n		"
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0.schoolInfo : depth0)) != null ? stack1.name : stack1), depth0))
    + "\n	</div>\n</div>\n\n<!-- 학교 category가 elementarySchool이면6번 interate 그렇지 않으면 3번 iterate-->\n"
    + ((stack1 = (helpers.isEquals || (depth0 && depth0.isEquals) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),((stack1 = (depth0 != null ? depth0.schoolInfo : depth0)) != null ? stack1.category : stack1),"elementarySchool",{"name":"isEquals","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(5, data, 0),"data":data})) != null ? stack1 : "");
},"useData":true});

this["TPL"]["NPOsearchedSchools"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "	<div>\n		"
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + " ("
    + alias4(((helper = (helper = helpers.location || (depth0 != null ? depth0.location : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"location","hash":{},"data":data}) : helper)))
    + ")의 학교 학생 만들기 <a href=\"/profile/newTwo?school="
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\" class=\"btn btn-default\">GO!</a>\n	</div>\n";
},"3":function(container,depth0,helpers,partials,data) {
    return "	입력한 학교는 존재하지 않아요ㅠㅠ 다시한번 검색해주세요! 정확한 이름이 필요하다리 ex) 외고(x) 외국어고등학교(o)\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.schoolList : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data})) != null ? stack1 : "");
},"useData":true});

this["TPL"]["NFaddSchool"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<form class=\"form-horizontal\" action=\"/api/school\" id=\"searchSchool\">\n	<div class=\"form-group\">\n		<div class=\"col-md-12 col-sm-12 col-xs-12\">\n			<label>학교검색</label>\n		</div>\n		\n		<div class=\"col-xs-9 col-sm-8 col-md-12\">\n			<input type=\"text\" class=\"form-control\" name=\"name\" placeholder=\"학교명을 입력하세요!!\">\n		</div>\n		<div class=\"col-xs-12 col-md-12\">	\n			<button class=\"btn btn-default buttonGroup\" type=\"submit\">검색!</button>\n			<button class=\"btn btn-default buttonGroup\" id=\"cancelAddSchool\">취소</button>\n		</div>\n	</div>\n</form>\n\n<div id=\"searchedSchoolsTPL\"></div>\n\n\n\n";
},"useData":true});

this["TPL"]["NFsearchedProfileList"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return "	<ul class=\"profileList\">\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.searchedList : depth0),{"name":"each","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "	</ul>\n	프로필이 만들어져있지 않으면 마음껏 만들어주세요 <button class=\"btn btn-default buttonGroup\"><a href=\"/school/"
    + container.escapeExpression(((helper = (helper = helpers.schoolId || (depth0 != null ? depth0.schoolId : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"schoolId","hash":{},"data":data}) : helper)))
    + "/profile/newOne\">만들기</a></button>\n";
},"2":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "			<li><a href=\"/profile/"
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\"><p>"
    + alias4(((helper = (helper = helpers.bugName || (depth0 != null ? depth0.bugName : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"bugName","hash":{},"data":data}) : helper)))
    + " "
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + " "
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.schools : depth0),{"name":"each","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " "
    + alias4(((helper = (helper = helpers.graduation || (depth0 != null ? depth0.graduation : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"graduation","hash":{},"data":data}) : helper)))
    + "</p></a></li>\n";
},"3":function(container,depth0,helpers,partials,data) {
    var stack1;

  return " "
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0.school : depth0)) != null ? stack1.name : stack1), depth0))
    + " ";
},"5":function(container,depth0,helpers,partials,data) {
    var helper;

  return "	그런학생 아직 없다 만들기 <button class=\"btn btn-default buttonGroup\"><a href=\"/school/"
    + container.escapeExpression(((helper = (helper = helpers.schoolId || (depth0 != null ? depth0.schoolId : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"schoolId","hash":{},"data":data}) : helper)))
    + "/profile/newOne\">만들기</a></button>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return ((stack1 = helpers.unless.call(alias1,(depth0 != null ? depth0.noData : depth0),{"name":"unless","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.noData : depth0),{"name":"if","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"useData":true});

this["TPL"]["NFsearchedSchools"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "		<li>"
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + " ("
    + alias4(((helper = (helper = helpers.location || (depth0 != null ? depth0.location : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"location","hash":{},"data":data}) : helper)))
    + ")</li><button class=\"sendData btn btn-default btn-sm\" schoolId="
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + " schoolName="
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + ">확인</button></br>\n";
},"3":function(container,depth0,helpers,partials,data) {
    return "		그런학교 없는거같습니다리ㅠㅠ 정확한 이름이 필요하다리 ex) 외고(x) 외국어고등학교(o)\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<ul class=\"schoolList\">\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.schoolList : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data})) != null ? stack1 : "")
    + "</ul>";
},"useData":true});

this["TPL"]["EPaddFeature"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<!--EP에서 특징추가하기를 누르면 나오는 template -->\n\n<form class=\"form-horizontal addFeatureForm\" role=\"form\" action=\"/api/profile/"
    + alias4(((helper = (helper = helpers.profileId || (depth0 != null ? depth0.profileId : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"profileId","hash":{},"data":data}) : helper)))
    + "\" method=\"PUT\" profileId=\""
    + alias4(((helper = (helper = helpers.profileId || (depth0 != null ? depth0.profileId : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"profileId","hash":{},"data":data}) : helper)))
    + "\">\n\n	<!--특징추가 form-->\n	<div class=\"form-group\">\n		<label class=\"col-md-12 col-sm-12 col-xs-12\">별명</label>\n		<div class=\"col-xs-12 col-sm-8 col-md-7\">\n			<textarea class=\"form-control\" name=\"feature\" id=\"fieldFeature\" placeholder=\"상대가 싫어할 수 있는 별명은 제외해주세요!\" required></textarea>\n		</div>\n		<!--추가 버튼-->\n		<div class=\"col-xs-12 col-md-12\">\n			<button type=\"submit\" class=\"btn btn-default btn-sm buttonGroup\">추가</button>\n			<button class=\"btn btn-default btn-sm buttonGroup\" id=\"cancelAddFeature\">취소</button>\n		</div>	\n	</div>\n</form>\n";
},"useData":true});

this["TPL"]["EPaddReply"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper;

  return "<!--EP에서 특징추가하기를 누르면 나오는 template -->\n\n<form class=\"form-horizontal addReplyForm\" role=\"form\" action=\"/api/profile/"
    + container.escapeExpression(((helper = (helper = helpers.profileId || (depth0 != null ? depth0.profileId : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"profileId","hash":{},"data":data}) : helper)))
    + "\" method=\"PUT\">\n\n	<!--특징추가 form-->\n	<div class=\"form-group\">\n		<label class=\"col-md-12 col-sm-12 col-xs-12\">방명록쓰기</label>\n		<div class=\"col-xs-12 col-sm-8 col-md-7\">\n			<textarea class=\"form-control\" name=\"reply\" id=\"fieldReply\" placeholder=\"방명록은 실명으로 작성됩니다!\" required></textarea>\n		</div>\n		<!--추가 버튼-->\n		<div class=\"col-xs-12 col-md-12\">\n			<button type=\"submit\" class=\"btn btn-default btn-sm buttonGroup\">추가</button>\n			<button class=\"btn btn-default btn-sm buttonGroup\" id=\"cancelAddReply\">취소</button>\n		</div>	\n	</div>\n	\n</form>\n\n";
},"useData":true});

this["TPL"]["EPaddSchool"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<form class=\"form-horizontal\" action=\"/api/school\" id=\"searchSchool\">\n	<div class=\"form-group\">\n		<label class=\"col-md-12 col-sm-12 col-xs-12\">학교추가</label>\n		\n		<div class=\"col-xs-9 col-sm-8 col-md-7\">\n			<input type=\"text\" class=\"form-control\" name=\"name\" placeholder=\"학교명을 입력하세요!\">\n		</div>\n		<div class=\"col-xs-12 col-md-12\">	\n			<button class=\"btn btn-default btn-sm buttonGroup\" type=\"submit\">검색!</button>\n			<button class=\"btn btn-default btn-sm buttonGroup\" id=\"cancelAddSchool\">취소</button>\n		</div>\n	</div>\n</form>\n\n<div id=\"searchedSchoolsTPL\"></div>";
},"useData":true});

this["TPL"]["EPaddStory"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper;

  return "\n\n<!--EP에서 특징추가하기를 누르면 나오는 template -->\n\n<form class=\"form-horizontal addStoryForm\" role=\"form\" action=\"/api/profile/"
    + container.escapeExpression(((helper = (helper = helpers.profileId || (depth0 != null ? depth0.profileId : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"profileId","hash":{},"data":data}) : helper)))
    + "\" method=\"PUT\">\n\n	<!--특징추가 form-->\n	<div class=\"form-group\">\n		<label class=\"col-md-12 col-sm-12 col-xs-12\">이야기쓰기</label>\n		<div class=\"col-xs-12 col-sm-11 col-md-7\">\n			<textarea class=\"form-control\" name=\"story\" id=\"fieldStory\" placeholder=\"학창시절 이야기나, 관련 일화입니다! 민감한 이야기는 제외해주세요.\" required></textarea>\n		</div>\n		<!--추가 버튼-->\n		<div class=\"col-xs-12 col-md-12\">\n			<button type=\"submit\" class=\"btn btn-default btn-sm buttonGroup\">추가</button>\n			<button class=\"btn btn-default btn-sm buttonGroup\" id=\"cancelAddStory\">취소</button>\n		</div>	\n\n	</div>\n</form>\n\n";
},"useData":true});

this["TPL"]["EPfeatures"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var helper;

  return "        	<button class=\"manageProfile btn btn-default btn-sm \" target=\"features\" targetId=\""
    + container.escapeExpression(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"id","hash":{},"data":data}) : helper)))
    + "\">삭제</button>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\"score-structural score-column2-wideright search-listings post\">\n    <div class=\"score-right\">\n        <p style=\"z-index: 1;\">\n        	"
    + alias4(((helper = (helper = helpers.content || (depth0 != null ? depth0.content : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"content","hash":{},"data":data}) : helper)))
    + "  <div class=\"pull-right\">"
    + ((stack1 = (helpers.dateFormat || (depth0 && depth0.dateFormat) || alias2).call(alias1,(depth0 != null ? depth0.updated_at : depth0),{"name":"dateFormat","hash":{},"data":data})) != null ? stack1 : "")
    + "</div> \n	        <div class=\"btn-group\" role=\"group\" aria-label=\"Profile Up Down\">\n				<button class=\"profileUpDown btn btn-default btn-sm buttonGroup\" target=\"features\" targetId=\""
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\" upOrDown=\"up\">+"
    + alias4(((helper = (helper = helpers.up || (depth0 != null ? depth0.up : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"up","hash":{},"data":data}) : helper)))
    + "</button>\n	        	<button class=\"profileUpDown btn btn-default btn-sm buttonGroup\" target=\"features\" targetId=\""
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\" upOrDown=\"down\">"
    + alias4(((helper = (helper = helpers.down || (depth0 != null ? depth0.down : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"down","hash":{},"data":data}) : helper)))
    + "</button>\n			</div>\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.isMyPage : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "        </p>\n    </div>\n</div>\n";
},"useData":true});

this["TPL"]["EPpagination"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = (helpers.isEquals || (depth0 && depth0.isEquals) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),depth0,"...",{"name":"isEquals","hash":{},"fn":container.program(2, data, 0),"inverse":container.program(4, data, 0),"data":data})) != null ? stack1 : "");
},"2":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression;

  return "		    			<li class=\"pagination-page\" d-page=\""
    + alias2(alias1(depth0, depth0))
    + "\"><a id=\"preventHrefTag\">"
    + alias2(alias1(depth0, depth0))
    + "</a></li>\n";
},"4":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression;

  return "		    			<li class=\"pagination-page\" d-page=\""
    + alias2(alias1(depth0, depth0))
    + "\"><a href=\"#\">"
    + alias2(alias1(depth0, depth0))
    + "</a></li>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return "<div class=\"row\">\n	<div class=\"col-md-12\">\n		<ul class=\"pagination "
    + container.escapeExpression(((helper = (helper = helpers.dynamicClass || (depth0 != null ? depth0.dynamicClass : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"dynamicClass","hash":{},"data":data}) : helper)))
    + "\">\n		    <li class=\"pagination-prev\"><a href=\"#\">&laquo;</a></li>\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.pages : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "		    <li class=\"pagination-next\"><a href=\"#\">&raquo;</a></li>\n		</ul>\n	</div>\n</div>\n";
},"useData":true});

this["TPL"]["EPprofile"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<button class=\"btn btn-lg btn-warning\" id=\"takeProfile\" userId="
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0.userInfo : depth0)) != null ? stack1.id : stack1), depth0))
    + ">프로필 차지하기</button>\n";
},"3":function(container,depth0,helpers,partials,data) {
    return "남";
},"5":function(container,depth0,helpers,partials,data) {
    return "여";
},"7":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "			친구의 학교가 "
    + ((stack1 = (helpers.lengthOf || (depth0 && depth0.lengthOf) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),((stack1 = (depth0 != null ? depth0.profile : depth0)) != null ? stack1.schools : stack1),{"name":"lengthOf","hash":{},"data":data})) != null ? stack1 : "")
    + "개 밖에 등록되지 않았어요! 친구의 초, 중, 고를 알고있으면 추가해주세요! <br>\n";
},"9":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, alias3=depth0 != null ? depth0 : (container.nullContext || {});

  return "			<a class=\"updateClass\" schoolId="
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.school : depth0)) != null ? stack1._id : stack1), depth0))
    + ">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.school : depth0)) != null ? stack1.name : stack1), depth0))
    + "</a> "
    + ((stack1 = helpers["if"].call(alias3,(depths[1] != null ? depths[1].isMyPage : depths[1]),{"name":"if","hash":{},"fn":container.program(10, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n			->\n"
    + ((stack1 = helpers.each.call(alias3,(depth0 != null ? depth0["class"] : depth0),{"name":"each","hash":{},"fn":container.program(12, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "			</br>\n";
},"10":function(container,depth0,helpers,partials,data) {
    var stack1;

  return " <button class=\"manageProfile btn btn-default btn-sm buttonGroup\" target=\"schools\" targetId=\""
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0.school : depth0)) != null ? stack1._id : stack1), depth0))
    + "\">삭제</button> ";
},"12":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return ((stack1 = (helpers.ifDefaultClass || (depth0 && depth0.ifDefaultClass) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),depth0,{"name":"ifDefaultClass","hash":{},"fn":container.program(13, data, 0, blockParams, depths),"inverse":container.program(15, data, 0, blockParams, depths),"data":data})) != null ? stack1 : "");
},"13":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return "					<a class=\"updateClass\" schoolId="
    + container.escapeExpression(container.lambda(((stack1 = (depths[1] != null ? depths[1].school : depths[1])) != null ? stack1._id : stack1), depth0))
    + ">?</a>\n";
},"15":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return "					<a href=\"/profile/search?school=only&schoolId="
    + alias2(alias1(((stack1 = (depths[1] != null ? depths[1].school : depths[1])) != null ? stack1._id : stack1), depth0))
    + "&fields=only&graduation="
    + alias2(alias1(((stack1 = (depths[2] != null ? depths[2].profile : depths[2])) != null ? stack1.graduation : stack1), depth0))
    + "&classNum="
    + alias2(alias1(depth0, depth0))
    + "\">"
    + alias2(alias1(depth0, depth0))
    + "반</a>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.lambda, alias3=container.escapeExpression, alias4=helpers.helperMissing;

  return "\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.takeProfile : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n\n<header class=\"bugName\">"
    + alias3(alias2(((stack1 = (depth0 != null ? depth0.profile : depth0)) != null ? stack1.name : stack1), depth0))
    + "("
    + alias3(alias2(((stack1 = (depth0 != null ? depth0.profile : depth0)) != null ? stack1.graduation : stack1), depth0))
    + " - "
    + ((stack1 = (helpers.math || (depth0 && depth0.math) || alias4).call(alias1,((stack1 = (depth0 != null ? depth0.profile : depth0)) != null ? stack1.graduation : stack1),"-",1919,{"name":"math","hash":{},"data":data})) != null ? stack1 : "")
    + " "
    + ((stack1 = helpers["if"].call(alias1,((stack1 = (depth0 != null ? depth0.profile : depth0)) != null ? stack1.gender : stack1),{"name":"if","hash":{},"fn":container.program(3, data, 0, blockParams, depths),"inverse":container.program(5, data, 0, blockParams, depths),"data":data})) != null ? stack1 : "")
    + ")</header> \n<div class=\"row\">\n	<div class=\"pull-right\">\n		프로필 친구에게 공유하기<a id=\"kakao-link-btn\" href=\"javascript:;\"><img src=\"//developers.kakao.com/assets/img/about/logos/kakaolink/kakaolink_btn_small.png\"/></a>\n	</div>\n</div>\n<div class=\"row\">\n	<div class=\"col-md-offset-4\">\n		\n"
    + ((stack1 = helpers["if"].call(alias1,(helpers.checkBoolean || (depth0 && depth0.checkBoolean) || alias4).call(alias1,(helpers.lengthOf || (depth0 && depth0.lengthOf) || alias4).call(alias1,((stack1 = (depth0 != null ? depth0.profile : depth0)) != null ? stack1.schools : stack1),{"name":"lengthOf","hash":{},"data":data}),"<",3,{"name":"checkBoolean","hash":{},"data":data}),{"name":"if","hash":{},"fn":container.program(7, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers.each.call(alias1,((stack1 = (depth0 != null ? depth0.profile : depth0)) != null ? stack1.schools : stack1),{"name":"each","hash":{},"fn":container.program(9, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "		<button class=\"btn btn-default buttonGroup\" id=\"addSchool\">학교추가</button>\n	</div>\n</div>";
},"useData":true,"useDepths":true});

this["TPL"]["EPreplies"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return "                <a href=\"/profile/"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.userInfo : depth0)) != null ? stack1.profile : stack1), depth0))
    + "\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.userInfo : depth0)) != null ? stack1.name : stack1), depth0))
    + "</a>\n";
},"3":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "                <a href=\"#\"> "
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0.userInfo : depth0)) != null ? stack1.name : stack1), depth0))
    + "</a>\n";
},"5":function(container,depth0,helpers,partials,data) {
    var helper;

  return "                <button class=\"manageProfile btn btn-sm btn-default\" target=\"replies\" targetId=\""
    + container.escapeExpression(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"id","hash":{},"data":data}) : helper)))
    + "\">삭제</button>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\"score-structural score-column2-wideright search-listings post\">\n    <div class=\"score-right\">\n        <h5 style=\"z-index: 1;\">\n"
    + ((stack1 = helpers["if"].call(alias1,((stack1 = (depth0 != null ? depth0.userInfo : depth0)) != null ? stack1.profile : stack1),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data})) != null ? stack1 : "")
    + "        </h5>\n        <p style=\"z-index: 1;\">\n            "
    + alias4(((helper = (helper = helpers.content || (depth0 != null ? depth0.content : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"content","hash":{},"data":data}) : helper)))
    + "  <div class=\"pull-right\">"
    + ((stack1 = (helpers.dateFormat || (depth0 && depth0.dateFormat) || alias2).call(alias1,(depth0 != null ? depth0.updated_at : depth0),{"name":"dateFormat","hash":{},"data":data})) != null ? stack1 : "")
    + "</div> \n            <div class=\"btn-group\" role=\"group\" aria-label=\"Profile Up Down\">\n                <button class=\"profileUpDown btn btn-default btn-sm buttonGroup\" target=\"replies\" targetId=\""
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\" upOrDown=\"up\">+"
    + alias4(((helper = (helper = helpers.up || (depth0 != null ? depth0.up : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"up","hash":{},"data":data}) : helper)))
    + "</button>\n                <button class=\"profileUpDown btn btn-default btn-sm buttonGroup\" target=\"replies\" targetId=\""
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\" upOrDown=\"down\">"
    + alias4(((helper = (helper = helpers.down || (depth0 != null ? depth0.down : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"down","hash":{},"data":data}) : helper)))
    + "</button>\n            </div>\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.isMyPage : depth0),{"name":"if","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "        </p>\n    </div>\n</div>\n";
},"useData":true});

this["TPL"]["EPsearchedFriend"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "		<a href=\"/profile/"
    + alias4(((helper = (helper = helpers._id || (depth0 != null ? depth0._id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"_id","hash":{},"data":data}) : helper)))
    + "\">\n			<li>\n			<p>"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.schools : depth0),{"name":"each","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</p>\n			<p>이름:"
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + " 졸업년도: "
    + alias4(((helper = (helper = helpers.graduation || (depth0 != null ? depth0.graduation : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"graduation","hash":{},"data":data}) : helper)))
    + " "
    + alias4(container.lambda(((stack1 = (depth0 != null ? depth0.school : depth0)) != null ? stack1.name : stack1), depth0))
    + "</p>\n			</li>\n		</a>\n";
},"2":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "\n				"
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0.school : depth0)) != null ? stack1.name : stack1), depth0))
    + "\n			";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<ul class=\"profileList\">\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),((stack1 = (depth0 != null ? depth0.profileList : depth0)) != null ? stack1.profileList : stack1),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</ul>";
},"useData":true});

this["TPL"]["EPsearchedSchools"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "		<li>"
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + " ("
    + alias4(((helper = (helper = helpers.location || (depth0 != null ? depth0.location : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"location","hash":{},"data":data}) : helper)))
    + ")</li>\n		<button class=\"sendData btn btn-default btn-sm\" schoolId=\""
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\" category=\""
    + alias4(((helper = (helper = helpers.category || (depth0 != null ? depth0.category : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"category","hash":{},"data":data}) : helper)))
    + "\" schoolName=\""
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "\">확인</button></br>\n";
},"3":function(container,depth0,helpers,partials,data) {
    return "		그런학교 없다 ㄹㅇㅠㅠ. 정확한 이름이 필요하다리 ex) 외고(x) 외국어고등학교(o)\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<!--프로필페이지에서 학교추가후, 검색시에 나오는 Template. -->\n<ul class=\"schoolList\">\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.schoolList : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data})) != null ? stack1 : "")
    + "</ul>\n";
},"useData":true});

this["TPL"]["EPstories"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var helper;

  return "                <button class=\"manageProfile btn btn-sm btn-default\" target=\"stories\" targetId=\""
    + container.escapeExpression(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"id","hash":{},"data":data}) : helper)))
    + "\">삭제</button>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\"score-structural score-column2-wideright search-listings post\">\n    <div class=\"score-right\">\n        <p style=\"z-index: 1;\">\n            "
    + alias4(((helper = (helper = helpers.content || (depth0 != null ? depth0.content : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"content","hash":{},"data":data}) : helper)))
    + "  <div class=\"pull-right\">"
    + ((stack1 = (helpers.dateFormat || (depth0 && depth0.dateFormat) || alias2).call(alias1,(depth0 != null ? depth0.updated_at : depth0),{"name":"dateFormat","hash":{},"data":data})) != null ? stack1 : "")
    + "</div> \n            <div class=\"btn-group\" role=\"group\" aria-label=\"Profile Up Down\">\n                <button class=\"profileUpDown btn btn-default btn-sm buttonGroup\" target=\"stories\" targetId=\""
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\" upOrDown=\"up\">+"
    + alias4(((helper = (helper = helpers.up || (depth0 != null ? depth0.up : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"up","hash":{},"data":data}) : helper)))
    + "</button>\n                <button class=\"profileUpDown btn btn-default btn-sm buttonGroup\" target=\"stories\" targetId=\""
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\" upOrDown=\"down\">"
    + alias4(((helper = (helper = helpers.down || (depth0 != null ? depth0.down : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"down","hash":{},"data":data}) : helper)))
    + "</button>\n            </div>\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.isMyPage : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "        </p>\n    </div>\n</div>\n";
},"useData":true});

this["TPL"]["EPupdateClass"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "			\n				<div class=\"col-xs-12 col-sm-12 col-md-12\">\n			    	<label for=\"fieldClass"
    + alias4(((helper = (helper = helpers.index || (depth0 != null ? depth0.index : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"index","hash":{},"data":data}) : helper)))
    + "\">"
    + alias4(((helper = (helper = helpers.index || (depth0 != null ? depth0.index : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"index","hash":{},"data":data}) : helper)))
    + "학년</label>\n			    </div>\n			    <div class=\"col-xs-7 col-sm-7 col-md-7\">\n			    	<select class= \"form-control class\" id=\"fieldClass"
    + alias4(((helper = (helper = helpers.index || (depth0 != null ? depth0.index : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"index","hash":{},"data":data}) : helper)))
    + "\" name=\"class\">\n"
    + ((stack1 = (helpers.iterateClass || (depth0 && depth0.iterateClass) || alias2).call(alias1,(depth0 != null ? depth0.element : depth0),{"name":"iterateClass","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "				    </select>\n			    </div>\n		\n";
},"2":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "							<option value=\""
    + alias4(((helper = (helper = helpers.index || (depth0 != null ? depth0.index : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"index","hash":{},"data":data}) : helper)))
    + "\""
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.isDefault : depth0),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ">"
    + alias4(((helper = (helper = helpers.index || (depth0 != null ? depth0.index : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"index","hash":{},"data":data}) : helper)))
    + "</option>\n";
},"3":function(container,depth0,helpers,partials,data) {
    return " selected=\"selected\"";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3=container.escapeExpression, alias4=container.lambda;

  return "<form class=\"form-horizontal updateClassForm\" role=\"form\" method=\"PUT\" action=\"/api/profile/"
    + alias3(((helper = (helper = helpers.profileId || (depth0 != null ? depth0.profileId : depth0)) != null ? helper : alias2),(typeof helper === "function" ? helper.call(alias1,{"name":"profileId","hash":{},"data":data}) : helper)))
    + "\">\n	<div class=\"form-group\">\n\n		<div class=\"col-md-12 col-sm-12\">\n			<label>"
    + alias3(alias4(((stack1 = (depth0 != null ? depth0.schoolObj : depth0)) != null ? stack1.name : stack1), depth0))
    + "반 수정</label>\n		</div>\n		\n"
    + ((stack1 = (helpers.indexLoop || (depth0 && depth0.indexLoop) || alias2).call(alias1,((stack1 = (depth0 != null ? depth0.schoolObj : depth0)) != null ? stack1["class"] : stack1),{"name":"indexLoop","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "			<input type=\"hidden\" id=\"updateCategory\" value=\""
    + alias3(alias4(((stack1 = ((stack1 = (depth0 != null ? depth0.schoolObj : depth0)) != null ? stack1.school : stack1)) != null ? stack1.category : stack1), depth0))
    + "\" />\n		<div class=\"col-md-12 col-sm-12 col-xs-12\">\n			<button class=\"btn btn-default btn-sm buttonGroup\" id=\"updateClassButton\">수정</button>\n			<button class=\"btn btn-default btn-sm buttonGroup\" id=\"cancelUpdateClass\">취소</button>\n		</div>\n		\n	</div>\n	\n</form>\n	";
},"useData":true});

this["TPL"]["PSsearchedProfiles"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "		<a href=\"/profile/"
    + alias4(((helper = (helper = helpers._id || (depth0 != null ? depth0._id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"_id","hash":{},"data":data}) : helper)))
    + "\">\n			<li>\n			<p>"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.schools : depth0),{"name":"each","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</p>\n			<p>이름:"
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + " 졸업년도: "
    + alias4(((helper = (helper = helpers.graduation || (depth0 != null ? depth0.graduation : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"graduation","hash":{},"data":data}) : helper)))
    + " "
    + alias4(container.lambda(((stack1 = (depth0 != null ? depth0.school : depth0)) != null ? stack1.name : stack1), depth0))
    + "</p>\n			</li>\n		</a>\n";
},"2":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "\n				"
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0.school : depth0)) != null ? stack1.name : stack1), depth0))
    + "\n			";
},"4":function(container,depth0,helpers,partials,data) {
    return "		해당 검색 내용으로는, 결과가 없는거 같아요! 친구의 프로필이 없다면, 회원님이 생성해주세요!\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<ul class=\"profileList\">\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.profileList : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(4, data, 0),"data":data})) != null ? stack1 : "")
    + "</ul>";
},"useData":true});

this["TPL"]["RGaddSchool"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<form class=\"form-horizontal\" action=\"/api/school\" id=\"searchSchool\">\n	<div class=\"form-group\">\n		<label class=\"col-md-12 col-sm-12 col-xs-12\">학교추가</label>\n		\n		<div class=\"col-xs-9 col-sm-8 col-md-7\">\n			<input type=\"text\" class=\"form-control\" name=\"name\" placeholder=\"학교명을 입력하세요!\">\n		</div>\n		<div class=\"col-xs-12 col-md-12\">	\n			<button class=\"btn btn-default btn-sm buttonGroup\" type=\"submit\">검색!</button>\n			<button class=\"btn btn-default btn-sm buttonGroup\" id=\"cancelAddSchool\">취소</button>\n		</div>\n	</div>\n</form>\n\n<div id=\"searchedSchoolsTPL\"></div>";
},"useData":true});

this["TPL"]["RGsearchedSchools"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "		<li>"
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + " ("
    + alias4(((helper = (helper = helpers.location || (depth0 != null ? depth0.location : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"location","hash":{},"data":data}) : helper)))
    + ")</li><button class=\"sendData btn btn-default btn-sm\" schoolId="
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + " schoolName="
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + ">확인</button></br>\n";
},"3":function(container,depth0,helpers,partials,data) {
    return "		그런학교 없는거같습니다리ㅠㅠ 정확한 이름이 필요하다리 ex) 외고(x) 외국어고등학교(o)\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<ul class=\"schoolList\">\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.schoolList : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data})) != null ? stack1 : "")
    + "</ul>";
},"useData":true});

this["TPL"]["SCsearchedProfileList"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return "	<ul class=\"profileList\">\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.searchedList : depth0),{"name":"each","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "	</ul>\n	원하는 검색결과가 아직 없다면, 찾으려는 학생의 프로필을 만들어 학생위키 만들기에 동참해주세요!\n <a href=\"/profile/newOne?school="
    + container.escapeExpression(((helper = (helper = helpers.schoolId || (depth0 != null ? depth0.schoolId : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"schoolId","hash":{},"data":data}) : helper)))
    + "\" class=\"btn btn-default\">만들기</a>\n";
},"2":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "			<li><a href=\"/profile/"
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\"><p>"
    + alias4(((helper = (helper = helpers.bugName || (depth0 != null ? depth0.bugName : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"bugName","hash":{},"data":data}) : helper)))
    + " "
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + " "
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.schools : depth0),{"name":"each","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " "
    + alias4(((helper = (helper = helpers.graduation || (depth0 != null ? depth0.graduation : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"graduation","hash":{},"data":data}) : helper)))
    + "</p></a></li>\n";
},"3":function(container,depth0,helpers,partials,data) {
    var stack1;

  return " "
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0.school : depth0)) != null ? stack1.name : stack1), depth0))
    + " ";
},"5":function(container,depth0,helpers,partials,data) {
    var helper;

  return "	해당학생은 아직 존재하지 않는것 같아요. 찾으려는 학생의 프로필을 만들어 학생위키 만들기에 동참해주세요!\n	<a href=\"/profile/newOne?school="
    + container.escapeExpression(((helper = (helper = helpers.schoolId || (depth0 != null ? depth0.schoolId : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"schoolId","hash":{},"data":data}) : helper)))
    + "\" class=\"btn btn-default\">만들기</a>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return ((stack1 = helpers.unless.call(alias1,(depth0 != null ? depth0.noData : depth0),{"name":"unless","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.noData : depth0),{"name":"if","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"useData":true});

this["TPL"]["SCupdateDescription"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "\n<form class=\"form-horizontal updateSchoolForm\" role=\"form\" action=\"/api/school\" method=\"PUT\">\n	<!--controller에서 id를 가져오기 위해 추가된 From-->\n\n	<!--제목부분-->\n	\n	<div class=\"col-md-12 col-sm-12 col-xs-12\">\n		<label>소개글수정</label>\n	</div>\n	<div class=\"col-xs-10 col-sm-6 col-md-6\">\n		<input type=\"text\" class=\"form-control\" required name=\"description\" id=\"fieldDescription\">\n	</div>\n	\n	\n\n	<!--수정, 취소 버튼-->\n	<div class=\"col-sm-12 col-md-12\">\n		<button type=\"submit\" class=\"btn btn-default buttonGroup\">수정</button>\n		<button class=\"btn btn-default buttonGroup\" id=\"cancelUpdateDescription\">취소</button>\n	</div>\n		\n</form>\n";
},"useData":true});

this["TPL"]["SBsearchedBoards"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "			<a href=\"/board/"
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\">\n				<li>\n					제목: "
    + alias4(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data}) : helper)))
    + "\n					<p>내용: "
    + alias4(((helper = (helper = helpers.content || (depth0 != null ? depth0.content : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"content","hash":{},"data":data}) : helper)))
    + "</p>\n				</li>\n			</a>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div class=\"col-xs-12 col-sm-12 col-md-12\">\n	<ul class=\"boardList\">\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.boardList : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "	</ul>\n</div>";
},"useData":true});

this["TPL"]["SPsearchedProfiles"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "		<a href=\"/profile/"
    + alias4(((helper = (helper = helpers._id || (depth0 != null ? depth0._id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"_id","hash":{},"data":data}) : helper)))
    + "\">\n			<li>\n			<p>"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.schools : depth0),{"name":"each","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</p>\n			<p>이름:"
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + " 졸업년도: "
    + alias4(((helper = (helper = helpers.graduation || (depth0 != null ? depth0.graduation : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"graduation","hash":{},"data":data}) : helper)))
    + " "
    + alias4(container.lambda(((stack1 = (depth0 != null ? depth0.school : depth0)) != null ? stack1.name : stack1), depth0))
    + "</p>\n			</li>\n		</a>\n";
},"2":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "\n				"
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0.school : depth0)) != null ? stack1.name : stack1), depth0))
    + "\n			";
},"4":function(container,depth0,helpers,partials,data) {
    return "		해당 검색 내용으로는, 결과가 없는거 같아요! 친구의 프로필이 없다면, 회원님이 생성해주세요!\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<ul class=\"profileList\">\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.profileList : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(4, data, 0),"data":data})) != null ? stack1 : "")
    + "</ul>";
},"useData":true});