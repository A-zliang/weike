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
import moreVideo from '@/components//font/moreVideo'
import adminLogin from '@/components/admin/adminLogin'
import main from '@/components/admin/main'
import user from '@/components/admin/user'
import fileAdmin from '@/components/admin/fileAdmin'
import classAdmin from '@/components/admin/classAdmin'
import adminWebsite from '@/components/admin/adminWebsite'

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
      component:adminLogin,
    },
    {
      path: '/main',
      name: main,
      component:main,
      meta:{
        requiresAuth2: true
      },
      children:[
        {
            path:'user',
            component:user,
            meta:{
              requiresAuth2: true
            }
        },
        {
          path:'adminWebsite',
          component:adminWebsite,
          meta:{
            requiresAuth2: true
          }
      },
        {
          path:'classAdmin',
          component:classAdmin,
          meta:{
            requiresAuth2: true
          }
        },
        {
          path:'fileAdmin',
          component:fileAdmin,
          meta:{
            requiresAuth2: true
          }
        },{
          path:'/',
          component:adminWebsite,
          meta:{
            requiresAuth2: true
          }
        }
      ]
    },
    {
      path:'/course',
      name:'course',
      component: course,
      meta:{
        requiresAuth: true
      }
    },
    {
      path:'/coursePlan',
      name:'coursePlan',
      component: coursePlan,
      meta:{
        requiresAuth: true
      }
    },
    {
      path:'/courseSource',
      name:'courseSource',
      component: courseSource,
      meta:{
        requiresAuth: true
      }
    },
    {
      path:'/moreVideo',
      name:'moreVideo',
      component:moreVideo,
      meta:{
        requiresAuth: true
      }
    }
  ]
})

//注册全局钩子用来拦截导航
router.beforeEach((to, from, next) => {
  //获取store里面的token
  let token = store.state.user.token;
  let token2 = store.state.admin.token;
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
  }else if(to.meta.requiresAuth2){
      if(token2){
        next();
      }else{
        next({
          path: '/adminLogin',
          query: { redirect: to.fullPath }  // 将刚刚要去的路由path（却无权限）作为参数，方便登录成功后直接跳转到该路由
        });
      } 
  }
  else{
    next();
  }
});

export default router;