const Video = require('../db/db.js').Video;
const fs = require('fs');
const path = require('path');
module.exports = {
   async uploadVideo(ctx){
    let  topic = ctx.request.body.topic;
    let  content = ctx.request.body.content;
    let  file = ctx.request.files.file;
    let reader = fs.createReadStream(file.path);
    let ext = file.name.split('.').pop();
    let filePath = path.join(__dirname, '../public/videos/') + `${topic}.${ext}`;
    const upStream = fs.createWriteStream(filePath);
    reader.pipe(upStream);
    filePath = filePath.substring(31);
    let  video = new Video({topic,content,filePath});
    let res = await video.save();
    if(res.length!=0){
       ctx.body = {
          code:200,
          msg:'添加成功'
       }
    }else{
       ctx.body = {
          code:401,
          msg:'添加失败'
       }
    }
   },
   async getVideos(ctx){
      let res = await Video.find({});
      if(res.length!=0){
         ctx.body = {
            code:200,
            res
         }
      }else{
         ctx.body = {
            code:401,
            msg:'获取失败'
         }
      }
   },
   async deleteVideo(ctx){
      let _id = ctx.params.id;
      let res = await Video.deleteOne({_id});
      if(res.n!=0){
         ctx.body = {
            code:200,
            msg:'删除 成功'
         }
      }else{
         ctx.body = {
            code:401,
            msg:'删除失败'
         }
      }
   }
}