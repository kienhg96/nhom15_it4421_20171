const {
	isNumber,
	isString,
	isArray,
	isObjectId
} = require(`${r}/utils/checkTypes`);

const singleValidator = (obj, {param, type}) => {
	switch (type) {
		case 'string':
			return isString(obj[param]) && obj[param] !== "";
		case 'number':
			return isNumber(obj[param]);
		case 'array':
			return isArray(obj[param]);
		case 'objectId':
			return isObjectId(obj[param]);
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
						error: validations[i].message
					});
				}
			}
		} else if (!singleValidator(obj, validations)) {
			return res.json({
				error: validations.message
			});
		}
		return next();
	}
}

module.exports = validator;
