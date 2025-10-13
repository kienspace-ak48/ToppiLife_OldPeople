const app = require('./app');
require('dotenv').config();
const ALLPORT="0.0.0.0";
const http = require('http');
const https = require('https');
const fs = require('fs');

//chay server 🟠
const httpServer = http.createServer(app);
//server https 🟣
const httpsServer= https.createServer(app);
// 🚀 run server //
httpServer.listen(process.env.HTTP_HOST_PORT, ALLPORT, () => {
    console.log(`HTTP Server running on port http://localhost:${process.env.HTTP_HOST_PORT}`);
});
httpsServer.listen(process.env.HTTPS_HOST_PORT, ALLPORT, () => {
    console.log(`HTTPS Server running on port https://localhost:${process.env.HTTPS_HOST_PORT}`);
});