const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// @desc    Register user
// @route   POST /api/v1/auth/register
// @access  Public
exports.register = async (req, res, next) => {
	const { name, email, password } = req.body;

	try {
		let user = await User.findOne({ email });

		if (user) {
			throw new Error('User already exists');
		}

		user = await new User({ name, email, password });
		await user.save();

		res.status(200).json({ success: true, user });
	} catch (err) {
		res.status(400).json({ success: false, err: err.message });
	}
};

// @desc    Login user
// @route   POST /api/v1/auth/login
// @access  Public
exports.login = async (req, res, next) => {
	const { email, password } = req.body;

	try {
		let user = await User.findOne({ email });

		if (!user) {
			throw new Error('Invalid Credentials');
		}

		const isMatch = await bcrypt.compare(password, user.password);

		if (!isMatch) {
			throw new Error('Invalid Credentials');
		}

		const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
			expiresIn: '1h',
		});

		res.status(200).json({ success: true, msg: 'user loggedin', token });
	} catch (err) {
		res.status(400).json({ success: false, err: err.message });
	}
};
