const bcrypt = require('bcrypt-nodejs')

// Hash password
exports.hash = password => {
	return new Promise((resolve, reject) => {
		bcrypt.hash(password, null, null, (err, hPassword) => {
			if (err) {
				return reject(err);
			}
			return resolve(hPassword);
		});
	});
}

exports.compare = (password, hPassword) => {
	return new Promise((resolve, reject) => {
		bcrypt.compare(password, hPassword, (err, res) => {
			if (err) {
				console.error(err);
				return reject(err);
			}
			return resolve(res);
		});
	});
}
