const path = require('path');
require('dotenv').load();
global.r = path.join(__dirname, '../');
const server = require(`${r}/configs/server`);

const port = process.env.PORT || 8080;
server.listen(port, () => {
	console.log(`[i] Server is listening on port ${port}`);
});
