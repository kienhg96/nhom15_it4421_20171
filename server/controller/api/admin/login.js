const Admin = require(`${r}/models/Admin`);
const { ADMIN_NOT_FOUND, PASSWORD_MISMATCH } = require(`${r}/constants/errorTypes`);
const { compare } = require(`${r}/utils/password`);

module.exports = (req, res, next) => {
	const { username, password } = req.body;
	Admin.findOne({ username }, (err, admin) => {
		if (err) {
			return next(err);
		}
		if (!admin) {
			return res.json({
				error: ADMIN_NOT_FOUND
			});
		}
		compare(password, admin.password)
		.then(result => {
			if (!result) {
				res.json({
					error: PASSWORD_MISMATCH
				});
				throw null;
			}
			return req.sess.setItem('admin', admin._id.toString()).save();
		})
		.then(() => {
			return res.json({
				data: admin
			});
		})
		.catch(next);
	});
}
