const mongoose = require(`${r}/configs/mongoose`);
const { Schema } = mongoose;

const PostSchema = Schema({
	title: String,
	content: String,
	dead: Number,
	injured: Number,
	time: Date,
	place: {
		raw: String,
		latLng: {
			lat: Number,
			lng: Number
		},
		city: String
	}
});

module.exports = mongoose.model('Post', PostSchema);
