const mongoose = require(`${r}/configs/mongoose`);
const { Schema } = mongoose;

const UserSchema = Schema({
	username: String,
	password: String,
	ngaySinh: Date,
	email: String,
	firstName: String,
	lastName: String,
	address: String
});

module.exports = mongoose.model('User', UserSchema);
