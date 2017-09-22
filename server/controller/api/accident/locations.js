const { Post } = require(`${r}/models`);

module.exports = (req, res, next) => {
	Post.aggregate([{
		$match: {
			"place.latLng": {
				$ne: null
			}
		}
	}, {
		$project: {
			lat: "$place.latLng.lat",
			lng: "$place.latLng.lng"
		}
	}], (err, positions) => {
		if (err) {
			return next(err);
		}
		return res.json({
			data: positions
		});
	});
}
