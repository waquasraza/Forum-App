const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = async (req, res, next) => {
	// extracting token from header
	let token;

	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith('Bearer')
	) {
		token = req.headers.authorization.split(' ')[1];
	}

	if (!token) {
		return res.status(400).json({
			success: false,
			err: 'Session expired, Please login',
		});
	}

	try {
		// decoding token
		const decode = jwt.verify(token, process.env.JWT_SECRET);

		// checking token exist
		if (!decode) {
			throw new Error(
				'something went wrong while verifying, Please try again!'
			);
		}

		// finding user
		let user = await User.findOne({ _id: decode.id });

		// setting user in request
		req.user = user;
		next();
	} catch (err) {
		res.status(400).json({ err: err.message });
	}
};

module.exports = auth;
