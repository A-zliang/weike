const intro = require('../db/db.js').intro;
const book = require('../db/db.js').book;
const sha1 = require('sha1');
const admin = require('../db/db.js').admin;
const File = require('../db/db.js').file;
const createToken = require('../token/createToken.js');
const fs = require('fs');
const archiver = require('archiver');  //用于压缩文件
const path = require("path")
const send = require('koa-send');
module.exports = {
    async adminMsg(ctx){
        let account = ctx.request.body.account;
        let password = ctx.request.body.password;
        password = sha1(password);
        let res = await admin.update({},{account,password});
        if(res.nModified != 0){
            ctx.body = {
                code:200,
            }
        }else{
            ctx.body = {
                code:401
            }
        }
    },
    async adminLogin(ctx){
        let account = ctx.request.body.account;
        let password = ctx.request.body.checkPass;
        password = sha1(password);
        let _id;
        let re = await admin.find({});
        console.log(re);
        if(re.length!=0){
             _id = re[0]._id;
        }else{
            _id = '';
        }
       
        let token = createToken(account);
        if(_id == ''){
            let a = new admin({account,password,token});
            let add = await a.save();
            let res = await admin.find({account});
            console.log(res);
            ctx.body = {
                code:200,
                data:{
                    _id:res[0]._id,
                    account:res[0].account,
                    token
                }
            }
            return;
        }
        let res2 = await admin.find({account,password});
        console.log('----');
        console.log(res2);
        if(res2.length!=0){
            ctx.body = {
                code:200,
                data:{
                    _id:res2[0]._id,
                    account:res2[0].account,
                    token
                }
            }
        }else{
            ctx.body = {
                code:401
            }
        }
        
    },
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
       console.log(ctx.request.body);
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
            _id,
           topic,
           content
       }
       let res = await book.find({});
       let bookArr =  res[0].bookContent;
        for(let i=0;i<bookArr.length;i++){
            if(bookArr[i]._id == _id){
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
   },
  async uploadFiles(ctx){
      console.log(ctx.request.body);
      let length = ctx.request.body.length;
      let username = ctx.request.body.username;
      let topic = ctx.request.body.topic;
      let file =[];
      let filePath;

      if(length==1){
        file = ctx.request.files.file;
        let reader = fs.createReadStream(file.path); // 创建读入流
        let ext = file.name.split('.').pop(); // 获取上传文件扩展名
        filePath = path.join(__dirname, '../public/upload_files/') + `${topic}.${ext}`;
        const upStream = fs.createWriteStream(filePath); // 创建可写流
        reader.pipe(upStream); // 可读流通过管道写入可写流
    } else{
        filePath = path.join(__dirname, '../public/upload_files/') + `${topic}`+'.zip'; 
        var output = fs.createWriteStream(filePath); //创建一最终打包文件的输出流
        var zipArchiver = archiver('zip');  //生成archiver对象，打包类型为zip
        zipArchiver.pipe(output);       //将打包对象与输出流关联

        for(let i=0; i<length; i++){
            file[i] = ctx.request.files.file[i]; // 获取上传文件
            zipArchiver.append(fs.createReadStream(file[i].path), {'name': file[i].name});
         }
        zipArchiver.finalize();
    }
    let f = new File({topic,username,filePath});
    let res = await f.save();
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
  async getFiles(ctx){
      let res = await File.find({});
      console.log(res);
      if(res.length!=0){
          ctx.body = {
              code:200,
              res
          }
      }
  }
}
