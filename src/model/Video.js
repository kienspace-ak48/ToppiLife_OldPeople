const mongoose = require('mongoose');
const sluify = require('slugify');

const VideoScheme = new mongoose.Schema({
    name: String,
    path: String
}, { timestamps: true });

module.exports = mongoose.model('Video', VideoScheme);