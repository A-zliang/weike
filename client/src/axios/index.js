import axios from 'axios';
import store from '../store';
import router from '../router';

// 全局设置
axios.defaults.timeout = 60000; // 时间超时设置60s
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';

// 创建一个axios的实列
const instance = axios.create();
instance.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';

axios.interceptors.request.use = instance.interceptors.request.use;

// request拦截器，每次发送请求的时候拦截下来
instance.interceptors.request.use(
  config => {
    // 每次发送请求，检查 vuex 中是否有token,如果有放在headers中
    if(store.state.user.token){
      config.headers.Authorization = store.state.user.token;
    }
    return config;
  },
  err => {
    return Promise.reject(err);
  }
)

// respone拦截器
instance.interceptors.response.use(
  response => {
    return response;
  },
  // 除了200以外的请求到这里来，，这里的200不是我们设置的那个code200,,我这里是，没有登录才会不返回200
  error => {
    let { response } = error;
    if(response != null){
      // 这里为什么处理401错误,详见，server/untils/token check_token这个函数
      if(response.status == 401) {
        let msg = response.data || '请重新登录!';
        alert(msg);
        store.commit("remove")  // token过期,清除
        router.replace({ //跳转到登录页面
            path: '/login',
            // 添加一个重定向后缀，等登录以后再到这里来
            query: { redirect: router.currentRoute.fullPath } 
        });
        return Promise.reject(error.response);
      }
    }else {
      console.log(error)
    }
  }
)

// 添加API请求
// 这里填写的url见 server/routes/index.js 记住一定要配置代理，不然会返回404错误
export default {
  api_login_user(data){
    return instance.post('/api/user/login', data);
  },
  api_register_user(data){
    return instance.post('/api/user/register', data);
  },
  api_get_emailCode(data){
    return instance.post('/api/emailcode',data);
  },
  api_publish(data){
    return instance.post('/api/publish',data);    
  },
  api_get_comment(data){
     let {page = 1, size = 5} = data;
    return instance.get(`/api/comment?page=${page}&size=${size}`);
  },
  api_publish_leave(data){
    return instance.post('/api/publish/leave',data);    
  },
  api_like(data){
    return instance.post('/api/like',data);    
  },
  api_change_userData(data){
    return instance.post('/api/changeInfo', data);
  },
  api_add_class(data){
    return instance.post('/api/add/class', data);
  },
  api_join_class(data){
    return instance.post('/api/join/class', data);
  },
  api_get_student(data){
    return instance.post('/api/get/student',data);
  },
  api_upload(data1,data2){
    return instance.post('/api/upload',data1,data2);
  },
  api_get_class(data){
      return instance.get(`/api/get/class?calssNum=${data}`);
  },
  api_delete_class(data){
    return instance.delete(`/api/delete/class/${data}`);
  },
  api_get_userData(data){
    return instance.get(`/api/get/userData?username=${data}`);
  },
  api_get_homework(data){
    return instance.get(`/api/get/homework?classNum=${data}`);
  },
  api_downloadFile(data){
    return instance.get(`/api/download/file?id=${data}`);
  },
  api_send_stuHomework(data1,data2){
    return instance.post('/api/send/stuHomework',data1,data2);
  },
  api_getstuList(data){
    return instance.get(`/api/get/getstuList?classNum=${data}`);
  },
  api_get_allUser(data){
    let {page = 1, size = 1} = data;
    return instance.get(`/api/get/alluser?page=${page}&size=${size}`);
  },
  api_delete_user(data){
    return instance.delete(`/api/delete/user/${data}`);
  },
  api_search(data){
    return instance.get(`/api/search?username=${data}`);
  },
  api_submit_user(data){
    return instance.post('/api/send/user',data);
  },
  api_upload_video(data1,data2){
    return instance.post('/api/upload/video',data1,data2);
  },
  api_get_videos(){
    return instance.get('/api/get/videos');
  },
  api_deleteVideo(data){
    return instance.delete(`/api/delete/video/${data}`)
  },
  api_get_VideoMsg(data){
    let {page = 1, size = 6} = data;
    return instance.get(`/api/get/videoMsg?page=${page}&size=${size}`);
  },
  api_push_videoComment(data){
    return instance.post('/api/publish/videoComment',data);
  },
  api_get_videoComment(data){
    return instance.get(`/api/get/videoComment?id=${data}`);
  },
  api_set_nav(data){
    return instance.post('/api/set/nav',data);
  },
  api_get_navData(data){
    return instance.get('/api/get/navData');
  },
  api_updata_navData(data){
    return instance.post('/api/updata/navData',data);
  },
  api_delete_nav(id){
    return instance.delete(`/api/delete/nav/${id}`);
  },
  api_set_bookMsg(data){
    return instance.post('/api/set/bookMsg',data);
  },
  api_get_bookMsg(){
    return instance.get('/api/get/bookMsg');
  },
  api_delete_classStu(data){
    return instance.post(`/api/delete/classStu`,data);
  },
  api_set_bookUnit(data){
    return instance.post('/api/set/bookUnit',data);
  },
  api_updata_bookUnit(data){
    return instance.post('/api/update/bookUnit',data);
  },
  api_delete_bookUnit(data){
    return instance.post(`/api/delete/bookUnit`,data);
  },
  api_change_avatar(data){
    return instance.post('/api/change/avatar',data);
  },
  api_admin_login(data){
    return instance.post('/api/admin/login',data);
  },
  api_change_adminMsg(data){
    return instance.post('/api/change/adminMsg',data);
  },
  api_upload_file(data1,data2){
    return instance.post('/api/upload/file',data1,data2);
  },
  api_get_files(){
    return instance.get('/api/get/files');
  },
  api_delete_homework(data){
    return instance.delete(`/api/delete/homework/${data}`)
  },
  api_delete_file(data){
    return instance.delete(`/api/delete/file/${data}`);
  },
  api_send_watchMsg(data){
    return instance.post('/api/send/watchMsg',data);
  },
  api_get_watchMsg(data){
    return instance.get(`/api/get/watchMsg?username=${data}`);
  },
  api_set_flag(data){
    return instance.post('/api/set/flag',data);
  }
}