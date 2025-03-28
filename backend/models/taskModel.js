const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    title: String,
    description: String,
    dueDate: Date,
    priority: { type: String, enum: ['Low', 'Medium', 'High'] },
    //category: String,
    status: { type: String, enum: ['Incomplete', 'Completed'], default: 'Incomplete' },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Task', TaskSchema);
