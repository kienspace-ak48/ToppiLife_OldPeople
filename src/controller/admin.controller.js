const PageSettingEntity = require('../model/PageSetting');
const PageConfigEntity = require('../model/PageConfig');
const ImageEntity = require('../model/Image');

const User = require('../model/User');
const CNAME = 'admin.controller.js ';
const VNAME = 'admin/pageconfig/'; //C:\Workspaces\Nodejs\toppi_life\src\views\admin\pageconfig
const VLAYOUT = 'layouts/adminLayout';

module.exports = () => {
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
    
    async function  imageHelper() {
        const images = await ImageEntity.find().lean();
        return images || [];
    }
    return {
        Index: (req, res) => {
            // res.send('Admin Page')
            res.render('admin/login', { title: 'Admin Page', layout: false });
        },
        Register: async (req, res) => {
            const { username, password } = req.body;
            try {
                const user = new User({ username, password });
                await user.save();
                res.json({ status: true, mess: 'register success' });
            } catch (error) {
                console.log('C_Register ' + error);
                res.status(500), json({ stauts: false, mess: 'failed' });
            }
        },
        Login: async (req, res) => {
            const { username, password } = req.body;
            try {
                const user = await User.findOne({ username });
                if (!user) throw new Error('Không tìm thấy người dùng');

                const isMatch = await user.comparePassword(password);
                if (!isMatch) throw new Error('Sai mật khẩu');

                req.session.isAdmin = true;
                // res.redirect('/admin/dashboard');
                // 🟢 Trả JSON để frontend xử lý redirect

                res.json({ success: true, redirect: '/admin/dashboard' });
            } catch (err) {
                res.status(500).json({ success: false, mess: err.message });
            }
        },
        DashBoard: async (req, res) => {
            var pageSetting = await PageSettingEntity.findOne({}).lean();
            if (!pageSetting) {
                pageSetting = defaultSetting;
            }
            await console.log(pageSetting);
            res.render('admin/dashboard', { layout: false, ps: pageSetting });
        },
        PageSetting: async (req, res) => {
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
                        image: fileMap['hero_image'] || body['hero_image.file_old'],
                    },
                    issue: {
                        title: body.issue_title,
                        images: [
                            {
                                desc: body['issue_images[0].desc'],
                                file: fileMap['issue_images[0].file'] || body['issue_images[0].file_old'],
                            },
                            {
                                desc: body['issue_images[1].desc'],
                                file: fileMap['issue_images[1].file'] || body['issue_images[1].file_old'],
                            },
                            {
                                desc: body['issue_images[2].desc'],
                                file: fileMap['issue_images[2].file'] || body['issue_images[2].file_old'],
                            },
                            {
                                desc: body['issue_images[3].desc'],
                                file: fileMap['issue_images[3].file'] || body['issue_images[3].file_old'],
                            },
                        ],
                        summary: body.issue_summary,
                    },
                    solution: {
                        title: body.solution_title,
                        cards: [
                            {
                                title: body['solution_cards[0].title'],
                                desc: body['solution_cards[0].desc'],
                            },
                            {
                                title: body['solution_cards[1].title'],
                                desc: body['solution_cards[1].desc'],
                            },
                            {
                                title: body['solution_cards[2].title'],
                                desc: body['solution_cards[2].desc'],
                            },
                            {
                                title: body['solution_cards[3].title'],
                                desc: body['solution_cards[3].desc'],
                            },
                            {
                                title: body['solution_cards[4].title'],
                                desc: body['solution_cards[4].desc'],
                            },
                        ],
                        video: body.solution_video,
                    },
                    why: {
                        title: body.why_title,
                        cards: {
                            image: fileMap['why_cards[0].image'],
                            line1: body['why_cards[0].line1'],
                            line2: body['why_cards[0].line2'],
                            line3: body['why_cards[0].line3'],
                        },

                        // subtitles: [body["why_subtitles[0]"], body["why_subtitles[1]"]],
                        sub_title_01: body['why_subtitle_01'],
                        sub_title_02: body['why_subtitle_02'],
                        extracards: [
                            body['why_extra_cards'][0],
                            body['why_extra_cards'][1],
                            body['why_extra_cards'][2],
                        ],
                    },
                    certificate: {
                        title: body.certificate_title,
                        files: [
                            fileMap['certificates[0]'],
                            fileMap['certificates[1]'],
                            fileMap['certificates[2]'],
                            fileMap['certificates[3]'],
                        ],
                    },
                    survey: {
                        title: body.survey_title,
                        items: [
                            {
                                percent: body['survey_items[0].percent'],
                                text: body['survey_items[0].text'],
                            },
                            {
                                percent: body['survey_items[1].percent'],
                                text: body['survey_items[1].text'],
                            },
                            {
                                percent: body['survey_items[2].percent'],
                                text: body['survey_items[2].text'],
                            },
                            {
                                percent: body['survey_items[3].percent'],
                                text: body['survey_items[3].text'],
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
                                question: body['faq_items[0].question'],
                                answer: body['faq_items[0].answer'],
                            },
                            {
                                question: body['faq_items[1].question'],
                                answer: body['faq_items[1].answer'],
                            },
                            {
                                question: body['faq_items[2].question'],
                                answer: body['faq_items[2].answer'],
                            },
                            {
                                question: body['faq_items[3].question'],
                                answer: body['faq_items[3].answer'],
                            },
                        ],
                    },
                    warranty: {
                        title: body.warranty_title,
                        items: [
                            body['warranty_items[0].one'],
                            body['warranty_items[1].two'],
                            body['warranty_items[2].three'],
                            body['warranty_items[3].four'],
                        ],
                    },
                    contact: {
                        title: body.contact_title,
                        desc: body.contact_desc,
                    },
                    introduce: {
                        title: body.introduce_title,
                        desc: body.introduce_desc,
                        image: fileMap['introduce_image'],
                    },
                });
                let plainData = setting.toObject();
                delete plainData._id;
                delete plainData.__v;
                const result = await PageSettingEntity.findOneAndUpdate(
                    {}, // filter rỗng => luôn tìm doc đầu tiên
                    { $set: plainData }, // update field mới
                    { upsert: true, new: true }, // chưa có thì tạo, có rồi thì update overwrite: true
                );
                res.json({ success: true, message: 'Đã lưu Page Setting' });
            } catch (err) {
                console.error(err);
                res.status(500).json({ success: false, message: 'Lỗi server' });
            }
        },
        LogOut: (req, res) => {
            req.session.destroy(() => {
                res.redirect('/admin/login');
            });
        },
        //==============NEW=========//
        MyDashboard: async (req, res) => {
            res.render('admin/index', { layout: VLAYOUT, title: 'Dashboard' });
        },
        PageConfig: async (req, res) => {
            try {
                const pc = await PageConfigEntity.findOne().lean();
                const files = await imageHelper(); // ✅ THÊM AWAIT
                res.render(VNAME + 'hero', { layout: VLAYOUT, title: 'configPage', pc, files });
            } catch (error) {
                console.log(error.message);
                res.render(VNAME + 'hero', { layout: VLAYOUT, title: 'hero' });
            }
        },
        //ajax
        HeroSaveConfig: async (req, res) => {
            try {
                const data = req.body;
                const hero_dto = {
                    title: data.title,
                    title_highline: data.titleHighline,
                    desc: data.desc,
                    img_url: data.imgUrl,
                };
                const result = await PageConfigEntity.findOneAndUpdate(
                    {},
                    {
                        $set: {
                            hero: hero_dto,
                        },
                    },
                    { upsert: true, new: true },
                );
                res.json({ success: true });
            } catch (error) {
                console.log(CNAME, error.message);
                res.status(500).json({ success: false, mess: error.message });
            }
        },
        IssueConfig: async (req, res) => {
            try {
                const issue = await PageConfigEntity.findOne().lean();
                res.render(VNAME + 'issue', { layout: VLAYOUT, title: 'Issue config', is: issue.issue || {}, files: await imageHelper() });
            } catch (error) {
                console.log(CNAME, error.message);
                res.render(VNAME + 'issue', { layout: VLAYOUT, title: 'Issue config', is: {}, files:[]  });
            }
        },
        IssueConfigSave: async (req, res) => {
            try {
                const dataC = req.body;
                const issueDTO = {
                    title: dataC.title || '',
                    img_items: dataC.img_items || [],
                    summary: dataC.summary || '',
                };
                const result = await PageConfigEntity.findOneAndUpdate(
                    {},
                    {
                        $set: { issue: issueDTO },
                    },
                    { upsert: true, new: true },
                );
                res.json({ success: true });
            } catch (error) {
                console.log(CNAME, error.message);
                res.status(500).json({ success: false, mess: error.message });
            }
        },
        SolutionConfig: async (req, res) => {
            try {
                const s = await PageConfigEntity.findOne().select('solution').lean();
                res.render(VNAME + 'solution', { layout: VLAYOUT, title: 'solution', files: await imageHelper(), sol:s.solution||{}});
            } catch (error) {
                console.log(CNAME, error.message);
                res.render(VNAME + 'solution', { layout: VLAYOUT, title: 'solution', s:{} });
            }
        },
        SolutionConfigSave: async (req, res) => {
            try {
                const dataC = req.body;
                const solutionDTO = {
                    title: dataC.title || '',
                    cards: dataC.cards || [],
                    video_url: dataC.video_url || '',
                };
                const result = await PageConfigEntity.findOneAndUpdate(
                    {},
                    {
                        $set: {
                            solution: solutionDTO,
                        },
                    },
                    { upsert: true, new: true },
                );

                res.json({ success: true });
            } catch (error) {
                console.log(CNAME, error.message);
                res.status(500).json({ success: false, mess: error.message });
            }
        },
        WhyChooseUs: async (req, res) => {
            try {
                const why =(await PageConfigEntity.findOne().select('whychooseus').lean()).whychooseus;
                res.render(VNAME + 'whychooseus', { layout: VLAYOUT, title: 'why choose us', files: await imageHelper(), why:why||{} });
            } catch (error) {
                console.log(CNAME, error.message);
                res.render(VNAME + 'whychooseus', { layout: VLAYOUT, title: 'why choose us', files: await imageHelper(), why:{} });

            }
        },
        WhyChooseUsSaveConfig: async (req, res) => {
            try {
                const dataC = req.body;
                const whyDTO = {
                    title: dataC.title || '',
                    item_card:
                        {
                            img_url: dataC.item.img_url,
                            line1: dataC.item.line1,
                            line2: dataC.item.line2,
                            line3: dataC.item.line3,
                        } || {},
                    title_2: dataC.title_2 || '',
                    title_3: dataC.title_3 || '',
                    cards: dataC.cards || [],
                };
                const result = await PageConfigEntity.findOneAndUpdate(
                    {},
                    { $set: { whychooseus: whyDTO } },
                    { upsert: true, new: true },
                );
                res.json({ success: true });
            } catch (error) {
                console.log(CNAME, error.message);
            }
        },
        Certificate: async (req, res) => {
            try {
                const c= (await PageConfigEntity.findOne().select('certificate').lean()).certificate
                res.render(VNAME + 'certificate', { layout: VLAYOUT, title: 'certificate', files: await imageHelper(), c: c||{} });
            } catch (error) {
                console.log(CNAME, error.message);
                res.render(VNAME + 'certificate', { layout: VLAYOUT, title: 'certificate', c:{} });
            }
        },
        CertificateConfigSave: async (req, res) => {
            try {
                const dataC = req.body;
                const certDTO = {
                    title: dataC.title,
                    img_urls: dataC.img_url,
                };
                const result = await PageConfigEntity.findOneAndUpdate(
                    {},
                    {
                        $set: {
                            certificate: certDTO,
                        },
                    },
                    { upsert: true, new: true },
                );

                res.json({ success: true });
            } catch (error) {
                console.log(CNAME, error.mess);
                res.status(500).json({ success: false, mess: error.message });
            }
        },
        Survey: async (req, res) => {
            try {
                const s= (await PageConfigEntity.findOne().select('survey').lean()).survey
                res.render(VNAME + 'survey', { layout: VLAYOUT, title: 'survey', files: await imageHelper(),s: s||{} });
            } catch (error) {
                console.log(CNAME, error.message);
                res.render(VNAME + 'survey', { layout: VLAYOUT, title: 'survey', s:{} });
            }
        },
        SurveyConfigSave: async (req, res) => {
            try {
                const dataC = req.body;
                const serveyDTO = {
                    title: dataC.title,
                    cards: dataC.items,
                };
                const result = await PageConfigEntity.findOneAndUpdate(
                    {},
                    {
                        $set: {
                            survey: serveyDTO,
                        },
                    },
                    { upsert: true, new: true },
                );
                res.json({ success: true });
            } catch (error) {
                console.log(CNAME, error.message);
            }
        },
        Feedback: async (req, res) => {
            try {
                const fb = (await PageConfigEntity.findOne().select('feedback').lean()).feedback;
                res.render(VNAME + 'feedback', { layout: VLAYOUT, title: 'feedback', files: await imageHelper(), fb: fb||{} });
            } catch (error) {
                console.log(CNAME, error.message);
                res.render(VNAME + 'feedback', { layout: VLAYOUT, title: 'feedback', fb:{} });
            }
        },
        FeedbackConfigSave: async (req, res) => {
            try {
                const dataC = req.body;
                const fbDTO = {
                    title: dataC.title || '',
                    video_url: dataC.vid_url || '',
                };
                const result = await PageConfigEntity.findOneAndUpdate(
                    {},
                    {
                        $set: {
                            feedback: fbDTO,
                        },
                    },
                    { upsert: true, new: true },
                );
                res.json({ success: true });
            } catch (error) {
                console.log(CNAME, error.message);
                res.status(500).json({ success: false, mess: error.message });
            }
        },
        Faq: async (req, res) => {
            try {
                const faq = (await PageConfigEntity.findOne().select('faq').lean()).faq;
                res.render(VNAME + 'faq', { layout: VLAYOUT, title: 'faq', files: await imageHelper(), faq: faq||{} });
            } catch (error) {
                console.log(CNAME, error.message);
                res.render(VNAME + 'faq', { layout: VLAYOUT, title: 'faq', faq: {} });
            }
        },
        FaqConfigSave: async (req, res) => {
            try {
                const dataC = req.body;
                const faqDTO = {
                    title: dataC.title || '',
                    items: dataC.items || [],
                };
                const result = await PageConfigEntity.findOneAndUpdate(
                    {},
                    {
                        $set: {
                            faq: faqDTO,
                        },
                    },
                    { upsert: true, new: true },
                );
                res.json({ success: true });
            } catch (error) {
                console.log(CNAME, error.message);
                res.status(500).json({ success: false, mess: error.message });
            }
        },
        ThreePart: async (req, res) => {
            try {
                const p = await PageConfigEntity.findOne().lean() 

                res.render(VNAME + 'threepart', { layout: VLAYOUT, title: 'three-part', files: await imageHelper(), p:p||[] });
            } catch (error) {
                console.log(CNAME, error.message);
                res.render(VNAME + 'threepart', { layout: VLAYOUT, title: 'three-part', p:[] });
            }
        },
        ThreePartConfigSave: async (req, res) => {
            try {
                const dataC = req.body;
                const t3DTO = {
                    warrnaty: dataC.warranty || {},
                    contact: dataC.contact || {},
                    introduce: dataC.introduce || {},
                };
                const result = await PageConfigEntity.findOneAndUpdate(
                    {},
                    {
                        $set: {
                            warranty: t3DTO.warrnaty,
                            contact: t3DTO.contact,
                            introduce: t3DTO.introduce,
                        },
                    },
                    { upsert: true, new: true },
                );
                res.json({ success: true });
            } catch (error) {
                console.log(CNAME, error.message);
                res.status(500).json({ success: false, mess: error.message });
            }
        },
    };
};
