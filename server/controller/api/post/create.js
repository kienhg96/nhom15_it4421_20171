const { Post } = require(`${r}/models`);
const getRequest = require(`${r}/utils/getRequest`);
const googleGeocode = require(`${r}/constants/values`).GOOGLE_GEO_CODE;
const key = process.env.GOOGLE_MAP_API_KEY;

module.exports = (req, res, next) => {
	const { title, content, dead, injured, time, place } = req.body;
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
		const post = new Post({
			title,
			content,
			dead,
			injured,
			time: new Date(time),
			place: {
				raw: place,
				latLng: {
					lat,
					lng
				},
				city
			}
		});
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
}
