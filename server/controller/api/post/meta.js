const { Post } = require(`${r}/models`);
const pageSize = require(`${r}/constants/values`).PAGE_ITEM_COUNT;

module.exports = (req, res, next) => {
	Post.count({}, (err, count) => {
		if (err) {
			return next(err);
		}
		return res.json({
			data: { pageSize, count }
		});
	});
}
