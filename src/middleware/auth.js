// middleware/auth.js
function isAuthenticated(req, res, next) {
  if (req.session && req.session.isAdmin) {
    return next(); // cho đi tiếp
  }
  res.redirect('/admin/auth'); // quay lại login
  // next();
}

module.exports = isAuthenticated;
