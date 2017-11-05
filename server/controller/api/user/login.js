const { User } = require(`${r}/models`);
const { USER_NOT_FOUND, PASSWORD_MISMATCH } = require(`${r}/constants/errorTypes`);
const { compare } = require(`${r}/utils/password`);

module.exports = (req, res, next) => {
	const { username, password } = req.body;
	User.findOne({ username }, (err, user) => {
		if (err) {
			return next(err);
		}
		if (!user) {
			return res.json({
				error: USER_NOT_FOUND
			});
		}
		compare(password, user.password)
		.then(result => {
			if (!result) {
				res.json({
					error: PASSWORD_MISMATCH
				});
				throw null;
			}
			return req.sess.setItem('user', user._id.toString()).save();
		})
		.then(() => {
			return res.json({
				data: user
			});
		})
		.catch(next);
	});
}
