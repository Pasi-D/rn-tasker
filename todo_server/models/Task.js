var mongoose = require('mongoose');

var TaskSchema = new mongoose.Schema({
    title: {
        type: String
    },
    description: {
        type: String
    },
    start_date: { type: Date, default: Date.now },
    end_date: {
        type: Date
    },
    status: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('Task', TaskSchema)