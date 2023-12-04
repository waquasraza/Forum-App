const express = require('express');
const router = express.Router();
const { login, register } = require('../controllers/auth');
const auth = require('../middlewares/auth');

router.post('/register', register);
router.get('/test', auth, (req, res) => {
	res.json({ msg: 'hello' });
});
router.post('/login', login);

module.exports = router;
