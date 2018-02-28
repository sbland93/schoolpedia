var Info = require("../../models/info.js");
var infoViewModel = require('../../viewModels/info.js');

module.exports = function(){
	return {
		//모든 공지사항 가져온다.
		getInfos: function(req, res, next){
			Info.find(req.query).exec(function(err,infos){
				if (err) return next(err);
				res.json(infos.map(infoViewModel));
			})
		},
		//id에 해당하는 공지사항 가져온다.
		getInfo: function(req, res, next){
			if (!req.params.id) next("No id");
			Info.findById({_id:req.params.id}).then(function(err,info){
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
		},
		//공지사항을 생성한다.
		newInfo: function(req, res, next){
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
		},
		//공지사항을 수정한다.
		updateInfo: function(req, res, next){
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
		},
		//공지사항을 삭제한다.
		deleteInfo: function(req, res, next){
			if (!req.params.id) return next("No id");
			Info.remove({_id:req.params.id},function(err){
				if (err) return next(err);
				res.json({
					success:true,
				})
			})
		},
	}
}