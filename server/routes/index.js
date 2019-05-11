const router = require('koa-router')()
const user = require('../controller/user.js')
const comment = require('../controller/comment.js')
const classInfo = require('../controller/classInfo.js')
const adminUser = require('../controller/adminUser.js')
const adminFile = require('../controller/adminFile.js')



router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})
//用户登录注册
router.post('/api/user/login',user.login)
router.post('/api/user/register',user.register)
router.post('/api/emailcode',user.emailCode)
router.post('/api/changeInfo',user.infoChange)
router.get('/api/get/userData',user.getUserData)

//留言
router.post('/api/publish',comment.add_leave)
router.get('/api/comment',comment.getComment)
router.post('/api/publish/leave',comment.add_more_leave)
router.post('/api/like',comment.like)

router.post('/api/add/class',classInfo.add_class)
router.post('/api/join/class',classInfo.join_class)
router.post('/api/get/student',classInfo.getData)
router.post('/api/upload',classInfo.upload)    //发布作业
router.get('/api/get/class',classInfo.getClassData)
router.delete('/api/delete/class/:data',classInfo.deleteClass)
router.get('/api/get/homework',classInfo.getHomework)
router.get('/api/download/file',classInfo.downloadFile)
router.post('/api/send/stuHomework',classInfo.sendHomework)
router.get('/api/get/getstuList',classInfo.getstuList)
router.get('/api/get/stuFile',classInfo.getStuFile)

//管理员
router.get(`/api/get/alluser`,adminUser.getAllUser)
router.delete('/api/delete/user/:id',adminUser.deleteUser)
router.get('/api/search',adminUser.search)
router.post('/api/send/user',adminUser.editUserInfo)
router.post('/api/upload/video',adminFile.uploadVideo)
router.get('/api/get/videos',adminFile.getVideos)
router.delete('/api/delete/video/:id',adminFile.deleteVideo)


module.exports = router
