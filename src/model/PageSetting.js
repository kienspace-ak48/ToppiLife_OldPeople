// const mongoose = require("mongoose");

// const PageSettingSchema = new mongoose.Schema(
//   {
//     author: {
//       type: String,
//       default: "KienVu",
//     },
//     version: {
//       type: String,
//       default: "1.0",
//     },
//     hero: {
//       title: String,
//       subtitle: String,
//       image: String,
//     },
//     issue: {
//       title: String,
//       images: [{ desc: String, file: String }],
//       summary: String,
//     },
//     solution: {
//       title: String,
//       cards: [{ title: String, desc: String }],
//       video: String,
//     },
//     why: {
//       title: String,
//       cards: {
//         image: String,
//         line1: String,
//         line2: String,
//         line3: String,
//       },

//       // subtitles: [String],
//       sub_title_01: String,
//       sub_title_02: String,
//       extracards: [String],
//     },
//     certificate: {
//       title: String,
//       files: [String],
//     },
//     survey: {
//       title: String,
//       items: [{ percent: String, text: String }],
//     },
//     feedback: {
//       title: String,
//       video: String,
//     },
//     faq: {
//       title: String,
//       items: [{ question: String, answer: String }],
//     },
//     warranty: {
//       title: String,
//       items: [String],
//     },
//     contact: {
//       title: String,
//       desc: String
//     },
//     introduce: {
//       title: String,
//       desc: String,
//       image: String,
//     },
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("PageSetting", PageSettingSchema);
