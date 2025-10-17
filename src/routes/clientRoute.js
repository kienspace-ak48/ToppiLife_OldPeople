const express = require('express');
const router = express.Router();
const AdminController = require('../controller/admin.controller')();

const PageSettingEntity = require('../model/PageSetting');
const PageConfigEntity = require('../model/PageConfig');

// 
router.get('/admin/my-dashboard', AdminController.MyDashboard);


// 
router.get('/', async (req, res) => {
    try {
        var ps = await PageSettingEntity.findOne({}).lean();
        var pc = await PageConfigEntity.findOne({}).lean();
        if (!ps) {
            ps = defaultSetting;
        }
        res.locals = ps;
        res.render('home/homepage', {
            title: 'Home Page',
            layout: 'layouts/mainlayout',
            ps: ps,
            pc,
        });
    } catch (error) {
        res.json({ status: false, mess: error });
    }
});
// Bắt tất cả các route không khớp
router.use((req, res) => {
    res.status(404).render('404', {
        title: '404 - Không tìm thấy trang',
        layout: false,
    });
});

module.exports = router;
