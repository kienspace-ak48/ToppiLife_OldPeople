const fs = require('fs');
const myPath = require('../config/myPath');
const ImageEntity = require('../model/Image');

const CNAME = 'ImageController.js ';
const VLAYOUT = 'layouts/adminLayout';
const VNAME = 'admin/image/';
//export kieu function
module.exports = () => {
    const uploadDir = myPath.root + '/src/public/uploads/';
    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir);
    }
    const img_path = '/uploads/';
    console.log(uploadDir);
    return {
        Index: async (req, res) => {
            const files = fs.readdirSync(uploadDir);
            const images = await ImageEntity.find().lean();
            res.render(VNAME + 'index', { layout: VLAYOUT, title: 'image', files: images || [] });
        },
        UploadImage: async (req, res) => {
            try {
                const file = req.file;
            if (!file) {
                res.status(400).success({ success: false, mess: 'Ko co file anh' });
            }
            const image = new ImageEntity({
                name: file.filename,
                path: img_path + file.filename,
            });

            await image.save();

            res.redirect('/admin/image')
            } catch (error) {
                console.log(CNAME, error.message);
                res.status(500).json({success: false, mess: error.message});
            }
        },
        DeleteImage: async (req, res) => {
            const file = req.params.name;
            const filePath = uploadDir + file;
            try {
                if (!file) {
                    res.status(400).json({ success: false, mess: 'Ko co anh' });
                }
                const result = await ImageEntity.deleteOne({ name: file });
                if (fs.existsSync(filePath)) {
                    fs.unlinkSync(filePath);
                }
                res.redirect('/admin/image');
            } catch (error) {
                console.log(CNAME, error.message);
                res.status(500).json({ success: false, mess: error.message });
            }
        },
    };
};
