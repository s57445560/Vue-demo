import Vue from 'vue'
const state = {
  tableData:[],
  history_fullscreenLoading:true
};

const mutations = {
  set_history_list(state,newdata){
      state.tableData = newdata;
    },
  set_history_fullscreenLoading(state,newdata){
      state.history_fullscreenLoading = newdata;
    },
};
const actions = {
    get_history_list({state, commit, rootState},data){
      Vue.http.get(rootState.request_url+"/appupdate/v1/app_update_record/",{
        params:data
      }).then(function (resp) {
        console.log(resp);
        commit('set_history_list',resp.data);
        commit('set_history_fullscreenLoading',false)
      });
    },
};


export default {
  state,
  actions,
  mutations
}
