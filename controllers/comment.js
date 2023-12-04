const Comment = require('../models/Comment');
const Thread = require('../models/Thread');

// @desc    Add comment on specific thread
// @route   POST /api/v1/threads/:id/comments/create
// @acess   Private
exports.createComment = async (req, res, next) => {
	const { content } = req.body;
	const threadId = req.params.id;
	const userId = req.user.id;

	try {
		// check: if content not exists
		if (!content) {
			throw new Error('Write something to comment');
		}

		// check: find thread in db
		const thread = await Thread.findOne({ _id: threadId });

		// check: if thread not found
		if (!thread) {
			throw new Error('Thread not found');
		}

		// create comment
		const comment = await Comment.create({
			content,
			author: userId,
			threads: threadId,
		});

		// update thread
		await Thread.findByIdAndUpdate(
			{ _id: threadId },
			{ $push: { comment: comment._id } }
		);

		// send success response
		res.status(200).json({ success: true, comment });
	} catch (err) {
		res.status(400).json({ err: err.message });
	}
};

// @desc    Get all comments for specific thread
// @route   GET /api/v1/threads/:id/comments/
// @acess   Public
exports.getComments = async (req, res, next) => {
	try {
		const comments = await Comment.find({ threads: req.params.id });

		if (!comments) {
			throw new Error(`comments not found on thred:  ${req.params.id}`);
		}

		res.json({ success: true, count: comments.length, comments });
	} catch (err) {
		res.status(400).json({ err: err.message });
	}
};
