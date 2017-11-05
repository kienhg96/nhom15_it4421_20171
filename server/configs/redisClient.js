const redis = require('redis');
const uri = process.env.REDIS_URI || "redis://127.0.0.1:6379/0";
const client = redis.createClient(uri);

client.on('error', (err) => {
	console.error(err);
});

client.on('connect', (connect) => {
	console.log('[i] Redis client connected to redis');
	client.select(3, () => {
		console.log('[R] Connected to database 3');
	})
});

module.exports = client;
