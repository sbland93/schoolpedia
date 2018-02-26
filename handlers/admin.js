var passport = require('passport');
var userViewModel = require('../viewModels/user.js');
var boardViewModel = require('../viewModels/board.js');
var profileViewModel = require('../viewModels/profile.js');
var credentials = require('../credentials.js');
var School = require('../models/school.js');
var Profile = require('../models/profile.js');
var Board = require('../models/board.js');
var User = require('../models/user.js');
var schoolViewModel = require('../viewModels/school.js');

module.exports = function(){
	return {
		//관리자 페이지 렌더링.
		adminPage:function(req,res,next){
			User.find({}).sort({updated_at:'-1'}).limit(50).populate('schools.school').exec(function(err,user){
				Profile.find({}).sort({updated_at:'-1'}).limit(50).populate('schools.school').exec(function(err,profile){
					if(err) next(err);
					else{
						Board.find({}).sort({updated_at:'-1'}).limit(50).populate('school').exec(function(err,board){
							if(err) next(err);
							res.render('admin/adminPage',{
								boardList:board.map(boardViewModel),
								profileList:profile.map(profileViewModel),
								userList:user.map(userViewModel),
							});
						});
					}
				});
			});
		},
		//관리자 게시글 생성 페이지 라우팅.
		adminNewBoard:function(req,res,next){
			School.findById(req.params.id,function(err,school){
				if(err) next(err);
				if(!school){
					res.locals.message404 = '해당학교 페이지는 존재하지 않아요ㅠㅠ';
					return next();
				}
				res.render('admin/adminNewBoard', {
					schoolInfo: schoolViewModel(school),
					pageTestScript: '/qa/tests-newBoard.js'
				});
			});
			
		},
	}
}