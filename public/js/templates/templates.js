this["TPL"] = this["TPL"] || {};

this["TPL"]["HMsearchedSchools"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return "		<!-- 열려있든, 안열려있든 공통의경우는 아래-->\r\n\r\n\r\n		<!--열려있는 경우-->\r\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.available : depth0),{"name":"if","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "		\r\n		<!--열려있지 않은경우-->\r\n"
    + ((stack1 = helpers.unless.call(alias1,(depth0 != null ? depth0.available : depth0),{"name":"unless","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "	\r\n";
},"2":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "			<a href=\"/school/"
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\">\r\n				<li>"
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + " ///// "
    + alias4(((helper = (helper = helpers.location || (depth0 != null ? depth0.location : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"location","hash":{},"data":data}) : helper)))
    + "</li>\r\n			</a>\r\n";
},"4":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "			<li>"
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + " / "
    + alias4(((helper = (helper = helpers.location || (depth0 != null ? depth0.location : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"location","hash":{},"data":data}) : helper)))
    + "</li>\r\n			아직 학교문을 아무도 열지않았다리. 교문을 열어야함. 5초면 열 수 있음 진짜.\r\n			<a class=\"btn btn-default\" href=\"/school/"
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "/new\">교문열기</a>\r\n";
},"6":function(container,depth0,helpers,partials,data) {
    return "	그런학교 없다 ㄹㅇㅠㅠ.\r\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return "\r\n<ul class=\"schoolList\">\r\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.searchedList : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</ul>\r\n\r\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.noData : depth0),{"name":"if","hash":{},"fn":container.program(6, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"useData":true});

this["TPL"]["NPOsearchedProfileList"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return "	<p>혹시 이중에 만드려는 학생의 프로필이 이미 있는지 확인해 보세요.</p>\r\n	<ul class=\"profileList\">\r\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.searchedList : depth0),{"name":"each","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "	</ul>\r\n	<p> 위의 학생들중에 존재하지 않으면 쉽게 학생을 생성해봐요 <button class=\"btn btn-default\"><a href=\"/school/"
    + container.escapeExpression(((helper = (helper = helpers.schoolId || (depth0 != null ? depth0.schoolId : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"schoolId","hash":{},"data":data}) : helper)))
    + "/profile/newTwo\">만들기</a></button>\r\n";
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
    + "</p></a></li>\r\n";
},"3":function(container,depth0,helpers,partials,data) {
    var stack1;

  return " "
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0.school : depth0)) != null ? stack1.name : stack1), depth0))
    + " ";
},"5":function(container,depth0,helpers,partials,data) {
    var helper;

  return "	만드려는 학생이 현재 존재하지 않는게 맞는거 같아요 <button class=\"btn btn-default\"><a href=\"/school/"
    + container.escapeExpression(((helper = (helper = helpers.schoolId || (depth0 != null ? depth0.schoolId : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"schoolId","hash":{},"data":data}) : helper)))
    + "/profile/newTwo\">만들기</a></button>\r\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return ((stack1 = helpers.unless.call(alias1,(depth0 != null ? depth0.noData : depth0),{"name":"unless","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\r\n\r\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.noData : depth0),{"name":"if","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"useData":true});

this["TPL"]["EPaddFeature"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper;

  return "\r\n\r\n<!--EP에서 특징추가하기를 누르면 나오는 template -->\r\n\r\n<form class=\"form-horizontal addFeatureForm\" role=\"form\" action=\"/api/profile/"
    + container.escapeExpression(((helper = (helper = helpers.profileId || (depth0 != null ? depth0.profileId : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"profileId","hash":{},"data":data}) : helper)))
    + "\" method=\"PUT\">\r\n\r\n	<!--특징추가 form-->\r\n	<div class=\"form-group\">\r\n\r\n		<label for=\"fieldFeature\" class=\"col-sm-2 control-label\">특징추가하기</label>\r\n		<div class=\"col-sm-4\">\r\n			<input type=\"text\" class=\"form-control\" name=\"feature\" id=\"fieldFeature\" required>\r\n		</div>\r\n	\r\n	</div>\r\n\r\n	<!--추가 버튼-->\r\n	<div class=\"form-group\">\r\n	\r\n		<div class=\"col-sm-offset-2 col-sm-1\">\r\n			<button type=\"submit\" class=\"btn btn-default\">추가</button>\r\n		</div>\r\n\r\n	</div>\r\n</form>\r\n\r\n<div class=\"col-sm-offset-2 col-sm-1\">\r\n	<button class=\"btn btn-default\" id=\"cancelAddFeature\">취소</button>\r\n</div>\r\n";
},"useData":true});

this["TPL"]["EPfeatures"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\"score-structural score-column2-wideright search-listings post\">\r\n    <div class=\"score-right\">\r\n        <h5 style=\"z-index: 1;\">\r\n            <a href=\"#\"> "
    + alias4(((helper = (helper = helpers.user || (depth0 != null ? depth0.user : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"user","hash":{},"data":data}) : helper)))
    + "</a>\r\n        </h5>\r\n        <p style=\"z-index: 1;\">"
    + alias4(((helper = (helper = helpers.feature || (depth0 != null ? depth0.feature : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"feature","hash":{},"data":data}) : helper)))
    + "</p>\r\n    </div>\r\n</div>\r\n<hr>";
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
    + "</a></li>\r\n";
},"4":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression;

  return "		    			<li class=\"pagination-page\" d-page=\""
    + alias2(alias1(depth0, depth0))
    + "\"><a href=\"#\">"
    + alias2(alias1(depth0, depth0))
    + "</a></li>\r\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return "<div class=\"row\">\r\n	<div class=\"col-md-12\">\r\n		<ul class=\"pagination "
    + container.escapeExpression(((helper = (helper = helpers.dynamicClass || (depth0 != null ? depth0.dynamicClass : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"dynamicClass","hash":{},"data":data}) : helper)))
    + "\">\r\n		    <li class=\"pagination-prev\"><a href=\"#\">&laquo;</a></li>\r\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.pages : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "		    <li class=\"pagination-next\"><a href=\"#\">&raquo;</a></li>\r\n		</ul>\r\n	</div>\r\n</div>\r\n";
},"useData":true});

