// Path "/api/admin"

const { Router } = require('express');
const { user: val } = require(`${r}/validations`);
const de = require(`${r}/middlewares/deserialize`);
const per = require(`${r}/middlewares/permission`);
const user = require(`${r}/controller/api/user`);

const router = Router();
router.post('/login', val.login, user.login);
router.post('/signup', val.signup, user.signup);
router.get('/logout', user.logout);
router.get('/info', de.user, per.user, user.info);

module.exports = router;
