// Path "/api/admin"

const { Router } = require('express');
const { admin: val } = require(`${r}/validations`);
const de = require(`${r}/middlewares/deserialize`);
const per = require(`${r}/middlewares/permission`);
const admin = require(`${r}/controller/api/admin`);

const router = Router();
router.post('/login', val.login, admin.login);
router.get('/logout', admin.logout);
router.get('/info', de.admin, per.admin, admin.info);

module.exports = router;
