import Vue from 'vue'
const state = {
    update_list:[],
    loading:true,
    all_app:[],
    interval:'',
    check_run:{},
    button_status:false,
    upgrade_status:{},
    run_task:{
      },
    display_result:false
};
const mutations = {
    set_update_list(state,newdata){
      console.log(newdata,"2222222222222222");
      state.update_list = newdata
    },
    set_all_app(state,newdata){
      state.all_app = newdata;
    },
    set_loading(state,newdate){
      state.loading = newdate
    }
};
const actions = {
    get_update_list({state, commit, rootState}){
      // 获取服务器上升级用的应用包列表
      Vue.http.get(rootState.request_url+"/appupdate/v1/app_up_list/"
        ).then(function (resp) {
          console.log(resp.data);
          if(resp.data.message){
            window.app.$message({
                showClose: true,
                message:resp.data.message,
                type: 'error'
              });
            console.log(resp.data)
          }else{
            commit('set_update_list',resp.data.update_list);
            if(JSON.stringify(resp.data.error_list) !== '[]'){
              window.app.$message({
                showClose: true,
                message:"未知应用包 :"+ resp.data.error_list.join(','),
                type: 'error'
              });
            }
          }
        });

    },

    get_app_list({state, commit, rootState}){
      // 获取左侧所有应用的数据，在那台服务器等信息
      Vue.http.get(rootState.request_url+"/appupdate/v1/app_info/"
      ).then(function (resp) {
        console.log(resp);
        commit('set_all_app',resp.data);
        commit('set_loading',false)
      });
      },

    get_help_message({state, commit, rootState}){
      // 获取帮助信息
      Vue.http.get(rootState.request_url+"/api/v1/app_uppackge_dir/"
      ).then(function (resp) {
        window.app.$notify({
          title:"帮助信息",
          type: 'warning',
          duration:5000,
          message: resp.data.message
        })
      });
      },

    run_check({state, commit, rootState},data){
      // 执行检查主机连接状态任务
      state.button_status = true;
      Vue.http.post(rootState.request_url+"/appupdate/v1/check/",data,{
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
            window.app.$message({
            message: '执行完毕',
            type: 'success'
            });
        clearInterval(state.interval);
        state.check_run = resp.data;
        state.button_status = false
      }).catch(function (resp) {
        console.log(resp,"error");
      });
      },

    get_ip_status({state, commit, rootState}){
      // 获取主机连接状态任务
          var interval = setInterval(function () {
            Vue.http.get(rootState.request_url+"/appupdate/v1/ip_status/"
            ).then(function (resp) {
              console.log(resp.data);
              state.check_run = resp.data
              })
          },500);
          state.interval = interval;
    },

    run_upgrade({state, commit, rootState},data){
      // 执行升级任务
      state.button_status = true;
      Vue.http.post(rootState.request_url+"/appupdate/v1/app_update/",data,{
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
            window.app.$message({
            message: '执行完毕',
            type: 'success'
            });
        clearInterval(state.interval);
        state.run_task = resp.data;
        state.button_status = false
      }).catch(function (resp) {
          console.log(resp,"error");
        });
      },

    get_upgrade_status({state, commit, rootState}){
      // 获取执行任务的执行结果
          var interval = setInterval(function () {
            Vue.http.get(rootState.request_url+"/appupdate/v1/app_update_status/"
            ).then(function (resp) {
              console.log(resp.data);
              state.run_task = resp.data
              })
          },500);
          state.interval = interval;
    },
  get_result({state, commit, rootState}){
      state.button_status = true;
      // 获取本次升级结果
      state.display_result = false;
      Vue.http.get(rootState.request_url+"/appupdate/v1/update_status_record/"
        ).then(function (resp) {
            console.log(resp.data);
            state.upgrade_status = resp.data;
            state.display_result = true
            state.button_status = false;
            });
    },
};


export default {
  state,
  actions,
  mutations
}
