const CNAME = 'VideoController';
const VLAYOUT = 'layouts/adminLayout';
const VNAME = 'admin/video/';
const VideoEntity = require('../model/Video');
const path = require('path');
const fs = require('fs');
const myPath = require('../config/myPath');

const VideoController =()=>{
    const uploadDir ='/vids/';
    return {
        Index: async (req, res)=>{
            const files = await VideoEntity.find().lean();
            // console.log(files)
            res.render(VNAME+'index', { layout: VLAYOUT, title: 'Video Upload', files: files|| [] });
        },
        Upload: async(req, res)=>{
            try {
                const file = req.file;
                console.log(file);
                if(!file){
                    return res.status(400).json({success: false, mess: 'No video file uploaded'});
                }
                const video = new VideoEntity({
                    name: file.filename,
                    path: uploadDir + file.filename
                });
                await video.save();
                res.redirect('/admin/video');

            } catch (error) {
                console.log(CNAME, error.message);
                res.status(500).json({success: false, mess: error.message});
            }
        },
        Delete: async(req, res)=>{
            try {
                const videoName = req.params.path;
                console.log('Delete video at path:', videoName);
                const result = await VideoEntity.findOneAndDelete({name: videoName});
                if(result){
                    const videoPath = path.join(myPath.root, 'www', 'vids', videoName);
                    if(fs.existsSync(path.join(videoPath))){
                        fs.unlinkSync(path.join(videoPath));
                    }
                }
                res.json({success: true, mess:'Video deleted successfully'});
            } catch (error) {
                console.log(CNAME, error.message);
                res.status(500).json({success: false, mess: error.message});
            }
        }
    }
}

module.exports = VideoController;