const Video = require('../db/db.js').Video;
const File = require('../db/db.js').file;
const fs = require('fs');
const path = require('path');
const send = require('koa-send');
const FFMPEGOperation = require('../models/videodeal');
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

    fs.mkdir(path.join(__dirname,`../public/videoPic/${topic}`),(err) => {
      if(err){
        console.log(err);
        return;
      }
    });

    const FFMPEGOperationObj = new FFMPEGOperation();
    const outputPath = path.join(__dirname,`../public/videoPic/${topic}`);
    //获取缩略图
    await FFMPEGOperationObj.getVideoSceenshots(filePath,outputPath,1,35,topic);
  
   
    filePath = filePath.substring(31);
    let pic =  `http://localhost:3000/videoPic/${topic}/${topic}_34.jpg`;
    let  video = new Video({topic,content,filePath,pic});
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
      let res = await Video.find({_id});
      let index =  res[0].filePath.lastIndexOf(".");
      let ext = res[0].filePath.substring(index+1);
      let res2 = await Video.deleteOne({_id});
      let filePath = path.join(__dirname, '../public/videos/')+`${res[0].topic}.${ext}`;
      if(res2.n!=0){
          fs.unlink(filePath,(err)=>{
               if(err){
                  console.log(err);
                  return false;
               }
               console.log('删除成功');
          });
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
   },
   async downloadFiles(ctx){
      let _id = ctx.query.id;
      console.log('----');
      let res = await File.find({_id:_id});
      //console.log(res);
      let index =  res[0].filePath.lastIndexOf(".");
      let ext = res[0].filePath.substring(index+1);
      let path = `/public/upload_files/${res[0].topic}.${ext}`;
      await send(ctx,path);
   },
  async deleteFile(ctx){
     let _id = ctx.params.data;
     let res = await File.find({_id});
     let index =  res[0].filePath.lastIndexOf(".");
     let ext = res[0].filePath.substring(index+1);
     let filePath = path.join(__dirname,`../public/upload_files/${res[0].topic}.${ext}`);
      fs.unlink(filePath,(err)=>{
         if(err){
            console.log(err);
            return false;
         }
         console.log('删除成功');
      });
      let res2 = await File.findOneAndDelete({_id});
      if(res2.length!=0){
         ctx.body = {
            code:200,
         }
      }else{
         ctx.body = {
            code:401
         }
      }
  }
}