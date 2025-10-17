const express = require('express');
const router = express.Router();
const multer = require('multer');
const isAuthenticated = require('../middleware/auth');

const imageConfigUpload = require('../config/uploadImageConfig');
const imageUpload = require('../config/imageUpload');

const AdminController = require('../controller/admin.controller')();
const ImageController = require('../controller/image.controller')();

//config customize
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});
const upload = multer({ storage });
const defaultSetting = {
    hero: { title: '', subtitle: '', image: '' },
    issue: { title: '', images: [], summary: '' },
    solution: { title: '', cards: [], video: '' },
    why: { title: '', cards: [], subtitles: [], extraCards: [] },
    certificate: { title: '', files: [] },
    survey: { title: '', items: [] },
    feedback: { title: '', video: '' },
    faq: { title: '', items: [] },
    warranty: { title: '', items: [] },
    contact: { title: '' },
    introduce: { title: '', desc: '', image: '' },
};

//new
router.get('/image/delete/:name', ImageController.DeleteImage);
router.post('/image/upload', imageConfigUpload.single('image'), ImageController.UploadImage);
router.get('/image', ImageController.Index);
// route page config
router.get('/page-config/hero', AdminController.PageConfig);
router.post('/page-config/hero-section', AdminController.HeroSaveConfig);
router.get('/page-config/certificate', AdminController.Certificate);
router.post('/page-config/certificate', AdminController.CertificateConfigSave);
router.get('/page-config/survey', AdminController.Survey);
router.post('/page-config/survey', AdminController.SurveyConfigSave)
router.get('/page-config/feedback', AdminController.Feedback);
router.post('/page-config/feedback', AdminController.FeedbackConfigSave);
router.get('/page-config/faq', AdminController.Faq);
router.post('/page-config/faq', AdminController.FaqConfigSave);
router.get('/page-config/three-part',AdminController.ThreePart);
router.post('/page-config/three-part', AdminController.ThreePartConfigSave);
router.get('/page-config/why-choose-us', AdminController.WhyChooseUs);
router.post('/page-config/why-choose-us', AdminController.WhyChooseUsSaveConfig);
router.post('/page-config/solution', AdminController.SolutionConfigSave);
router.get('/page-config/solution', AdminController.SolutionConfig);
router.get('/page-config/issue', AdminController.IssueConfig);
router.post('/page-config/issue', AdminController.IssueConfigSave);
router.get('/page-config', AdminController.PageConfig);

// index login
router.get('/dashboard/home',(req, res)=>{
    res.render('admin/index', {layout: 'layouts/adminLayout'})
})
//
router.get('/dashboard', isAuthenticated, AdminController.DashBoard);
// router.post('/page-setting', isAuthenticated, imageUpload.any(), AdminController.PageSetting);
router.post('/register', AdminController.Register);





module.exports = router;
