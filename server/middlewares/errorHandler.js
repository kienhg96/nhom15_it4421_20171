module.exports = (err, req, res, next) => {
	console.error(err);
	return res.json({
		error: 'INTERNAL_ERROR' 
	});
};
