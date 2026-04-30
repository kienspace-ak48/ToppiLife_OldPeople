// middleware/auth.js
function isAuthenticated(req, res, next) {
  // test
  // return next();
  // end test
  if (req.session && req.session.isAdmin) {
    return next(); // cho đi tiếp
  }
  res.redirect('/admin/auth'); // quay lại login
  // next();
}

module.exports = isAuthenticated;
