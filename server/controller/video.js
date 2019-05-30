const Video = require('../db/db.js').Video
const Vcomment = require('../db/db.js').Vcomment
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
        console.log(total);
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
       console.log(res);
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
       console.log(filePath);
       let path = `/public/${filePath}`;
       ctx.attachment(path);
       await send(ctx,path);
   }
}