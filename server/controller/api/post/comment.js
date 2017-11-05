const { Post } = require(`${r}/models`);
const { POST_NOT_FOUND } = require(`${r}/constants/errorTypes`);

module.exports = (req, res, next) => {
	const { _id, comment } = req.body;
	const { user } = req;
	Post.findById(_id, (err, post) => {
		if (err) {
			return next(err);
		}
		if (!post) {
			return res.json({
				error: POST_NOT_FOUND
			});
		}
		post.comments.push({
			content: comment,
			user
		});
		post.save();
		return res.json({
			data: post.comments[post.comments.length - 1]
		});
	});
}
