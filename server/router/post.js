// Path "/api/post"
const { Router } = require('express');
const { post: val } = require(`${r}/validations`);
const post = require(`${r}/controller/api/post`);
const de = require(`${r}/middlewares/deserialize`);
const per = require(`${r}/middlewares/permission`);

const router = Router();
router.route('/')
	.get(val.find, post.find)
	.post(de.admin, per.admin, val.create, post.create)
	.delete(de.admin, per.admin, val.delete, post.delete)
	.put(de.admin, per.admin, val.update, post.update);

router.get('/meta', post.meta);
router.post('/comment', de.user, per.user, post.comment);
router.get('/searchMeta', val.searchMeta, post.searchMeta);
router.get('/search', val.search, post.search);

module.exports = router;
