const mongoose = require('mongoose');
const slugify = require('slugify');

const PageConfigSchema = new mongoose.Schema({
    author: {
        name: {type: String, default: 'KienVu'},
        ver: {type: String, default: 2.0},
    },
    hero:{
        title: {type: String},
        title_highline: {type: String},
        desc: {type: String},
        img_url: {type: String}
    }
})