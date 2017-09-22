const { Post } = require(`${r}/models`);

module.exports = (req, res, next) => {
	Post.aggregate([{
		$match: {
			"place.city": {
				$ne: null
			}
		}
	}, {
		$group: {
			_id: "$place.city",
			dead: {
				$sum: "$dead"
			},
			injured: {
				$sum: "$injured"
			}
		}
	}], (err, result) => {
		if (err) {
			return next(err);
		}
		return res.json({
			data: result
		});
	});
}
