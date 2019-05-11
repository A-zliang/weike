const Comment = require('../db/db.js').Comment;
const User = require('../db/db.js').User;
module.exports = {
    async add_leave(ctx){
        let username = ctx.request.body.username;
        let content = ctx.request.body.content;
        let like = ctx.request.body.like;
        let mComment = ctx.request.body.mComment;
        console.log(username+ ','+content+','+like);
        if(content == ''){
            ctx.body = {
                code: 401,
                msg: '内容不能为空'
            }
            return;
        }
        let comment = new Comment({username,content,like});
        let res = await comment.save();
        console.log(res);
        if(res.length != 0){
            ctx.body = {
                code: 200,
                msg:'发布成功'
            }
        }
    },
    async getComment(ctx){
        let {size = 5,page = 1} = ctx.query;
        let options = {
            skip: Number((page-1)*size),
            limit: Number(size),
        }
        let res = await Comment.find({},null,options).sort({"_id":-1});
        let list = [];
        let obj = {
            like:[],
            mComment: [],
            _id:'',
            username:'',
            content:'',
            create_time: '',
            avatar:''
        }
        for(let i=0; i<res.length; i++){
            let res2 = await User.find({username:res[i].username});
            //res[0]['avatar'] = 'res2[0].avatar';
            obj.like = res[i].like;
            obj.mComment = res[i].mComment;
            obj._id = res[i]._id;
            obj.username = res[i].username;
            obj.content = res[i].content;
            obj.create_time = res[i].create_time;
            obj.avatar = res2[0].avatar;
            list.push(obj);
            obj = {
                like:[],
                mComment: [],
                _id:'',
                username:'',
                content:'',
                create_time: '',
                avatar:''
            }
         }
        let total = await Comment.countDocuments();
        ctx.body = {
            code: 200,
            msg:'返回成功',
            data:{
              list:  list || [],
              total
            } 
        }
    },

    async add_more_leave(ctx){
        let res = await Comment.update({_id:ctx.request.body.id},{$push:{"mComment":ctx.request.body}});
        
        if(res.length != 0){
            ctx.body = {
                code: 200,
                msg: '发表成功'
            }
        }
    },

    async like(ctx){
        let res = await Comment.update({_id:ctx.request.body.id},{$push:{"like":ctx.request.body.user}});
        console.log(res);
        ctx.body = {
            code: 200,
            msg: '点赞成功'
        }
    }



}