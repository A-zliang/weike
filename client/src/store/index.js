import Vue from 'vue'
import Vuex from 'vuex'
// import userInfo from './modules/userinfo.js'

Vue.use(Vuex);

const state = {
  user: {
    _id: window.sessionStorage.getItem('_id') || '',
    user_name: window.sessionStorage.getItem('user_name') || '',
    token: window.sessionStorage.getItem('token') || '',
    avatar: window.sessionStorage.getItem('avatar') || '',
    email: window.sessionStorage.getItem('email') || '',
    identity: window.sessionStorage.getItem('identity') || '',
    classNum: window.sessionStorage.getItem('classNum') || '',
  },
  admin:{
    _id: window.sessionStorage.getItem('_id') || '',
    admin_user: window.sessionStorage.getItem('adminuser') || '',
    token: window.sessionStorage.getItem('token') || '',
  }
}

const mutations = {
  save: (state,data) => {
    state.user._id = data._id;
    state.user.token = data.token;
    state.user.user_name = data.user_name;
    state.user.avatar = data.avatar;
    state.user.email = data.email;
    state.user.identity = data.identity;
    state.user.classNum = data.classNum;

    window.sessionStorage.setItem('_id', data._id);
    window.sessionStorage.setItem('token', data.token);
    window.sessionStorage.setItem('user_name', data.user_name);
    window.sessionStorage.setItem('avatar', data.avatar);
    window.sessionStorage.setItem('email', data.email);
    window.sessionStorage.setItem('identity', data.identity);
    window.sessionStorage.setItem('classNum', data.classNum);
  },
  saveAdmin: (state,data) => {
    state.admin._id = data._id;
    state.admin.token = data.token;
    state.admin.admin_user = data.admin_user;
    

    window.sessionStorage.setItem('_id', data._id);
    window.sessionStorage.setItem('token', data.token);
    window.sessionStorage.setItem('admin_user', data.admin_user);
  },
  remove: (state) => {
    state.user.token = '';
    state.user.user_name = '';
    state.user.avatar = '';
    state.user._id = '';
    state.user.email = '';
    state.user.identity = '';
    state.user.classNum = '';

    window.sessionStorage.removeItem('_id');
    window.sessionStorage.removeItem('token');
    window.sessionStorage.removeItem('user_name');
    window.sessionStorage.removeItem('avatar');
    window.sessionStorage.removeItem('email');
    window.sessionStorage.removeItem('identity');
    window.sessionStorage.removeItem('classNum');
  },
  removeAdmin: (state) => {
    state.admin.token = '';
    state.admin.admin_user = '';
    state.admin._id = '';
    

    window.sessionStorage.removeItem('_id');
    window.sessionStorage.removeItem('token');
    window.sessionStorage.removeItem('admin_user');
   
  },
  updateClassNum(state,num){
    state.user.classNum = num;
    window.sessionStorage.setItem('classNum', num);
  }
}

export default new Vuex.Store({
  // modules: {
  //   userInfo
  // },
  state,
  mutations
});