const http = require('http');
const https = require('https');
const url = require('url');

const request = (location) => new Promise((resolve, reject) => {
	const parsedLocation = url.parse(location);
	const protocol = parsedLocation.protocol === 'https:' ? https : http;
	const req = protocol.request({
		host: parsedLocation.host,
		port: parsedLocation.protocol === 'https:' ? 443 : 80,
		path: parsedLocation.path,
		method: 'GET'
	}, res => {
		const chunks = [];
		res.on('data', chunk => {
			chunks.push(chunk);
		});
		res.on('end', () => {
			const body = Buffer.concat(chunks).toString();
			try {
				return resolve(JSON.parse(body));
			} catch (err) {
				return reject(err);
			};
		});
	});
	
	req.on('error', err => {
		return reject(err);
	});

	req.end();
});

module.exports = request;
