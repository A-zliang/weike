const intro = require('../db/db.js').intro;
const book = require('../db/db.js').book;

module.exports = {
  async  navaAdmin(ctx){
        console.log(ctx.request.body);
        let nav = ctx.request.body.nav;
        let content = ctx.request.body.content;

        let intr = new intro({nav,content});
        let res = await intr.save();
        console.log(res);
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
    async getNavData(ctx){
        let res = await intro.find({});
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
   async updataNav(ctx){
       let _id = ctx.request.body._id;
       let  nav= ctx.request.body.nav;
       let content = ctx.request.body.content;
       let res = await intro.update({_id},{$set:{nav:nav,content:content}});
       if(res.n!=0){
        ctx.body = {
            code:200
        }
       }
   },
   async deleteNav(ctx){
        let _id = ctx.params.id;
        console.log(_id);
        let res = await intro.deleteOne({_id});
        console.log(res);
        if(res.n!=0){
             ctx.body = {
                 code:200
            }
        }
   },
   async bookMsg(ctx){
       let res;
       let left=[];
       let right=[];
       let _id = ctx.request.body._id;
       let pic = ctx.request.body.pic;
       left = ctx.request.body.left;
       right = ctx.request.body.right;
       if(_id == ''){
             let bookmsg =  new book({pic,left,right})
              res  = await bookmsg.save();
       }else{
            res = await book.update({_id},{$set:{pic:pic,left:left,right:right}});
       }
       console.log(res);
       if(res.length!=0){
           ctx.body = {
               code:200,
               msg:'添加成功'
           }
       }else{
            ctx.body = {
                code:401
            }
       }
   },
   async getBookMsg(ctx){
       let res = await book.find({});
       if(res.length!=0){
           ctx.body = {
               code:200,
               res
           }
       }else{
           ctx.body ={
               code:401
           }
       }
   }
}
