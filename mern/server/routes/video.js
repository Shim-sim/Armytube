const path = require('path');
const express = require('express');
const router = express.Router();

 const { Video } = require("../models/Video");

const multer = require('multer');
const { auth } = require('../middleware/auth')
var ffmpeg = require('fluent-ffmpeg')


var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`)
    },
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname)
        if (ext !== '.mp4') {
            return cb(res.status(400).end('only jpg, png, mp4 is allowed'), false);
        }
        cb(null, true)
    }
})




var upload = multer({ storage: storage }).single("file")
//=================================
//             Video
//=================================

router.post("/uploads", (req, res) => {

	// 비디오를 서버에 저장한다.
    upload(req, res, err => {
        if (err) {
            return res.json({ success: false, err })
        }
        return res.json({ success: true, filePath: res.req.file.path, fileName: res.req.file.filename })
    })

});

router.post("/uploadVideo", (req, res) => {

   // 비디오 정보들을 저장한다.
	const video = new Video(req.body)
	
	video.save((err, doc) => {
		if(err) return res.json({ success: false, err })
		res.status(200).json({ success: true })
	})
	
});



// //=================================
// //             thumbnail 추후 local에서 사용해보기
// //=================================

// router.post("/thumbnail", (req, res) => {
// 	// 썸네일 생성 하고 비디오 러닝타임도 가져오기
	
// 	let thumbsFilePath ="";
//   let fileDuration ="";
	
	
// 	// 비디오 정보 가져오기
// 	ffmpeg.ffprobe(req.body.url, function(err, metadata){
// 		ffmpeg.setFfmpegPath()
// 		console.dir(metadata);
// 		console.log(metadata.format.duration);
// 		fileDuration = metadata.format.duration;
//    })
	
// 	// 썸네일 생성
// 	ffmpeg(req.body.url)
// 		.on('filenames', function (filenames) {
// 				console.log('Will generate ' + filenames.join(', '))
// 				thumbsFilePath = "uploads/thumbnails/" + filenames[0];
// 		})
// 		.on('end', function () {
// 				console.log('Screenshots taken');
// 				return res.json({ success: true, thumbsFilePath: thumbsFilePath, fileDuration: fileDuration})
// 		})
// 		.screenshots({
// 				// Will take screens at 20%, 40%, 60% and 80% of the video
// 				count: 3,
// 				folder: 'uploads/thumbnails',
// 				size:'320x240',
// 				// %b input basename ( filename w/o extension )
// 				filename:'thumbnail-%b.png'
// 		});
// });

module.exports = router;
