const client = require(`${r}/configs/redisClient`);
const generateToken = require(`${r}/utils/generateToken`);
const { SESSION_TTL } = require(`${r}/constants/values`);

class Session {
	constructor(props) {
		this.values = props || { "_": "_" };
	}

	setItem(key, value) {
		this.values[key] = value;
		return this;
	}

	getItem(key) {
		return this.values[key];
	}

	removeItem(key) {
		delete this.values[key];
		return this;
	}

	_save(cb) {
		const vKeys = Object.keys(this.values);
		const args = vKeys.reduce((result, key) => {
			result.push(key, this.values[key]);
			return result;
		}, []);
		client.hmset(`session:${this.key}`, args, cb);
	}

	_delete(cb) {
		client.del(`session:${this.key}`, cb);
	}

	_setTTL(time, cb) {
		client.expire(`session:${this.key}`, time, cb);
	}

	_getTTL(cb) {
		client.ttl(`session:${this.key}`, cb);
	}

	ttl() {
		return new Promise((resolve, reject) => {
			this._getTTL((err, time) => {
				if (err) {
					return reject(err);
				}
				return resolve(time);
			});
		});
	}

	resetTTL(ttl = SESSION_TTL) {
		return new Promise((resolve, reject) => {
			this._setTTL(ttl, err => {
				if (err) {
					return reject(err);
				}
				return resolve(this);
			});
		});
	}

	_saveNew(cb) {
		this._delete(err => {
			if (err) {
				return cb(err);
			}
			this._save(err => {
				if (err) {
					return cb(err);
				}
				return cb();
			});
		});
	}

	_update(cb) {
		this._save(err => {
			if (err) {
				return cb(err);
			}
			return cb();
		});
	}

	save() {
		return new Promise((resolve, reject) => {
			if (this.key) {
				// Update
				this._saveNew(err => {
					if (err) {
						return reject(err);
					}
					return resolve(this);
				});
			} else {
				// Create new
				generateToken(32)
				.then(token => {
					this.key = token;
					this._update(err => {
						if (err) {
							return reject(err);
						}
						return resolve(this);
					});
				});
			}
		});
	}

	remove() {
		return new Promise((resolve, reject) => {
			this._delete(err => {
				if (err) {
					return reject(err);
				}
				return resolve(this);
			});
		});
	}

	clear() {
		this.values = { "_" : "_" };
		return this.save();
	}

	static findByKey(key) {
		return new Promise((resolve, reject) => {
			client.hgetall(`session:${key}`, (err, result) => {
				if (err) {
					return reject(err);
				}
				if (!result) {
					return resolve(null);
				}
				const session = new Session(result);
				session.key = key;
				return resolve(session);
			});
		});
	}
}

Session.TTL = SESSION_TTL;
module.exports = Session;
