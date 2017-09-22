// Path "/api"
const { Router } = require('express');
const post = require('./post');
const accident = require('./accident');
const router = Router();

router.use('/post', post);
router.use('/accident', accident);

module.exports = router;
