const ClassList = require('../db/db.js').ClassList;
const HomeWork = require('../db/db.js').HomeWork;
const StuHomework = require('../db/db.js').StuHomework;
const User = require('../db/db.js').User;
const sha1 = require('sha1');
const fs = require('fs');
const archiver = require('archiver');  //用于压缩文件
const path = require("path")
const send = require('koa-send');

module.exports = {
    async add_class(ctx,next){
        let {classNum,classpassword,student,teacher,homework} = ctx.request.body;
        classpassword = sha1(classpassword);
        // console.log(ctx.request.body);
        let res = await ClassList.find({classNum,teacher});
        // console.log(res);
        if(res.length != 0){
            ctx.body = {
                code: 401,
                msg: '创建失败'
            }
            return;
        }
        let classlist = new ClassList({classNum,classpassword,student,teacher,homework});
        
        res = await classlist.save();
        let re = await User.update({username:teacher},{$set:{classNum:classNum}});
        if((res.length != 0)&&(re.length != 0)){
            ctx.body = {
                code: 200,
                msg: '创建成功'
            }
        }
    },
    async join_class(ctx,next){
        let {username,classNum,classpassword} = ctx.request.body;
        classpassword = sha1(classpassword);
        
        let re = await User.update({username:username},{$set:{classNum:classNum}});
        let res = await User.find({username});
        let res2 = await ClassList.update({classNum:classNum,classpassword:classpassword},{$push:{student:res[0]}});

       
        if((res2.n != 0)&&(res.length != 0)&&(re.n!=0)){
            ctx.body = {
                code: 200,
                msg: '加入成功'
            }
        } else{
            let num = '';
            re = await User.update({username:username},{$set:{classNum:num}});
            ctx.body = {
                code: 401,
                msg: '加入失败'
            }
        }
    },
    async getData(ctx,next){
        let classNum = ctx.request.body.classNum;
        let res = await ClassList.find({classNum:classNum});
        if(res.length != 0){
            ctx.body = {
               code: 200,
               data:{
                  res
               }
            }
        }else {
            ctx.body = {
                code: 401
            }
        }
    },
    async upload(ctx){  
        let topic = ctx.request.body.topic;
        let content = ctx.request.body.content;
        let classNum = ctx.request.body.classNum;
        let username = ctx.request.body.username;
        let user_identity = ctx.request.body.user_identity;
        let length = ctx.request.body.length;
        let file =[];
        let filePath =[];

        if(length==1){
            file = ctx.request.files.file;
            let reader = fs.createReadStream(file.path); // 创建读入流
            let ext = file.name.split('.').pop(); // 获取上传文件扩展名
            filePath[0] = path.join(__dirname, '../public/upload/') + `${topic}.${ext}`;
            const upStream = fs.createWriteStream(filePath[0]); // 创建可写流
            reader.pipe(upStream); // 可读流通过管道写入可写流
        } else{
            filePath[0] = path.join(__dirname, '../public/upload/') + `${topic}`+'.zip'; 
            var output = fs.createWriteStream(filePath[0]); //创建一最终打包文件的输出流
            var zipArchiver = archiver('zip');  //生成archiver对象，打包类型为zip
            zipArchiver.pipe(output);       //将打包对象与输出流关联

            for(let i=0; i<length; i++){
                file[i] = ctx.request.files.file[i]; // 获取上传文件
                zipArchiver.append(fs.createReadStream(file[i].path), {'name': file[i].name});
             }
            zipArchiver.finalize();
        }

        let homework = new HomeWork({classNum,topic,content,filePath,username,user_identity});
        let res = await homework.save();
        console.log(res);
        if(res.length!=0){
            ctx.body = {
                code: 200,
                msg: '发布成功'
            }
        }else {
            ctx.body = {
                code: 401,
                msg:'发布失败'
            }
        }
       
    },
    async getClassData(ctx){
        let classNum =  ctx.query.classNum;
        let res = await ClassList.find(classNum);
        if(res.length != 0){
            ctx.body={
                code:200,
                data:{
                    classNum: res[0].classNum,
                    teacher: res[0].teacher,
                    student:res[0].student,
                    create_time: res[0].create_time
                }
            }
        } else{
            ctx.body ={
                code:401
            }
        }
        
    },
    async deleteClass(ctx){
        let setNull = '';
        let classNum = ctx.params.data;
        
        let res = await ClassList.find({classNum});
        console.log(res[0]);
        let res2 = await ClassList.findOneAndRemove({classNum})
        
        if(res2 == null){
            ctx.body = {
                code:500,
                msg:'删除失败'
            }
        } else{
            for(let i=0; i<res[0].student.length; i++){
                let res3 = await User.update({username:res[0].student[i].username},{$set:{classNum:setNull}});
                console.log('res3:'+res3);
            }
            let res4 = await User.update({username:res[0].teacher},{$set:{classNum:setNull}});
            console.log('res4'+res4);
            ctx.body = {
                code: 200,
                msg:'删除成功'
            }
        }
    },
    async getHomework(ctx){
        let classNum ={
            classNum: ctx.query.classNum
        }  
        let res = await HomeWork.find(classNum);
        if(res.length!=0){
            ctx.body = {
                code: 200,
                res
            }
        }else{
            ctx.body={
                code:401
            }
        }
    },
    async downloadFile(ctx){
        let id = ctx.query.id;
        let res = await HomeWork.find({_id:id});
        //拿到后缀
        let index =  res[0].filePath[0].lastIndexOf(".");
        let ext = res[0].filePath[0].substring(index+1);

        let path = `/public/upload/${res[0].topic}.${ext}`;
        ctx.attachment(path);
        await send(ctx,path);
    },
    async sendHomework(ctx){      //提交作业
        let homework_id = ctx.request.body.id;
        let res = await HomeWork.find({_id:homework_id});
        let topic = res[0].topic;
        let content = res[0].content;
        let classNum = ctx.request.body.classNum;
        let username = ctx.request.body.username;
        let user_identity = ctx.request.body.user_identity;
        let length = ctx.request.body.length;
        let file =[];
        let filePath =[];
        if(length==1){                             //单个文件
            file = ctx.request.files.file;
            let reader = fs.createReadStream(file.path); // 创建读入流
            let ext = file.name.split('.').pop(); // 获取上传文件扩展名
            filePath[0] = path.join(__dirname, `../public/upload_stu/`)+`${res[0].topic}--${username}.${ext}`;
            const upStream = fs.createWriteStream(filePath[0]); // 创建可写流
            reader.pipe(upStream); // 可读流通过管道写入可写流
        }else{
            filePath[0] = path.join(__dirname, `../public/upload_stu/`) + `${res[0].topic}--${username}`+'.zip'; 
            var output = fs.createWriteStream(filePath[0]); //创建一最终打包文件的输出流
            var zipArchiver = archiver('zip');  //生成archiver对象，打包类型为zip
            zipArchiver.pipe(output);       //将打包对象与输出流关联

            for(let i=0; i<length; i++){
                file[i] = ctx.request.files.file[i]; // 获取上传文件
                zipArchiver.append(fs.createReadStream(file[i].path), {'name': file[i].name});
             }
            zipArchiver.finalize();
        }
        let res4 = await StuHomework.find({homework_id,username});
        if(res4.length != 0){  //有提交记录，重新提交，覆盖。然后将所有文件压缩
        let res5 = await StuHomework.update({homework_id,username},{$set:{filePath:filePath[0]}});


        /*将所有学生文件压缩到一个压缩包*/
        res = await StuHomework.find({homework_id});
        console.log(res);
        //压缩
        let zipPath = path.join(__dirname, `../public/${homework_id}.zip`);
        //创建一最终打包文件的输出流
        let output = fs.createWriteStream(zipPath);
        //生成archiver对象，打包类型为zip
        let zipArchiver = archiver('zip');
        //将打包对象与输出流关联
        zipArchiver.pipe(output);
        for(let i=0; i<res.length; i++){
            console.log(res[i].filePath[0]);
            //拿到后缀
            let index =  res[i].filePath[0].lastIndexOf(".");
            let ext = res[i].filePath[0].substring(index+1);
            zipArchiver.append(fs.createReadStream(res[i].filePath[0]), {'name':`${res[i].username}.${ext}`});
        }
        //打包
        zipArchiver.finalize();
            if(res5.n != 0){
                ctx.body = {
                    code:200,
                    msg:'提交成功'
                }
            }
        }else{    //第一次提交
            let stuhomework = new StuHomework({homework_id,username,topic,content,filePath});
            let res2 =  await stuhomework.save();
            if(res2.length!=0){
              let res3 = await HomeWork.update({_id:homework_id},{$push:{"submit":username}});

              /*将所有学生文件压缩到一个压缩包*/
               res = await StuHomework.find({homework_id});
               //压缩
               let zipPath = path.join(__dirname, `../public/${homework_id}.zip`);
               //创建一最终打包文件的输出流
               let output = fs.createWriteStream(zipPath);
               //生成archiver对象，打包类型为zip
               let zipArchiver = archiver('zip');
               //将打包对象与输出流关联
               zipArchiver.pipe(output);
               for(let i=0; i<res.length; i++){
                   console.log(res[i].filePath[0]);
                   //拿到后缀
                   let index =  res[i].filePath[0].lastIndexOf(".");
                   let ext = res[i].filePath[0].substring(index+1);
                   zipArchiver.append(fs.createReadStream(res[i].filePath[0]), {'name':`${res[i].username}.${ext}`});
               }
               //打包
               zipArchiver.finalize();



               ctx.body = {
                    code:200,
                    msg:'提交成功'
                }
            }else{
                ctx.body = {
                    code:401,
                    msg:'提交失败'
                }
            }
        }
    },

    async getstuList(ctx){  //获取班级学生名单
        let stuArray = [];
        let classNum = ctx.query.classNum;
        let res = await ClassList.find({classNum});
        for(let i=0; i<res[0].student.length; i++){
            stuArray[i] = res[0].student[i].username;
        }
        ctx.body = {
            code:200,
            stuArray
        }
    },
    async getStuFile(ctx){
        let homework_id = ctx.query.id;
        let path = `/public/${homework_id}.zip`;
        await send(ctx,path);
    },
    async deleteClassStu(ctx){
        let setNull = '';
        let classNum = ctx.request.body.classNum;
        let _obj = ctx.request.body;
        let _id = ctx.request.body._id;
        let res = await ClassList.find({classNum});
        let student = res[0].student;
        
        let p = student.indexOf(_obj);
        student.splice(p,1);
        let res2 = await ClassList.update({classNum:classNum},{$set:{student:student}});
        if(res.length!=0){
            let res3 = await User.update({_id},{$set:{classNum:setNull}});
            ctx.body = {
                code:200
            }
        }else{
            ctx.body = {
                code:401
            }
        }
    },
    async deleteHomework(ctx){
        let _id = ctx.params.data;
         let res = await HomeWork.find({_id});
            let index =  res[0].filePath[0].lastIndexOf(".");
            let ext = res[0].filePath[0].substring(index+1);
            let filePath = path.join(__dirname,'../public/upload/')+`${res[0].topic}.${ext}`;
            fs.unlink(filePath,(err)=>{
                if(err){
                   console.log(err);
                   return false;
                }
                console.log('教师文件删除成功');
           });
           let filePath2;
            let res3 = await StuHomework.find({homework_id:_id});
            for(let i=0; i<res3.length; i++){
                let index2 =  res3[i].filePath[0].lastIndexOf(".");
                let ext2 = res3[i].filePath[0].substring(index2+1);
                filePath2 = path.join(__dirname, `../public/upload_stu/${res[0].topic}--${res3[i].username}`)+`.${ext2}`;
                console.log('------');
                console.log(filePath2);
                fs.unlink(filePath2,(err)=>{
                    if(err){
                       console.log(err);
                       return false;
                    }
                    console.log('学生作业文件删除成功');
               });
            }
            let res4 = await StuHomework.remove({homework_id:_id});
            let res2 = await HomeWork.findOneAndDelete({_id});
            let filePath3 = path.join(__dirname,`../public/${_id}.zip`);
            fs.unlink(filePath3,(err)=>{
                if(err){
                   console.log(err);
                   return false;
                }
                console.log('学生作业文件删除成功');
           });
            ctx.body = {
                code:200,
                msg:'删除成功'
            }
        },

     
}
