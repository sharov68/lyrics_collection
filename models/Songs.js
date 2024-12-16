const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		unique: true
	},
	text: {
		type: String,
		required: true
	},
	_idband: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: "Bands"
	},
	createdAt: {
		type: Date,
		default: Date.now
	}
});

module.exports = mongoose.model('Songs', itemSchema);
