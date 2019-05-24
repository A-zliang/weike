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
   },
   async bookUnit(ctx){
       //console.log(ctx.request.body);
       let msg = ctx.request.body;
       let res =await book.update({},{$push:{bookContent:msg}});
       console.log(res);
       if(res.length!=0){
           ctx.body={
               code:200,
               msg:'添加成功'
           }
       }
   },
   async bookUpdate(ctx){
       let _id = ctx.request.body._id;
       let topic = ctx.request.body.nav;
       let content = ctx.request.body.content;
       let msg = {
           topic,
           content
       }
       let res = await book.find({});
       let bookArr =  res[0].bookContent;
        for(let i=0;i<bookArr.length;i++){
            if(bookArr[i]._id == _id){
                console.log(i);
                bookArr.splice(i,1,msg);
            }
        }
     let res2 = await book.update({},{$set:{bookContent:bookArr}});
     if(res2.length!=0){
         ctx.body = {
             code:200,
             msg:'修改成功'
         }
     }else{
         ctx.body = {
             code:401
         }
     }
   },
   async deleteBookUnit(ctx){
       let _id = ctx.request.body._id;    
       let res = await book.find({});
       let bookArr =  res[0].bookContent;
       for(let i=0;i<bookArr.length;i++){
        if(bookArr[i]._id == _id){
            bookArr.splice(i,1);
        }
    }
    let res2 = await book.update({},{$set:{bookContent:bookArr}});
    console.log(res2);
    if(res2.nModified!=0){
        ctx.body = {
            code:200
        }
    }else{
        code:401
    }
   }
}
