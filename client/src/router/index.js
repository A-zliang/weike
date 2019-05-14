import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/font/login'
import home from '@/components/font/home'
import register from '@/components/font/register'
import video from '@/components/font/video'
import userinfo from '@/components/font/userinfo'
import talk from '@/components/font/talk'
import userinfoMsg from '@/components/font/userinfoMsg'
import userinfoMy from '@/components/font/userinfoMy'
import userinfoClass from '@/components/font/userinfoClass'
import course from '@/components/font/course'
import coursePlan from '@/components/font/coursePlan'
import courseSource from '@/components/font/courseSource'
import adminLogin from '@/components/admin/adminLogin'
import main from '@/components/admin/main'
import user from '@/components/admin/user'
import fileAdmin from '@/components/admin/fileAdmin'
import classAdmin from '@/components/admin/classAdmin'
import store from '../store/index'
Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: home,
      meta:{
        requiresAuth: true
      }
    }, 
    {
      path: '/home',
      name: 'home',
      component: home,
      meta:{
        requiresAuth: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/video',
      name: 'video',
      component: video,
      meta:{
        requiresAuth: true
      }
    },
    {
      path:'/register',
      name: 'register',
      component: register
    },
    {
      path: '/userinfo',
      name: 'userinfo',
      component: userinfo,
      meta:{
        requiresAuth: true
      },
      children:[
        {
          path:'userinfoMsg',
          component:userinfoMsg,
          meta:{
            requiresAuth: true
          }
        },
        {
          path:'userinfoMy',
          component:userinfoMy,
          meta:{
            requiresAuth: true
          }
        },
        {
          path:'userinfoClass',
          component:userinfoClass,
          meta:{
            requiresAuth: true
          }
        },
        {
          path:'/',
          redirect:'userinfoMy',
          meta:{
            requiresAuth: true
          }
        }
      ]
    },
    {
      path: '/talk',
      name: 'talk',
      component: talk,
      meta:{
        requiresAuth: true
      }
    },
    {
      path: '/adminLogin',
      name: adminLogin,
      component:adminLogin
    },
    {
      path: '/main',
      name: main,
      component:main,
      children:[
        {
            path:'user',
            component:user,
        },
        {
          path:'classAdmin',
          component:classAdmin,
        },
        {
          path:'fileAdmin',
          component:fileAdmin,
        },{
          path:'/',
          component:user
        }
      ]
    },
    {
      path:'/course',
      name:'course',
      component: course
    },
    {
      path:'/coursePlan',
      name:'coursePlan',
      component: coursePlan
    },
    {
      path:'/courseSource',
      name:'courseSource',
      component: courseSource
    }
  ]
})

//注册全局钩子用来拦截导航
router.beforeEach((to, from, next) => {
  //获取store里面的token
  let token = store.state.user.token;
  //判断要去的路由有没有requiresAuth
  if(to.meta.requiresAuth){
      if(token){
        next();
      }else{
        next({
          path: '/login',
          query: { redirect: to.fullPath }  // 将刚刚要去的路由path（却无权限）作为参数，方便登录成功后直接跳转到该路由
        });
      } 
  }else{
    next();
  }
});

export default router;