const { json } = require("express");
const PageSettingEntity = require("../model/PageSetting");
const User = require("../model/User");

module.exports = () => {
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
  return {
    Index: (req, res) => {
      // res.send('Admin Page')
      res.render("admin/login", { title: "Admin Page", layout: false });
    },
    Register: async (req, res)=>{
      const {username, password} = req.body;
      try {
        const user = new User({username, password});
        await user.save();
        res.json({status: true, mess: 'register success'})
      } catch (error) {
        console.log("C_Register "+error)
        res.status(500),json({stauts: false, mess: 'failed'})        
      }
    },
    Login: async(req, res) => {
      console.log("runnning");
      // const { username, password } = req.body;
      // //
      // if (username === "kien" && password === "123") {
      //   req.session.isAdmin = true; //luu session
      //   return res.redirect("/admin/dashboard");
      // }
      // var data = {
      //   status: false,
      //   mess: "Login failed",
      // };
      // res.render("admin/login", { title: "login failed", data, layout: false });
      //==================NEW
      const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) throw new Error('Không tìm thấy người dùng');

    const isMatch = await user.comparePassword(password);
    if (!isMatch) throw new Error('Sai mật khẩu');

    req.session.isAdmin = true;
    res.redirect('/admin/dashboard');
  } catch (err) {
    res.render('admin/login', {
      title: 'login failed',
      data: { status: false, mess: err.message },
      layout: false
    });
  }

    },
    DashBoard: async (req, res) => {
      var pageSetting = await PageSettingEntity.findOne({}).lean();
      if (!pageSetting) {
        console.log("Test");
        pageSetting = defaultSetting;
      }
      console.log("typeof: " + typeof pageSetting);
      await console.log(pageSetting);
      res.render("admin/dashboard", { layout: false, ps: pageSetting });
    },
    PageSetting: async (req, res) => {
      console.log("AAA");
      try {
        const body = req.body;

        // map file upload theo field name
        const fileMap = {};
        req.files.forEach((f) => {
          fileMap[f.fieldname] = f.filename;
        });

        const setting = new PageSettingEntity({
          hero: {
            title: body.hero_title,
            subtitle: body.hero_subtitle,
            image: fileMap["hero_image"] || body["hero_image.file_old"],
          },
          issue: {
            title: body.issue_title,
            images: [
              {
                desc: body["issue_images[0].desc"],
                file: fileMap["issue_images[0].file"] || body["issue_images[0].file_old"],
              },
              {
                desc: body["issue_images[1].desc"],
                file: fileMap["issue_images[1].file"] || body["issue_images[1].file_old"],
              },
              {
                desc: body["issue_images[2].desc"],
                file: fileMap["issue_images[2].file"] || body["issue_images[2].file_old"],
              },
              {
                desc: body["issue_images[3].desc"],
                file: fileMap["issue_images[3].file"] || body["issue_images[3].file_old"],
              },
            ],
            summary: body.issue_summary,
          },
          solution: {
            title: body.solution_title,
            cards: [
              {
                title: body["solution_cards[0].title"],
                desc: body["solution_cards[0].desc"],
              },
              {
                title: body["solution_cards[1].title"],
                desc: body["solution_cards[1].desc"],
              },
              {
                title: body["solution_cards[2].title"],
                desc: body["solution_cards[2].desc"],
              },
              {
                title: body["solution_cards[3].title"],
                desc: body["solution_cards[3].desc"],
              },
              {
                title: body["solution_cards[4].title"],
                desc: body["solution_cards[4].desc"],
              },
            ],
            video: body.solution_video,
          },
          why: {
            title: body.why_title,
            cards: {
              image: fileMap["why_cards[0].image"],
              line1: body["why_cards[0].line1"],
              line2: body["why_cards[0].line2"],
              line3: body["why_cards[0].line3"],
            },

            // subtitles: [body["why_subtitles[0]"], body["why_subtitles[1]"]],
            sub_title_01: body["why_subtitle_01"],
            sub_title_02: body["why_subtitle_02"],
            extracards: [
              body["why_extra_cards"][0],
              body["why_extra_cards"][1],
              body["why_extra_cards"][2],
            ],
          },
          certificate: {
            title: body.certificate_title,
            files: [
              fileMap["certificates[0]"],
              fileMap["certificates[1]"],
              fileMap["certificates[2]"],
              fileMap["certificates[3]"],
            ],
          },
          survey: {
            title: body.survey_title,
            items: [
              {
                percent: body["survey_items[0].percent"],
                text: body["survey_items[0].text"],
              },
              {
                percent: body["survey_items[1].percent"],
                text: body["survey_items[1].text"],
              },
              {
                percent: body["survey_items[2].percent"],
                text: body["survey_items[2].text"],
              },
              {
                percent: body["survey_items[3].percent"],
                text: body["survey_items[3].text"],
              },
            ],
          },
          feedback: {
            title: body.feedback_title,
            video: body.feedback_video,
          },
          faq: {
            title: body.faq_title,
            items: [
              {
                question: body["faq_items[0].question"],
                answer: body["faq_items[0].answer"],
              },
              {
                question: body["faq_items[1].question"],
                answer: body["faq_items[1].answer"],
              },
              {
                question: body["faq_items[2].question"],
                answer: body["faq_items[2].answer"],
              },
              {
                question: body["faq_items[3].question"],
                answer: body["faq_items[3].answer"],
              },
            ],
          },
          warranty: {
            title: body.warranty_title,
            items: [
              body["warranty_items[0].one"],
              body["warranty_items[1].two"],
              body["warranty_items[2].three"],
              body["warranty_items[3].four"],
            ],
          },
          contact: {
            title: body.contact_title,
            desc: body.contact_desc
          },
          introduce: {
            title: body.introduce_title,
            desc: body.introduce_desc,
            image: fileMap["introduce_image"],
          },
        });
        await console.log(setting);
        let plainData = setting.toObject();
        delete plainData._id;
        delete plainData.__v;
        const result = await PageSettingEntity.findOneAndUpdate(
          {}, // filter rỗng => luôn tìm doc đầu tiên
          {$set: plainData} , // update field mới
          { upsert: true, new: true  } // chưa có thì tạo, có rồi thì update overwrite: true
        );
        res.json({ success: true, message: "Đã lưu Page Setting" });
      } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Lỗi server" });
      }
    },
    LogOut: (req, res) => {
      req.session.destroy(() => {
        res.redirect("/admin/login");
      });
    },
    PageConfig: (req, res)=>{
      res.render('admin/configPage', {layout: false, title: "configPage"})
    }
  };
};
