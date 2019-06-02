const Video = require('../db/db.js').Video
const Vcomment = require('../db/db.js').Vcomment
const VideosWatchMsg = require('../db/db.js').VideosWatchMsg
const fs = require('fs')
const path = require('path')
const send = require('koa-send')

module.exports = {
    async getVideoMsg(ctx){
        let {size = 1,page = 1} = ctx.query;
        let options = {
            skip: Number((page-1)*size),
            limit: Number(size),
        }
        let res  = await Video.find({},null,options);
        let total = await Video.countDocuments();
        if(res.length!=0){
            ctx.body = {
                code:200,
                res,
                total
            }
        }else{
            ctx.body = {
                code:401,
                msg:'获取视频信息失败'
            }
        }
    },
   async videoComment(ctx){
       let videoId = ctx.request.body.videoId;
       let content = ctx.request.body.content;
       let username = ctx.request.body.username;
       let vcomment = new Vcomment({videoId,content,username});
       let res = await vcomment.save();
       if(res.n!=0){
           ctx.body = {
               code:200,
               msg:'发表成功'
           }
       }else {
           ctx.body = {
               code:401,
               msg:'发表失败'
           }
       }
   },
   async getVideoComment(ctx){
       let videoId = ctx.query.id;
       let res = await Vcomment.find({videoId:videoId});
       if(res.length!=0){
           ctx.body = {
               code:200,
               res
           }
       }else{
           ctx.body = {
               code:401,
               msg:'查询失败'
           }
       }
   },
   async downloadVideos(ctx){
       let filePath = ctx.query.id;
      // console.log(filePath);
       let path = `/public/${filePath}`;
       ctx.attachment(path);
       await send(ctx,path);
   },
   async watchMsg(ctx){
       console.log(ctx.request.body);
       let username = ctx.request.body.username;
       let topic = ctx.request.body.topic;
       let time = ctx.request.body.time;
       time = Math.floor(time);
       let filePath = ctx.request.body.filePath;
       let content = ctx.request.body.content;
       let videoId = ctx.request.body._id;
       let flag = true;
       let re = await VideosWatchMsg.find({username,topic});
       if(re.length!=0){
           let resp = await VideosWatchMsg.updateOne({username,topic},{username,topic,time,filePath,content,videoId,flag});
           console.log(resp);
           if(resp.nModified==1){
               ctx.body ={
                   code:200
               }
           }else{
               ctx.body = {
                   code:401
               }
           }
           return;
       }

       let vWatch = new VideosWatchMsg({username,topic,time,filePath,content,videoId,flag});
       let res = await vWatch.save();
       if(res.length!=0){
           ctx.body = {
               code:200,
           }
       }else{
           ctx.body =  {
               code:401
           }
       }
   },
   async getWatchMsg(ctx){
       let username = ctx.query.username;
       let res = await VideosWatchMsg.find({username,flag:true});
       if(res.length!=0){
           ctx.body = {
               code:200,
               res
           }
       }else{
           ctx.body = {
               code:401
           }
       }
   },
   async setFlag(ctx){
       console.log(ctx.request.body);
       let username = ctx.request.body.username;
       let topic = ctx.request.body.topic;
       let videoId = ctx.request.body.videoId;
       let flag = false;
       let res = await VideosWatchMsg.updateOne({username,topic,videoId},{flag:flag});
       console.log(res);
       if(res.nModified == 1){
           ctx.body = {
               code:200
           }
       }else{
           ctx.body = {
               code:401
           }
       }
   },
   async play(ctx){
        let _id = ctx.query.id;
        let res = await Video.find({_id});
        let  file = res[0].filePath;

        
        let fpath = path.join(__dirname,`../public/${file}`);
        let stat = fs.statSync(fpath);
        let fileSize = stat.size;
        let range  = ctx.headers.range;

        if (range) {
            let parts = range.replace(/bytes=/, "").split("-");
            let start = parseInt(parts[0], 10);
            let end = parts[1] ? parseInt(parts[1], 10) : start + 999999;
    
            // end 在最后取值为 fileSize - 1 
            end = end > fileSize - 1 ? fileSize - 1 : end;
    
            let chunksize = (end - start) + 1;
            let file = fs.createReadStream(fpath, { start, end });
            ctx.status=206;
            ctx.set({
                'Content-Range': `bytes ${start}-${end}/${fileSize}`,
                'Accept-Ranges': 'bytes',
                'Content-Length': chunksize,
                'Content-Type': 'video/mp4',
            })
            ctx.body = file;
        } else {
            ctx.status=200;
            ctx.set({
                'Content-Length': fileSize,
                'Content-Type': 'video/mp4',
            })
            ctx.body = fs.createReadStream(fpath);
        }
   },
   async playNum(ctx){
       let videoId = ctx.query.id;
       console.log(videoId);
       let res = await VideosWatchMsg.find({videoId});
       let playnum = res.length;
       console.log(res.length);
       ctx.body = {
           code:200,
           playnum
       }
   },
   async studyTime(ctx){
       let username = ctx.query.username;
       let res = await VideosWatchMsg.find({username});
       let stuTime=0;
       for(let i=0; i<res.length; i++){
           stuTime = stuTime+Number(res[i].time);
       }
       ctx.body = {
           code:200,
           stuTime
       }
   }


}