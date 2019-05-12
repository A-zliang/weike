const Video = require('../db/db.js').Video;

module.exports = {
    async getVideoMsg(ctx){
        let {size = 1,page = 1} = ctx.query;
        let options = {
            skip: Number((page-1)*size),
            limit: Number(size),
        }
        let res  = await Video.find({},null,options);
        let total = await User.countDocuments();
        console.log(res);
        console.log(total);
    }
}