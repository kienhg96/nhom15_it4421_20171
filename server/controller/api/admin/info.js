module.exports = (req, res, next) => {
	return res.json({
		data: req.admin
	});
}
