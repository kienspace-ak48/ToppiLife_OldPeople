const mongoose = require('mongoose');
const slugify = require('slugify');

const PageConfigSchema = new mongoose.Schema(
    {
        author: {
            name: { type: String, default: 'KienVu' },
            ver: { type: String, default: 2.0 },
        },
        hero: {
            title: { type: String },
            title_highline: { type: String },
            desc: { type: String },
            img_url: { type: String },
        },
        issue: {
            title: { type: String },
            img_items: [{ desc: String, img: String, _id: false }],
            summary: {type:String}
        },
        solution:{
            title: {type: String},
            cards: [{label: String, desc: String, _id: false }],
            video_url: {type:String}
        },
        whychooseus:{
            title: {type: String},
            item_card: {
                img_url: String,
                line1: String,
                line2: String,
                line3: String,
                _id: false
            },
            title_2: String,
            title_3: String,
            cards: [String],
            tbl: []
        },
        certificate: {
            title: {type: String},
            img_urls: [String]
        },
        survey: {
            title: {type: String},
            cards: [{percent: String, desc: String, _id: false}]
        },
        feedback: {
            title: {type: String, _id: false},
            video_url: String,
            cards:[]
        },
        faq: {
            title: String,
            items: [{q: String, a: String, _id:false}]
        },
        warranty: {
            title: String,
            cards: [String]
        },
        contact: {
            title: {type: String},
            desc: {type: String}
        },
        introduce: {
            title: String,
            desc: String,
        },
        pageinfo:{
            phone: String,
            email: String,
            address: String
        }
    },
    { timestamps: true },
);

module.exports = mongoose.model('PageConfig', PageConfigSchema);
