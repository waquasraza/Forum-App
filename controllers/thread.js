const Thread = require('../models/Thread');

// @desc    Get all threads
// @route   GET /api/v1/threads
// @access  Public
exports.getThreads = async (req, res, next) => {
	try {
		const threads = await Thread.find({});

		if (!threads) {
			throw new Error('No threads found');
		}

		res.status(200).json({ success: true, count: threads.length, threads });
	} catch (err) {
		res.status(400).json({ err: err.message });
	}
};

// @desc    Get specific thread
// @route   GET /api/v1/threads/:id
// @access  Public
exports.getThread = async (req, res, next) => {
	try {
		const thread = await Thread.findById(req.params.id);

		if (!thread) {
			throw new Error(`No threads found for this id: ${req.params.id}`);
		}

		res.json({
			success: true,
			thread,
		});
	} catch (err) {
		res.status(400).json({ success: false, err: err.message });
	}
};

// @desc    Create new thread
// @route   POST /api/v1/threads/
// @access  Private
exports.createThread = async (req, res, next) => {
	const { title, content } = req.body;
	const author = req.user.id;

	try {
		const thread = await Thread.create({ title, content, author });
		res.status(200).json({
			success: true,
			msg: 'Thread added',
		});
	} catch (err) {
		res.status(500).json({ success: flase, err: err.message });
	}
};

// @desc    Update thread
// @route   PATCH /api/v1/threads/:id
// @access  Private
exports.updateThread = async (req, res, next) => {
	try {
		let thread = await Thread.findById(req.params.id);

		if (!thread) {
			throw new Error(`No threads found for this id: ${req.params.id}`);
		}

		thread = await Thread.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
			runValidators: true,
		});

		res.json({
			success: true,
			thread,
		});
	} catch (err) {
		res.status(400).json({ success: false, err: err.message });
	}
};

// @desc    Delete thread
// @route   DELETE /api/v1/threads/:id
// @access  Private
exports.deleteThread = async (req, res, next) => {
	try {
		let thread = await Thread.findById(req.params.id);

		if (!thread) {
			throw new Error(`No threads found for this id: ${req.params.id}`);
		}

		thread = await Thread.findByIdAndDelete(req.params.id);

		res.json({
			success: true,
			data: {},
		});
	} catch (err) {
		res.status(400).json({ success: false, err: err.message });
	}
};
