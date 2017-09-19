const Session = require(`${r}/redisModels/Session`);

module.exports = (req, res, next) => {
	const { sid } = req.cookies;
	const newSess = () => {
		const sess = new Session();
		sess.save()
		.then(() => sess.resetTTL())
		.then(() => {
			res.cookie('sid', sess.key, { maxAge: Session.TTL * 1000 });
			req.sess = sess;
			next()
		})
		.catch(next);
	}

	const existSess = (sess) => {
		req.sess = sess;
		sess.resetTTL()
		.then(() => {
			res.cookie('sid', sess.key, { maxAge: Session.TTL * 1000 });
			next();
		})
		.catch(next);
	}

	if (sid) {
		Session.findByKey(sid)
		.then(sess => {
			if (sess) {
				existSess(sess);
			} else {
				newSess();
			}
		})
	} else {
		newSess();
	}
}
