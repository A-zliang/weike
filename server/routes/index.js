const router = require('koa-router')()
const user = require('../controller/user.js')
const comment = require('../controller/comment.js')
const classInfo = require('../controller/classInfo.js')
const adminUser = require('../controller/adminUser.js')
const adminFile = require('../controller/adminFile.js')
const video = require('../controller/video.js')
const adminWeb = require('../controller/adminWeb.js')



router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})
//用户登录注册
router.post('/api/user/login',user.login)   //登录
router.post('/api/user/register',user.register)  //注册
router.post('/api/emailcode',user.emailCode)   //获取验证码
router.post('/api/changeInfo',user.infoChange)  //修改信息
router.get('/api/get/userData',user.getUserData)   //获取用户信息
router.post('/api/change/avatar',user.changeAvatar)
//留言
router.post('/api/publish',comment.add_leave)   //添加留言
router.get('/api/comment',comment.getComment)   //获取留言
router.post('/api/publish/leave',comment.add_more_leave)  //留言下添加留言
router.post('/api/like',comment.like)  //点赞

router.post('/api/add/class',classInfo.add_class)  //增加班级
router.post('/api/join/class',classInfo.join_class)  //加入班级
router.post('/api/get/student',classInfo.getData)   //获取学生信息
router.post('/api/upload',classInfo.upload)    //发布作业
router.get('/api/get/class',classInfo.getClassData)  //获取班级信息
router.delete('/api/delete/class/:data',classInfo.deleteClass)  //删除班级
router.get('/api/get/homework',classInfo.getHomework)   //获取作业
router.get('/api/download/file',classInfo.downloadFile)  //下载文件
router.post('/api/send/stuHomework',classInfo.sendHomework) //学生提交作业
router.get('/api/get/getstuList',classInfo.getstuList)  //获取学生列表
router.get('/api/get/stuFile',classInfo.getStuFile) //获取学生的作业
router.get('/api/get/videoMsg',video.getVideoMsg)  //拿到视频的信息
router.post('/api/publish/videoComment',video.videoComment) //发表视频评论
router.get('/api/get/videoComment',video.getVideoComment)  //获取视频的评论
router.post(`/api/delete/classStu/`,classInfo.deleteClassStu)//教师删除学生
router.delete('/api/delete/homework/:data',classInfo.deleteHomework)  //教师删除作业
router.post('/api/send/watchMsg',video.watchMsg)  //用户观看视频情况
router.get('/api/download/videos',video.downloadVideos)
router.get(`/api/get/watchMsg`,video.getWatchMsg)
router.post('/api/set/flag',video.setFlag)
router.get('/video/play',video.play)
router.get('/api/get/playNum',video.playNum)
router.get('/api/get/stuTime',video.studyTime)
//管理员
router.get(`/api/get/alluser`,adminUser.getAllUser)  //获取所有用户
router.delete('/api/delete/user/:id',adminUser.deleteUser)//删除用户
router.get('/api/search',adminUser.search)//搜索用户
router.post('/api/send/user',adminUser.editUserInfo)//编辑用户信息
router.post('/api/upload/video',adminFile.uploadVideo)//上传信息
router.get('/api/get/videos',adminFile.getVideos)//管理员获取视频信息
router.delete('/api/delete/video/:id',adminFile.deleteVideo)//删除视频
router.post('/api/set/nav',adminWeb.navaAdmin)
router.get('/api/get/navData',adminWeb.getNavData)
router.post('/api/updata/navData',adminWeb.updataNav)
router.delete('/api/delete/nav/:id',adminWeb.deleteNav)
router.post('/api/set/bookMsg',adminWeb.bookMsg)
router.get('/api/get/bookMsg',adminWeb.getBookMsg)
router.post('/api/set/bookUnit',adminWeb.bookUnit)
router.post('/api/update/bookUnit',adminWeb.bookUpdate)
router.post('/api/delete/bookUnit',adminWeb.deleteBookUnit)
router.post('/api/admin/login',adminWeb.adminLogin)
router.post('/api/change/adminMsg',adminWeb.adminMsg)
router.post('/api/upload/file',adminWeb.uploadFiles)
router.get('/api/get/files',adminWeb.getFiles)
router.get('/api/getfile',adminFile.downloadFiles)
router.delete('/api/delete/file/:data',adminFile.deleteFile)
module.exports = router
