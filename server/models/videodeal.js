//ffmpeg 操作类
const ffmpeg = require('ffmpeg')

module.exports = class FFMPEGOperation {
    //获取视频缩略图
    getVideoSceenshots(videoPath, outPutPath, frameRate, frameCount,name){
        const process = new ffmpeg(videoPath);
        return process.then(function (video) {
            video.fnExtractFrameToJPG(outPutPath, {
                frame_rate : frameRate,
                number : frameCount,
                file_name : name,
            }, function (error, files) {
                if (!error)
                    console.log('Frames: ' + files)
            })
        }, function (err) {
            console.log('Error: ' + err)
        })
    }
}