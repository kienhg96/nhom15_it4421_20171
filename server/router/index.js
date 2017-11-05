// Root path "/"
const express = require('express');
const api = require('./api');
const path = require('path');

const router = express.Router();
const buildFolder = path.join(r, '../client/build');
router.use('/api', api);
router.use('/static', express.static(path.join(buildFolder, 'static')));

router.get('*', (req, res, next) => {
	res.sendFile(path.join(buildFolder, 'index.html'), err => {
		if (err) {
			return next(err);
		}
	});
});

module.exports = router;
