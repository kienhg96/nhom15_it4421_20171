const v = require('./v');
const validator = require(`${r}/middlewares/validator`);
const { isObjectId, isNumber, isDate } = require(`${r}/utils/checkTypes`);
const {
	V_STRING,
	V_NUMBER,
	V_ARRAY,
	V_OBJECTID,
	V_DATE
} = validator;
const { INVALID_ARGUMENTS } = require(`${r}/constants/errorTypes`);
exports.create = validator([
	v('title', V_STRING),
	v('content', V_STRING),
	v('dead', V_NUMBER),
	v('injured', V_NUMBER),
	v('time', V_DATE),
	v('place', V_STRING)
]);

exports.find = (req, res, next) => {
	const { _id, page } = req.query;
	if (_id && !isObjectId(_id)) {
		return res.json({
			error: INVALID_ARGUMENTS,
			msg: 'Invalid _id'
		});
	}
	if (page && !isNumber(page)) {
		return res.json({
			error: INVALID_ARGUMENTS,
			msg: 'Invalid page'
		});
	}
	return next();
}

exports.delete = validator([
	v('_id', 'objectId')
]);

exports.update = (req, res, next) => {
	const { _id, dead, injured, time } = req.body;
	if (!_id || !isObjectId(_id)) {
		return res.json({
			error: INVALID_ARGUMENTS,
			msg: 'Missing or Invalid _id'
		});
	}
	if (dead && !isNumber(dead)) {
		return res.json({
			error: INVALID_ARGUMENTS,
			msg: 'Invalid dead'
		});
	}
	if (injured && !isNumber(injured)) {
		return res.json({
			error: INVALID_ARGUMENTS,
			msg: 'Invalid injured'
		});
	}
	if (time && !isDate(time)) {
		return res.json({
			error: INVALID_ARGUMENTS,
			msg: 'Invalid time'
		});
	}
	return next();
}
