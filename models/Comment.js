const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema(
	{
		content: {
			type: String,
			required: true,
		},
		author: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'User',
		},
		threads: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'Thread',
		},
	},
	{ timestamps: true }
);

const comment = mongoose.model('Comment', commentSchema);
module.exports = comment;
