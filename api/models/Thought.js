const mongoose = require('mongoose');

const thoughtSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
        min: 1,
        max: 255
    },
    name: {
        type: String,
        required: true,
        min: 1,
        max: 255
    },
    user_id: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model('Thought', thoughtSchema);