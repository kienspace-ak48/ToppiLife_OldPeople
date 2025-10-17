const clientRoute = require('./clientRoute');
const adminRoute = require('./adminRoute');
const isAuthenticated = require('../middleware/auth');
const AuthController = require('../controller/auth.controller');

module.exports = function (app) {
    // admin
    // app.post('/admin', AdminController.Login);
    // app.get('/admin', AdminController.Index);
    // app.get('/admin/login', AdminController.Index);
    app.use('/admin/auth', AuthController);
    app.use('/admin',isAuthenticated, adminRoute);
    // client
    app.use('/', clientRoute);
    //
};
