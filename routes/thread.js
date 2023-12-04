const express = require('express');
const router = express.Router();
const {
	createThread,
	getThreads,
	getThread,
	updateThread,
	deleteThread,
} = require('../controllers/thread');
const auth = require('../middlewares/auth');

// reroute for comment
const commentroute = require('./comment');
router.use('/:id/comments', commentroute);

// threads route
router.route('/').get(getThreads).post(auth, createThread);
router
	.route('/:id')
	.get(getThread)
	.patch(auth, updateThread)
	.delete(auth, deleteThread);

module.exports = router;
