const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/weike');

let db = mongoose.connection;

mongoose.Promise = global.Promise;

db.on('error', function(){
    console.log('数据库连接出错！');
});
db.on('open', function(){
    console.log('数据库连接成功！');
});


//声明schema    Schema ： 一种以文件形式存储的数据库模型骨架，不具备数据库的操作能力
//用户
const userSchema = mongoose.Schema({
    username: String,
    avatar: String,
    password: String,
    email: String,
    identity: String,
    token: String,
    classNum:{
        type: String,
        default: ''
    },
    create_time:{
        type: String,
        default: Date.now 
    },
});

//留言
const commentSchema = mongoose.Schema({
    username: String,
    content: String,
    like: [],
    create_time:{
        type: String,
        default: Date.now 
    },
    mComment:[]
});
//班级
const classSchema = mongoose.Schema({
        classNum: String,
        classpassword:String,
        student: [],
        create_time:{
            type: String,
            default: Date.now 
        },
        teacher: String,
})
// 老师发布作业信息
const homeworkSchema = mongoose.Schema({
    classNum:String,
    topic:String,
    content:String,
    submit:[],
    filePath:[],
    publish_time:{
        type: String,
        default: Date.now 
    },
    username:String,
    user_identity:String
})
//学生作业
const stuHomeworkSchema = mongoose.Schema({
    homework_id:String,
    username:String,
    topic:String,
    content:String,
    filePath:[],
    create_time:{
        type:String,
        default:Date.now
    }
})
// 视频信息
const videoSchema = mongoose.Schema({
    topic:String,
    content:String,
    clickNum:Number,
    filePath:String,
    create_time:{
        type:String,
        default:Date.now
    }
})
//视频评论
const VcommentSchema = mongoose.Schema({
    videoId:String,
    content:String,
    username:String,
    create_time:{
        type:String,
        default:Date.now
    }
})
// 课程简介
const introSchema = mongoose.Schema({
    nav:String,
    content:String
})

const bookSchema = mongoose.Schema({
    pic:String,
    left:[],
    right:[]
})
exports.User = mongoose.model('User',userSchema);
exports.Comment = mongoose.model('Comment',commentSchema);
exports.ClassList = mongoose.model('ClassList',classSchema);
exports.HomeWork = mongoose.model('HomeWork',homeworkSchema);
exports.StuHomework = mongoose.model('StuHomework',stuHomeworkSchema);
exports.Video = mongoose.model('Video',videoSchema);
exports.Vcomment = mongoose.model('Vcomment',VcommentSchema);
exports.intro = mongoose.model('intro',introSchema);
exports.book = mongoose.model('book',bookSchema);


