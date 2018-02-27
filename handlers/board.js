var School = require('../models/school.js');
var Board = require('../models/board.js');
var schoolViewModel = require('../viewModels/school.js');
var boardViewModel = require('../viewModels/board.js');


module.exports = function(){
	return {
		//board 페이지 라우팅
		board: function(req, res, next){
			Board.findById(req.params.id).populate('replies.user').populate('school')
			.exec(function(err, board){
				if(err) next(err);
				if(!board){
					res.locals.message404 = "해당학교 글은 존재하지 않아요ㅠㅠ";
					return next();
				}
				res.render('board/board', {
					board : boardViewModel(board),
					pageTestScript: '/qa/tests-board.js'
				});
			});
		},

		//School활용을 위해!
		//rendering Create Board Form
		newBoard: function(req, res, next){
			School.findById(req.params.id, function(err, school){
				if(err) next(err);
				if(!school){
					res.locals.message404 = '해당학교 페이지는 존재하지 않아요ㅠㅠ';
					return next();
				}
				res.render('board/newBoard', {
					schoolInfo: schoolViewModel(school),
					pageTestScript: '/qa/tests-newBoard.js'
				});
			});
		},

		//rendering update Board Form
		//DOLATER 404보여주고 리다이렉트 시키기.
		updateBoard: function(req, res, next){
			Board.findById(req.params.id)
				.populate('school')
				.exec(function(err, board){
				if(err) next(err);
				if(!board){
					res.locals.message404 = '잘못된 경로이거나, 수정하려는 그 글은 없어졌거나 이동했어요ㅠㅠ';
					return next();
				}
				res.render('board/updateBoard', {
					board: boardViewModel(board),		
					pageTestScript: '/qa/tests-updateBoard.js'
				});
			});
		},

		//fields("school, fields, q")
		//"school" => 'all', 'only' / "fields" => 'title', 'content', 'all'
		//"q" => searchString
		//DOLATER 'content'
		searchBoards: function(req, res, next){
			var query = req.query
			var stringQ = query.q;
			var data, queryObject;

			if(query.fields === "title"){

				data = {"title" : new RegExp(stringQ)};
			
			}else if(query.fields === "all"){
			
				data = {$or: [{"title" : new RegExp(stringQ)}, {"content" : new RegExp(stringQ)}]};
			
			}
			console.log("data", data);

			if(query.school === "only"){

				queryObject = {$and : [{"school" : query.schoolId}, data]}

			}else if(query.school === "all"){

				queryObject = data;

			}

			console.log("queryObject", queryObject);

			//DOLATER !School
			var schoolPromise = new Promise(function(resolve, reject){
					School.findById(query.schoolId, function(err, school){
						if(err) reject(err);
						resolve(school);
					});
				});

			var boardPromise = new Promise(function(resolve, reject){
				Board.find(queryObject, function(err, boards){
					if(err) reject(err);
					resolve(boards);
				});
			});

			//DOLATER !school
			Promise.all([schoolPromise, boardPromise]).then(function(rtnArr){
				var schoolDoc = rtnArr[0];
				var boards = rtnArr[1];
				if(!schoolDoc){
					res.locals.message404 = '해당학교 페이지는 존재하지 않아요ㅠㅠ';
					return next();
				}
				if(!boards.length){
					var context = {
						empty: true,
						schoolInfo : schoolViewModel(schoolDoc), 
					}
				}else{
					var context = {
						boardList : boards.map(boardViewModel),
						schoolInfo : schoolViewModel(schoolDoc), 
					};
				}
				res.render('board/searchedBoards', context);
			}).catch(function(err){
				next(err);
			});

		},
	}
}


		

		