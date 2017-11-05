const { Post } = require(`${r}/models`);
const pageSize = require(`${r}/constants/values`).PAGE_ITEM_COUNT;

module.exports = (req, res, next) => {
	const { q } = req.query;
	Post.count({
		$text: { $search: q }
	}).exec((err, count) => {
		if (err) {
			return next(err);
		}
		return res.json({
			data: { pageSize, count }
		});
	});
}
