const v = require('./v');
const validator = require(`${r}/middlewares/validator`);
const {
	V_STRING,
} = validator;

exports.login = validator([
	v('username', V_STRING),
	v('password', V_STRING)
]);

exports.signup = validator([
	v('username', V_STRING),
	v('password', V_STRING)
]);