this["TPL"]["EPprofile"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "				<span>학교</span>: <em>"
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0.school : depth0)) != null ? stack1.name : stack1), depth0))
    + "</em>\r\n				<span>학급</span>:\r\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0["class"] : depth0),{"name":"each","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"2":function(container,depth0,helpers,partials,data) {
    return "					 <em>"
    + container.escapeExpression(container.lambda(depth0, depth0))
    + "반</em>\r\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return "<header>"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.profile : depth0)) != null ? stack1.bugName : stack1), depth0))
    + "</header>\r\n\r\n<div class=\"row\">\r\n	<div class=\"col-md-offset-8\">\r\n		<div class=\"prof\">\r\n			<span>충호</span>: <em>"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.profile : depth0)) != null ? stack1.bugName : stack1), depth0))
    + "</em> <span>이름</span>: <em>"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.profile : depth0)) != null ? stack1.name : stack1), depth0))
    + "</em>\r\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),((stack1 = (depth0 != null ? depth0.profile : depth0)) != null ? stack1.schools : stack1),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "		</div>\r\n	</div>\r\n</div>";
},"useData":true});

this["TPL"]["EPreplies"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\"score-structural score-column2-wideright search-listings post\">\r\n    <div class=\"score-right\">\r\n        <h5 style=\"z-index: 1;\">\r\n            <a href=\"#\"> "
    + alias4(((helper = (helper = helpers.user || (depth0 != null ? depth0.user : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"user","hash":{},"data":data}) : helper)))
    + "</a>\r\n        </h5>\r\n        <p style=\"z-index: 1;\">"
    + alias4(((helper = (helper = helpers.content || (depth0 != null ? depth0.content : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"content","hash":{},"data":data}) : helper)))
    + "</p>\r\n    </div>\r\n</div>\r\n<hr>";
},"useData":true});

this["TPL"]["EPstories"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\"score-structural score-column2-wideright search-listings post\">\r\n    <div class=\"score-right\">\r\n        <h5 style=\"z-index: 1;\">\r\n            <a href=\"#\"> "
    + alias4(((helper = (helper = helpers.user || (depth0 != null ? depth0.user : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"user","hash":{},"data":data}) : helper)))
    + "</a>\r\n        </h5>\r\n        <p style=\"z-index: 1;\">"
    + alias4(((helper = (helper = helpers.content || (depth0 != null ? depth0.content : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"content","hash":{},"data":data}) : helper)))
    + "</p>\r\n    </div>\r\n</div>\r\n<hr>";
},"useData":true});

this["TPL"]["SCsearchedProfileList"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return "	<ul class=\"profileList\">\r\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.searchedList : depth0),{"name":"each","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "	</ul>\r\n	프로필이 만들어져있지 않으면 마음껏 만들어주세요 <button class=\"btn btn-default\"><a href=\"/school/"
    + container.escapeExpression(((helper = (helper = helpers.schoolId || (depth0 != null ? depth0.schoolId : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"schoolId","hash":{},"data":data}) : helper)))
    + "/profile/newOne\">만들기</a></button>\r\n";
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
    + "</p></a></li>\r\n";
},"3":function(container,depth0,helpers,partials,data) {
    var stack1;

  return " "
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0.school : depth0)) != null ? stack1.name : stack1), depth0))
    + " ";
},"5":function(container,depth0,helpers,partials,data) {
    var helper;

  return "	그런학생 아직 없다 만들기 <button class=\"btn btn-default\"><a href=\"/school/"
    + container.escapeExpression(((helper = (helper = helpers.schoolId || (depth0 != null ? depth0.schoolId : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"schoolId","hash":{},"data":data}) : helper)))
    + "/profile/newOne\">만들기</a></button>\r\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return ((stack1 = helpers.unless.call(alias1,(depth0 != null ? depth0.noData : depth0),{"name":"unless","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\r\n\r\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.noData : depth0),{"name":"if","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"useData":true});

this["TPL"]["SCupdateDescription"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "\r\n<form class=\"form-horizontal updateSchoolForm\" role=\"form\" action=\"/api/school\" method=\"PUT\">\r\n	<!--controller에서 id를 가져오기 위해 추가된 From-->\r\n\r\n	<!--제목부분-->\r\n	<div class=\"form-group\">\r\n\r\n		<label for=\"fieldDescription\" class=\"col-sm-2 control-label\">소개글수정</label>\r\n		<div class=\"col-sm-4\">\r\n			<input type=\"text\" class=\"form-control\" required name=\"description\" id=\"fieldDescription\">\r\n		</div>\r\n	\r\n	</div>\r\n\r\n	<!--수정, 취소 버튼-->\r\n	<div class=\"form-group\">\r\n	\r\n		<div class=\"col-sm-offset-2 col-sm-1\">\r\n			<button type=\"submit\" class=\"btn btn-default\">수정</button>\r\n		</div>\r\n\r\n	</div>\r\n</form>\r\n<div class=\"col-sm-offset-2 col-sm-1\">\r\n	<button class=\"btn btn-default\" id=\"cancelUpdateDescription\">취소</button>\r\n</div>";
},"useData":true});