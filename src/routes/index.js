const clientRoute = require('./clientRoute');
const adminRoute = require('./adminRoute');
const isAuthenticated = require('../middleware/auth');
const AuthController = require('../controller/auth.controller');

module.exports = function (app) {
    // admin
    app.use('/admin/auth', AuthController);
    app.use('/admin',isAuthenticated, adminRoute);
    // client
    app.use('/', clientRoute);
    //
};
