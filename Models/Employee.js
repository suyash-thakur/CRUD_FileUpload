var mongoose = require('mongoose');

employeeSchema = mongoose.Schema({
    _id: String,
    fileName: [{ type: mongoose.Schema.Types.ObjectId, ref: 'File', unique: true }]
});

module.exports = mongoose.model('Employee', employeeSchema);