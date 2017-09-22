const {
	isNumber,
	isString,
	isArray,
	isObjectId,
	isDate
} = require(`${r}/utils/checkTypes`);
const { INVALID_ARGUMENTS } = require(`${r}/constants/errorTypes`);
const V_STRING = 'string';
const V_NUMBER = 'number';
const V_ARRAY = 'array';
const V_OBJECTID = 'objectId';
const V_DATE = 'date';

const singleValidator = (obj, {param, type}) => {
	const field = obj[param];
	switch (type) {
		case V_STRING:
			return isString(field) && field !== "";
		case V_NUMBER:
			return isNumber(field);
		case V_ARRAY:
			return isArray(field);
		case V_OBJECTID:
			return isObjectId(field);
		case V_DATE:
			return isDate(field);
		default:
			return false;
	}
}

// kind = body | query | params
const validator = (validations, kind = 'body') => {
	if (typeof validations === 'function') {
		return validations;
	}
	return (req, res, next) => {
		const obj = req[kind];
		if (isArray(validations)) {
			for (let i = 0; i < validations.length; i++) {
				if (!singleValidator(obj, validations[i])) {
					return res.json({
						error: INVALID_ARGUMENTS,
						msg: validations[i].message
					});
				}
			}
		} else if (!singleValidator(obj, validations)) {
			return res.json({
				error: INVALID_ARGUMENTS,
				msg: validations.message
			});
		}
		return next();
	}
}

exports = module.exports = validator;
exports.V_STRING = V_STRING;
exports.V_NUMBER = V_NUMBER;
exports.V_ARRAY = V_ARRAY;
exports.V_OBJECTID = V_OBJECTID;
exports.V_DATE = V_DATE;