const Video = require('../db/db.js').Video;

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
    }
}