import mongoose from 'mongoose';

const adminSchema = mongoose.Schema({
    username: String,
    password: String
});

module.exports = mongoose.model('Admin', adminSchema);