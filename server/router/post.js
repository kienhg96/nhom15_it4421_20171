// Path "/api/post"
const { Router } = require('express');
const { post: val } = require(`${r}/validations`);
const post = require(`${r}/controller/api/post`);

const router = Router();
router.route('/')
	.get(val.find, post.find)
	.post(val.create, post.create)
	.delete(val.delete, post.delete)
	.put(val.update, post.update);

router.get('/meta', post.meta);

module.exports = router;
