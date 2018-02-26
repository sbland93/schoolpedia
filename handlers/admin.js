var passport = require('passport');
var userViewModel = require('../viewModels/user.js');
var boardViewModel = require('../viewModels/board.js');
var profileViewModel = require('../viewModels/profile.js');
var credentials = require('../credentials.js');
var School = require('../models/school.js');
var Profile = require('../models/profile.js');
var Board = require('../models/board.js');
var User = require('../models/user.js');

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
							res.render('adminPage',{
								boardList:board.map(boardViewModel),
								profileList:profile.map(profileViewModel),
								userList:user.map(userViewModel),
							});
						});
					}
				});
			});
		},
	}
}