const mongoose = require('mongoose');

exports.isNumber = number => !isNaN(number);
exports.isString = str => typeof str === 'string';
exports.isArray = arr => Array.isArray(arr);
exports.isObjectId = mongoose.Types.ObjectId.isValid;
