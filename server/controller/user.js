const User = require('../db/db.js').User;
const nodeemail = require('../models/eamil.js');
const createCode = require('../models/createCode.js');
//下面这两个包用来生成时间
// const moment = require('moment');
// const objectIdToTimestamp = require('objectid-to-timestamp');
//用于密码加密
const sha1 = require('sha1');
//createToken
const createToken = require('../token/createToken.js');

module.exports = {
    //登录
    async login(ctx, next) {
        let username = ctx.request.body.username;
        let password = ctx.request.body.password;
        if(username == '', password == '') {
            ctx.body = {
                code: 401,
                msg: '登录失败，请输入账号密码'
            }
        }
        password = sha1(password);
        let res = await User.find({username, password});
        if(res.length == 0) {
            ctx.body = {
                code: 401,
                msg: '登录失败，用户名或密码错误'
            }
            return;
        }
        let token = createToken(username);
        res[0].token = token;
        res[0].save();
        // console.log(res[0].email);
        ctx.body = {
            code: 200,
            msg: '登录成功',
            data:{
                _id:res[0]._id,
                username: res[0].username,
                useremail: res[0].email,
                useridentity: res[0].identity,
                classNum: res[0].classNum,
                avatar: res[0].avatar,               
                token
            }
        }
    },
    //注册
    async register(ctx,next) {
        let {username,password,email,identity,code,avatar} =  ctx.request.body;
        if(username == '' || password == '') {
            ctx.body = {
                code: 401,
                msg: '注册失败，请输入账号密码'
            }
            return;
        }
        console.log(avatar);
        let res = await User.find({username});
        if(res.length != 0) {
            ctx.body = {
                code: 401,
                msg: '用户名存在'
            }
            return;
        }
        let res2 = await User.find({email});
        if(res2.length != 0) {
            ctx.body = {
                code: 401,
                msg: '邮箱已注册'
            }
            return;
        }
        password = sha1(password);
        let token = createToken(username);
        let user = new User({username,avatar,password,token,email,identity,});

        res = await user.save();
        if(res.length != 0) {
            ctx.body = {
                code:200,
                msg: '注册成功',
                data:{
                    username,
                    token
                }
            }
        }
    },


    async emailCode(ctx,next){
        let email = ctx.request.body.email; 
        let ecode =  createCode();      
        let sendText = {
            from: 'zl799@foxmail.com',
            subject: '微课网验证码',
            to: email,
            text: '您的验证码是:'+ ecode+'.'
        }
        ctx.body = {
            code: 200,
            data:{
                ecode
            } 
        }
        await nodeemail(sendText);
    },


    async infoChange(ctx,next){
        let {username,password1,password2,email,backCode} =  ctx.request.body;
         let password = sha1(password1);
        if(email == ''){
            let res = await User.update({username:username},{$set:{password:password}});
            ctx.body = {
                code: 200,
                msg: '密码修改成功',
            }
            return;
        }
        if((password1 == '')&&(password1 == '')){
            let res = await User.update({username:username},{$set:{email:email}});
            let res2 = await User.find({username});
            console.log(res2);
            ctx.body = {
                code: 200,
                msg: '邮箱修改成功',
                data:{
                    _id:res[0]._id,
                    username: res2[0].username,
                    useremail: res2[0].email,
                    useridentity: res2[0].identity,                
                    token:res2[0].token,
                    avatar:res2[0].avatar
                }
            }
            return;
        }
       
        let res = await User.update({username:username},{$set:{email:email,password:password}});
        let res2 = await User.find({username});
        ctx.body = {
            code: 200,
            msg: '修改成功',
            data:{
                _id:res[0]._id,
                username: res2[0].username,
                useremail: res2[0].email,
                useridentity: res2[0].identity,                
                token:res2[0].token,
                avatar:res2[0].avatar
            }
        }
        return;
    },
    async getUserData(ctx){
        let username = ctx.query.username;
        let res = await User.find({username});
        if(res.length != 0){
            ctx.body = {
                code: 200,
                msg: '登录成功',
                data:{
                    username: res[0].username,
                    useremail: res[0].email,
                    useridentity: res[0].identity,
                    classNum: res[0].classNum,                
                    token:res[0].token,
                    avatar:res[0].avatar
                }
            }
        }
    },
}