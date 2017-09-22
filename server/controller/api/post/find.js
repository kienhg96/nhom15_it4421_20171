const Post = require(`${r}/models/Post`);
const { PAGE_ITEM_COUNT } = require(`${r}/constants/values`);

module.exports = (req, res, next) => {
	const { _id } = req.query;
	let page = req.query.page ? parseInt(req.query.page, 10) : 1;
	if (page < 1) {
		page = 1;
	}
	if (_id) {
		Post.findById(_id, (err, post) => {
			if (err) {
				return next(err);
			}
			return res.json({
				data: post
			});
		});
	} else {
		Post.find({}, { content: 0 })
			.skip(PAGE_ITEM_COUNT * (page - 1))
			.limit(PAGE_ITEM_COUNT)
			.sort({
				time: 'desc'
			})
			.exec((err, posts) => {
				if (err) {
					return next(err);
				}
				return res.json({
					data: posts
				});
			});
	}
}
