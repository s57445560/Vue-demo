import Vue from 'vue'
import qs from 'qs';
const state = {
  tableData:{},
  error:'',
  dialogFormVisible:false,
  fullscreenLoading:true,
  form:{}
};

const mutations = {
  set_ip_list(state,newdata){
      state.tableData = newdata;
    },
  delete_ip_list(state,newdata){
    console.log(newdata,state.tableData.results);
    state.tableData.results.splice(newdata, 1)
  },
  change_ip_list(state,newdata){
    state.tableData.results.splice(newdata.index,1,newdata.data)
  },
  append_ip_list(state,newdata){
    state.tableData.count++;
    if(state.tableData.results.length <10) {
      state.tableData.results.push(newdata)
    }else{
      console.log('大于10个不添加')
    }
  },
  set_error(state,newdata){
      state.error = newdata;
    },
  set_dialogFormVisible(state,newdata){
    state.dialogFormVisible = newdata
  },
  set_form(state,newdata){
    state.form = newdata
  },
  set_fullscreenLoading(state,newdata){
    state.fullscreenLoading = newdata
  },
};
const actions = {
    get_ip_list({state, commit, rootState},data){
      console.log(rootState.request_url);
      Vue.http.get(rootState.request_url+"/api/v1/ip/",{
        params:data
      }).then(function (resp) {
        console.log(resp);
        commit('set_ip_list',resp.data);
        commit('set_fullscreenLoading',false)
      });
    },
    get_ip_update({state, commit, rootState},data){
      Vue.http.put(rootState.request_url+"/api/v1/ip/" + data.form.id + "/",{
        data:data.form,
      }).then(function (resp) {
        if(resp.data.error){
          window.app.$message.error("错误信息："+resp.data.error);
        }else{
          window.app.$message.success("IP: "+data.form.IP + " 更新成功！");
          console.log(resp);
          commit("change_ip_list",{index:data.index,data:data.form});
          commit("set_dialogFormVisible",false)
        }
      });
    },
   get_ip_add({state, commit, rootState},data){
      Vue.http.post(rootState.request_url+"/api/v1/ip/",{
        data
      }).then(function (resp) {
        console.log(resp,"6666666666666666");
        if(resp.data.error){
          console.log(resp.data.error);
          window.app.$message.error(resp.data.error);
          return false
        }else {
          commit('append_ip_list', resp.data);
            window.app.$notify({
            title: '成功',
            message: '成功添加一条 IP：'+resp.data.IP,
            type: 'success'
          });
        }
      }).catch(function (resp) {
        console.log(resp,"error")
      });
    },
   delete({state, commit, rootState},data){
     Vue.http.delete(rootState.request_url+"/api/v1/ip/"+data.data.id+"/",).then(function (resp) {
       console.log(data.index);
        commit('delete_ip_list',data.index);
        window.app.$message.success("IP: "+data.data.IP + " 删除成功！");
      });
   }

};


export default {
  state,
  actions,
  mutations
}
