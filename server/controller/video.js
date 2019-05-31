const Video = require('../db/db.js').Video
const Vcomment = require('../db/db.js').Vcomment
const VideosWatchMsg = require('../db/db.js').VideosWatchMsg
const ffmpeg = require('ffmpeg')
const path = require('path')
const send = require('koa-send');

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
   }



}