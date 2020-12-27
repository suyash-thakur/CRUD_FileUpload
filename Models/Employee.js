import mongoose from 'mongoose';

employeeSchema = mongoose.Schema({
    fileName: [{ type: mongoose.Schema.Types.ObjectId, ref: 'File' }]
});

module.exports = mongoose.model('Employee', employeeSchema);