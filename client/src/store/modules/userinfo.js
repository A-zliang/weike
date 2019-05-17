import api from '@/axios'

const state = {
  data: []
}

const actions = {
 
}

const mutations = {
  save_info(state,data){
    state.data.push(data);
  }
}

export default {
  state,
  actions,
  mutations
}