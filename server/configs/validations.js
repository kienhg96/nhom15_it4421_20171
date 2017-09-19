const validator = require(`${r}/middlewares/validator`);
const v = (param, type) => ({ param, type, message: `Missing or invalid ${param}` });
