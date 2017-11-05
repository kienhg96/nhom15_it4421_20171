const { Post } = require(`${r}/models`);
const { PAGE_ITEM_COUNT } = require(`${r}/constants/values`);

module.exports = (req, res, next) => {
	const { q } = req.query;
	let page = req.query.page ? parseInt(req.query.page, 10) : 1;
	if (page < 1) {
		page = 1;
	}
	Post.find({ $text: { $search: q } }, { score : { $meta: "textScore" }})
	.skip(PAGE_ITEM_COUNT * (page - 1))
	.limit(PAGE_ITEM_COUNT)
	.exec((err, posts) => {
		if (err) {
			return next(err);
		}
		return res.json({
			data: posts
		});
	});
}
