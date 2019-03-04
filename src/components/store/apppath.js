import Vue from 'vue'
const state = {
  tableData:[],
  error:'',
  path_fullscreenLoading:true,
  path_dialogFormVisible:false,
  form:{},
  base_data:{}
};

const mutations = {
  set_base_data(state,newdata){
      state.base_data = newdata;
    },
  set_apppath_list(state,newdata){
      state.tableData = newdata;
    },
  change_app_list(state,newdata){
    state.tableData.results.splice(newdata.index,1,newdata.data)
  },
  app_delete_ip_list(state,newdata){
    console.log(newdata,state.tableData.results);
    state.tableData.results.splice(newdata, 1)
  },
  append_app_list(state,newdata){
    state.tableData.count++;
    if(state.tableData.results.length <10) {
      state.tableData.results.push(newdata)
    }else{
      console.log('大于10个不添加')
    }
  },
  app_set_error(state,newdata){
      state.error = newdata;
    },
  set_path_dialogFormVisible(state,newdata){
    state.path_dialogFormVisible = newdata
  },
  set_app_form(state,newdata){
    state.form = newdata
  },
  set_path_fullscreenLoading(state,newdata){
    state.path_fullscreenLoading = newdata
  },
};
const actions = {
    get_app_ip_list({state, commit, rootState}){
      Vue.http.get(rootState.request_url+"/api/v1/app_ip/"
      ).then(function (resp) {
        console.log(resp);
        commit('set_base_data',resp.data);
      });
    },

    get_apppath_list({state, commit, rootState},data){
      console.log(rootState.request_url);
      Vue.http.get(rootState.request_url+"/api/v1/app/",{
        params:data
      }).then(function (resp) {
        console.log(resp);
        commit('set_apppath_list',resp.data);
        commit('set_path_fullscreenLoading',false)
      });
    },
    get_app_update({state, commit, rootState},data){
      Vue.http.put(rootState.request_url+"/api/v1/app/" + data.form.id + "/",data.form,{
        transformRequest: [
            function (data) {
                let params = '';
                for (let index in data) {
                    params += index + "=" + data[index] + "&"
                }
                return params
            }
        ]
      }).then(function (resp) {
        if(resp.data.error){
          window.app.$message.error("错误信息："+ resp.data.error);
        }else{
          window.app.$message.success("APP: "+data.form.App + " 更新成功！");
          console.log(resp);
          commit("change_app_list",{index:data.index,data:data.form});
          commit("set_path_dialogFormVisible",false)
        }
      });
    },
   get_app_add({state, commit, rootState},data){
      Vue.http.post(rootState.request_url+"/api/v1/app/",data,{
        transformRequest: [
            function (data) {
                let params = '';
                for (let index in data) {
                    params += index + "=" + data[index] + "&"
                }
                return params
            }
        ]
      }).then(function (resp) {
        console.log(resp,"6666666666666666");
        if(resp.data.error){
          console.log(resp.data.error);
          window.app.$message.error(resp.data.error);
        }else {
          commit('append_app_list', resp.data);
            window.app.$notify({
            title: '成功',
            message: '成功添加一条 APP：'+resp.data.App,
            type: 'success'
          });
        }
      }).catch(function (resp) {
        console.log(resp,"error")
      });
    },
   app_delete({state, commit, rootState},data){
     Vue.http.delete(rootState.request_url+"/api/v1/app/"+data.data.id+"/",).then(function (resp) {
       console.log(data.index);
        commit('app_delete_ip_list',data.index);
        window.app.$message.success("APP: "+data.data.App + " 删除成功！");
      });
   }

};


export default {
  state,
  actions,
  mutations
}
