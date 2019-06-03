const User = require('../db/db.js').User;

module.exports = {
    async getAllUser(ctx){
        let {size = 1,page = 1} = ctx.query;
        let options = {
            skip: Number((page-1)*size),
            limit: Number(size),
        }
        let res = await User.find({},null,options);
        let total = await User.countDocuments();
        if(res.length!=0){
             ctx.body = {
                code:200,
                res,
                total
            }
        }else{
            ctx.body = {
                code:401,
                msg:'获取失败'
            }
        }
       
    },
   async deleteUser(ctx){
        let _id = ctx.params.id;
        console.log(_id);
        let res = await User.deleteOne({_id});
        console.log(res);
        if(res.n!=0){
            ctx.body = {
                code:200,
                msg:"删除成功"
            }
        }else{
            ctx.body = {
                code:401,
                msg:'删除失败'
            }
        }
    },
   async search(ctx){
       let username = ctx.query.username;
       console.log(username);
       let res = await User.find({username:{$regex:username}});
       if(res.length!=0){
           ctx.body = {
               code:200,
               res
           }
       }else{
           ctx.body = {
               code:401,
               msg:'查找失败'
           }
       }
   },
   async editUserInfo(ctx){
       let username = ctx.request.body.username;
       let _id = ctx.request.body._id;
       let classNum = ctx.request.body.classNum;
       let email = ctx.request.body.email;
       let identity = ctx.request.body.identity;
       let res = await User.update({_id:_id},{$set:{classNum:classNum,username:username,email:email,identity:identity}});
       if(res.n!=0){
           ctx.body = {
               code:200,
               msg:'提交成功'
           }
       }else{
           ctx.body = {
               code:400,
               msg:'提交失败'
           }
       }
   }
}