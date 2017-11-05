const { NOT_LOGIN } = require(`${r}/constants/errorTypes`);

exports.admin = (req, res, next) => {
	if (!req.admin) {
		return res.json({
			error: NOT_LOGIN
		});
	}
	next();
}

exports.user = (req, res, next) => {
	if (!req.user) {
		return res.json({
			error: NOT_LOGIN
		});
	}
	next();
}
