import api from '@/axios'

const state = {
  data: []
}

const actions = {
  async get_userinfo({state,commit},_id){
    let index = state.data.findIndex((item) => {
      return item._id == _id;
    })
    if(index == -1){
      state.data.push({
        _id,
        avatar: '',
        user_name: ''
      })
      // 没有获取
      let res = await api.api_get_user(_id);
      let {code,msg,data} = res.data;
      if(code == 200){
        await commit("save_userinfo",data);
      }
    }
  }
}

const mutations = {
  save_userinfo(state,data){
    let {_id = '',avatar = '',user_name = ''} = data;
    state.data.forEach( item => {
      if(item._id == _id){
        item.avatar = avatar;
        item.user_name = user_name;
        return;
      }
    })
    state.data.push(data);
  }
}

export default {
  state,
  actions,
  mutations
}