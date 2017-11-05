// Path "/api"
const { Router } = require('express');
const post = require('./post');
const accident = require('./accident');
const admin = require('./admin');
const user = require('./user');
const router = Router();

router.use('/post', post);
router.use('/accident', accident);
router.use('/admin', admin);
router.use('/user', user);

module.exports = router;
