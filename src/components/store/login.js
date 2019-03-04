import Vue from 'vue'
const state = {
  tableData:[],
  history_fullscreenLoading:true
};

const mutations = {
};
const actions = {
    login({state, commit, rootState},data){
      Vue.http.post(rootState.request_url+"/api/v1/login/",data,{
        transformRequest:[
              function (data) {
                  let params='';
                  for(let index in data){
                      params+=index+"="+data[index]+"&"
                  }
                  return params
              }
          ]
      }).then(function (resp) {
        console.log(resp,resp.data.msg);
        if(resp.data.msg === true){
          sessionStorage.setItem('token',resp.data.token);
          window.app.$router.push({path:'/'})
        }else{
          window.app.$message.error(resp.data.msg );
        }
      });
    },
};


export default {
  state,
  actions,
  mutations
}
