var School = require('../models/school.js');
var Profile = require('../models/profile.js');
var Board = require('../models/board.js');
var User = require('../models/user.js');
var boardViewModel = require('../viewModels/board.js');
var profileViewModel = require('../viewModels/profile.js');
var userViewModel = require('../viewModels/user.js');
var schoolViewModel = require('../viewModels/school.js');

module.exports = function(){
	return {
		//관리자 페이지 렌더링. //생성된 유저, 프로필, 게시글을 최신순으로 50개를 보내 렌더링한다.
		adminPage: function(req, res, next){
			var sortOption = {updated_at:'-1'}; var limitNum = 50;
			//User 50개 최신순
			var p1 = new Promise(function(resolve, reject){
				User.find({}).sort(sortOption).limit(limitNum).populate('schools.school').exec(function(err,users){
					if(err) return reject(err);
					resolve(users);
				});
			});
			//Profile 50개 최신순
			var p2 = new Promise(function(resolve, reject){
				Profile.find({}).sort(sortOption).limit(limitNum).populate('schools.school').exec(function(err,profiles){
					if(err) return reject(err);
					resolve(profiles);
				});
			});
			//Board 50개 최신순
			var p3 = new Promise(function(resolve, reject){
				Board.find({}).sort(sortOption).limit(limitNum).populate('school').exec(function(err,boards){
					if(err) return reject(err);
					resolve(boards);
				});
			});
			Promise.all([p1, p2, p3]).then(function(rtnArr){
				res.render('admin/adminPage',{
					userList:rtnArr[0].map(userViewModel),
					profileList:rtnArr[1].map(profileViewModel),
					boardList:rtnArr[2].map(boardViewModel),
				});
			}).catch(function(err){
				return next(err);
			});
		},
		//관리자 게시글 생성 페이지 라우팅.
		adminNewBoard:function(req,res,next){
			School.findById(req.params.id, function(err,school){
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