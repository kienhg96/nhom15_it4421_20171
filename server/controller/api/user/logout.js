module.exports = (req, res, next) => {
	req.sess.clear()
	.then(() => {
		return res.json({
			data: 'LOGGED_OUT'
		})
	})
	.catch(next);
}
