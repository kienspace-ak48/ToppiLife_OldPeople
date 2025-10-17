const express = require('express');
const router = express.Router();

router.post('/login', (req, res) => {
    try {
        const { username, password } = req.body;
        if (username === 'test' && password === '123') {
            req.session.isAdmin = true; //luu session
            // return res.redirect('/admin/dashboard');
            return res.status(200).json({success: true, redirect: '/admin/dashboard/home'})
        }
        //   res.redirect("/admin/auth");
        res.json({ success: false, mess:'Password or account not correct!' });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({success: false, mess: error.message})
    }
});
router.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/admin/auth');
    });
});
router.get('/', (req, res) => {
    res.render('admin/login', { layout: false });
});

module.exports = router;
