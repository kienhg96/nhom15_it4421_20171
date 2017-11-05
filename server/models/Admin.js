const mongoose = require(`${r}/configs/mongoose`);
const { Schema } = mongoose;

const AdminSchema = Schema({
	username: String,
	password: String,
	ngaySinh: Date,
	email: String,
	firstName: String,
	lastName: String,
	address: String
});

module.exports = mongoose.model('Admin', AdminSchema);
