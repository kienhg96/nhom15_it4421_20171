const { Post } = require(`${r}/models`);
const getRequest = require(`${r}/utils/getRequest`);
const googleGeocode = require(`${r}/constants/values`).GOOGLE_GEO_CODE;
const key = process.env.GOOGLE_MAP_API_KEY;

module.exports = (req, res, next) => {
	const { _id, title, content, dead, injured, time, place } = req.body;
	Post.findById(_id, (err, post) => {
		if (err) {
			return next(err);
		}
		if (!post) {
			return res.json({
				data: post
			});
		}
		if (title) {
			post.title = title;
		}
		if (content) {
			post.content = content;
		}
		if (dead) {
			post.dead = dead;
		}
		if (injured) {
			post.injured = injured;
		}
		if (time) {
			post.time = new Date(time);
		}
		if (place) {
			getRequest(`${googleGeocode}?address=${encodeURIComponent(place)}&key=${key}&language=vi`)
			.then(response => {
				let lat = undefined;
				let lng = undefined;
				let city = undefined;
				if (response.status === "OK") {
					const results = response.results[0];
					const cityComponents = results.address_components.find(address => {
						return address.types.indexOf('administrative_area_level_1') !== -1;
					});
					if (cityComponents) {
						city = cityComponents.long_name;
					}
					lat = results.geometry.location.lat;
					lng = results.geometry.location.lng;
				} else {
					console.log(response);
				}
				post.place.latLng.lat = lat;
				post.place.latLng.lng = lng;
				post.place.city = city;
				post.place.raw = place;
				post.save(err => {
					if (err) {
						return next(err);
					}
					return res.json({
						data: post
					});
				});
			})
			.catch(next);
		} else {
			post.save(err => {
				if (err) {
					return next(err);
				}
				return res.json({
					data: post
				});
			});
		}
	})
}
