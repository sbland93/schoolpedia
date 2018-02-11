var Info = require('../../models/info.js');
var authHandlers = require('../../handlers/auth.js')();
var infoViewModel = require('../../viewModels/info.js');


module.exports = function(app){

	//Info전체를 내보낸다.
	app.get('/info', function(req, res, next){
		Info.find()
			.exec(function(err, infos){
				if(err) return next(err);
				res.render("infoHome", { infoList: infos.map(infoViewModel) });
			});
	});

	// title과 content가 있는지 확인하고, 글을 생성한후 공지사항 페이지로 이동시킨다.
	app.post('/info', authHandlers.isAdmin, function(req, res, next){
		if(req.body.title && req.body.content){
			Info.create(req.body, function(err, info){
				if(err) return next(err);
				res.redirect("/info");
			});
		}else{
			//TODO
		}
	})
	//공지사항 등록 페이지로 이동
	app.get('/info/new', authHandlers.isAdmin,function(req,res,next){
		res.render("newInfo");
	})


	//해당 id의 info를 가져온다.
	app.get('/info/:id', authHandlers.isAdmin, function(req, res, next){
		if(!req.params.id) return next('No Id');
		Info.findById({_id: req.params.id}).populate('schools.school').exec(function(err, info){
			if(err) return next(err);
			return res.render("info", infoViewModel(info));
		});
	});


	//id에 해당하는 info를 삭제한다.
	app.get('/info/:id/delete', authHandlers.isAdmin, function(req, res, next){
		if(!req.params.id) return next('No Id');
		Info.remove({_id: req.params.id}, function(err){
			if(err) return next(err);
			return res.redirect("/info");
		})
	});


	//id에 해당하는 info를 요청본문을 토대로 업데이트한다.
	app.put('/info/:id', authHandlers.isAdmin, function(req, res, next){
		if(!req.params.id) return next('No Id');

		//DOLATER - 업데이트 메커니즘 적용 및 업데이트 검증.
		Info.update({_id: req.params.id}, req.body, function(err, response){
			if(err) return next(err);
			if(response.nModified === 1){
				res.redirect("/info/"+req.params.id);
			} else {
				//TODO
			}
		});
	});


}