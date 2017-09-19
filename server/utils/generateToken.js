const crypto = require('crypto');

module.exports = (length = 48) => new Promise((resolve, reject) => {
	crypto.randomBytes(length, (err, buf) => {
		if (err) {
			return reject(err);
		}
		return resolve(buf.toString('hex'));
	});
});
