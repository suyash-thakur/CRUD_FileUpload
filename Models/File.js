var mongoose = require('mongoose');

fileSchema = mongoose.Schema({
    name: String,
    URL: String
});

module.exports = mongoose.model('File', fileSchema);