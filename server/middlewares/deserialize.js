const { Admin, User } = require(`${r}/models`);

exports.admin = (req, res, next) => {
	const _id = req.sess.getItem('admin');
	if (!_id) {
		return next();
	}
	Admin.findById(_id, (err, admin) => {
		if (err) {
			return next(err);
		}
		req.admin = admin;
		next();
	});
}

exports.user = (req, res, next) => {
	const _id = req.sess.getItem('user');
	if (!_id) {
		return next();
	}
	User.findById(_id, (err, user) => {
		if (err) {
			return next(err);
		}
		req.user = user;
		next();
	});
}
