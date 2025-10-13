const multer = require('multer')

const AdminController = require("../controller/admin.controller")();
const isAuthenticated = require("../middleware/auth");
const PageSettingEntity = require('../model/PageSetting');
const imageUpload = require('../config/imageUpload');
//config customize
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname)
});
const upload = multer({ storage });
const defaultSetting = {
  hero: { title: "", subtitle: "", image: "" },
  issue: { title: "", images: [], summary: "" },
  solution: { title: "", cards: [], video: "" },
  why: { title: "", cards: [], subtitles: [], extraCards: [] },
  certificate: { title: "", files: [] },
  survey: { title: "", items: [] },
  feedback: { title: "", video: "" },
  faq: { title: "", items: [] },
  warranty: { title: "", items: [] },
  contact: { title: "" },
  introduce: { title: "", desc: "", image: "" },
};
module.exports = function (app) {
  // admin
  app.get("/admin", AdminController.Index);
  app.post("/admin", AdminController.Login);
  app.get("/admin/dashboard", isAuthenticated, AdminController.DashBoard);
  app.post('/admin/page-setting', isAuthenticated, imageUpload.any(),AdminController.PageSetting)
  app.post('/admin/register', AdminController.Register);
  
  app.get('/page-config', AdminController.PageConfig);
  // client
  app.get("/",async (req, res) => {
    try {
      var ps = await PageSettingEntity.findOne({}).lean();
      if(!ps){
        ps = defaultSetting;
      }
      res.locals = ps;
      res.render("home/homepage", {
      title: "Home Page",
      layout: "layouts/mainlayout",
      ps: ps
    });
    } catch (error) {
      res.json({status: false, mess: error})
    }
    
  });
  //
  // Bắt tất cả các route không khớp
  app.use((req, res) => {
    res.status(404).render("404", {
      title: "404 - Không tìm thấy trang",
      layout: false,
    });
  });
};
