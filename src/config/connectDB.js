const mongoose = require('mongoose');
require('dotenv').config();

module.exports = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI_ONL);
        console.log("MongoDB connected 🟢");
    } catch (error) {
        console.error('MongoDB connection failed 🔴:', error.message);
        process.exit(1); // dừng server nếu lỗi
    }
}

