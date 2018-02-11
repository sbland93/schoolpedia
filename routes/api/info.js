var Info = require("../../models/info.js");
var infoViewModel = require('../../viewModels/info.js');
module.exports = function(app){
	app.get("/api/info",function(req,res,next){
		Info.find(req.query).exec(function(err,infos){
			if (err) next(err);
			res.json(infos.map(infoViewModel));
		})
	});

	app.get("/api/info/:id",function(req,res,next){
		if (!req.body.id) next("No id");
		Info.findBy({_id:req.body.id}).then(function(err,info){
			if (err) console.error(err);
			if (info){
				res.json({
					success:true,
					id:info._id,
					title:info.title,
					content:info.content,
				});
			}
		});
	});
	//공지사항 추가시
	app.post("/api/info",function(req,res,next){
		if(req.body.title && req.body.content){
			Info.create(req.body, function(err, info){
				if(err) return next(err);
				res.json({
					success:true,
					id:info._id,
					title:info.title,
					content:info.content,
				})
			});
		}
	});
	//공지사항 수정
	app.put("/api/info/:id",function(req,res,next){
		if (!req.params.id) return next("No id");
		Info.update({_id:req.params.id}, req.body, function(err,response){
			if (err) console.error(err);
			if(response.nModified === 1){
				res.json({
					success:true,
					id:req.params.id,
				});
			}else{
				res.json({
					success:false,
					message:'',
				});
			}
 		});
	});

	app.delete("/api/info/:id",function(req,res,next){
		if (!req.params.id) return next("No id");
		Info.remove({_if:req.params.id},function(err){
			if (err) return next(err);
			res.json({
				success:true,
			})
		})
	})

}