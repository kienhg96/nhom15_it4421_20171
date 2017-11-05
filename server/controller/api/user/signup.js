const { User } = require(`${r}/models`);
const { hash } = require(`${r}/utils/password`);

module.exports = (req, res, next) => {
	const { 
		username, password, ngaySinh, 
		email, firstName, lastName, address 
	} = req.body;
	User.findOne({ username }, (err, user) => {
		if (err) {
			return next(err);
		}
		if (user) {
			return res.json({
				error: USER_EXISTS
			});
		}
		hash(password)
		.then(result => {
			const user = new User({
				username,
				password: result,
				ngaySinh: ngaySinh ? new Date(ngaySinh) : null,
				email,
				firstName,
				lastName,
				address
			});
			user.save(err => {
				if (err) {
					return next(err);
				}
				req.sess.setItem('user', user._id.toString()).save()
				.then(() => {
					return res.json({
						data: user
					});
				})
				.catch(next);
			})
		})
		.catch(next);
	})
}
