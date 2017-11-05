const mongoose = require(`${r}/configs/mongoose`);
const { Schema } = mongoose;

const PostSchema = Schema({
	title: String,
	description: String,
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
	},
	comments: [{
		content: String,
		user: {
			type: Schema.Types.ObjectId,
			ref: 'User'
		}
	}]
});

PostSchema.index({
	title: 'text',
	description: 'text',
	content: 'text',
	'place.raw': 'text',
});

module.exports = mongoose.model('Post', PostSchema);
