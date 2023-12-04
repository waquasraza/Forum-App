const express = require('express');
const router = express.Router({ mergeParams: true });
const auth = require('../middlewares/auth');
const { createComment, getComments } = require('../controllers/comment');

router.post('/create', auth, createComment);
router.get('/', getComments);

module.exports = router;
