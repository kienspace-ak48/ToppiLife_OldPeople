const express = require('express');
const router = express.Router();
const UserEntity = require('../model/User');


router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await UserEntity.findOne({email:username});
        // console.log(user)
        if(!user) return res.status(400).json({success: false, mess: 'User or password not correct!'});
        const isMatch = await user.comparePassword(password);
        if (username === user.email &&  isMatch && user.role ==='master') {
            req.session.isAdmin = true; //luu session
            req.session.username = user.username;
            // return res.redirect('/admin/dashboard');
            return res.status(200).json({success: true, redirect: '/admin/dashboard/home'})
        }
        //   res.redirect("/admin/auth");
        res.status(400).json({ success: false, mess:'Password or account not correct!' });
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
