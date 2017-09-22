const { Post } = require(`${r}/models`);

module.exports = (req, res, next) => {
	const { _id } = req.body;
	Post.findByIdAndRemove(_id, (err, post) => {
		if (err) {
			return next(err);
		}
		return res.json({
			data: post
		});
	});
}
