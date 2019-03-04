// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Axios from 'axios'
import 'animate.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'animate.css/animate.css'
import update from '@/components/store/update'
import hostconf from '@/components/store/hostconf'
import apppath from '@/components/store/apppath'
import history from '@/components/store/history'
import login from '@/components/store/login'

Vue.use(ElementUI);
Vue.use(Vuex);


var whiteList = ['login'];
router.beforeEach((to, from, next) => {
  var token = sessionStorage.getItem('token');
  if (!token && whiteList.indexOf(to.name) === -1) {
    app && app.$message({
        type: 'warning',
        message: '未授权，请登陆授权后继续'
      });
    return next({name: 'login'})
  }
  return next()
});
Axios.defaults.validateStatus = status => {
  return status < 500
};
Axios.interceptors.request.use(config => {
  var token = sessionStorage.getItem('token');
  config.headers['Authorization'] = token;
  // console.log(config)
  return config
});

Axios.interceptors.response.use(res => {
  if (res.status === 403) {
    app && app.$message({
      type: 'warning',
      message: '登录身份过期，请重新登录。'
    });
    sessionStorage.removeItem('token');
    router.push({name: 'login'});
    return Promise.reject(new Error('身份过期'))
  } else {
    return res
  }
}, err => {
  app.$notify.error({
    title: '服务错误',
    message: '服务器响应错误 ' + err.message
  });
  return Promise.reject(err)
});

Vue.prototype.$http = Axios;
Vue.http = Axios;

Vue.config.productionTip = false;



var server_host_ip_and_port = window.location.host;

const store = new Vuex.Store({
  state: {
    request_url:"http://"+ "192.168.6.126:8000"
  },
  mutations: {
    // 用来设置升级列表的

  },
  actions:{
    // 用来获取升级列表的

  },
  modules:{
    update,
    hostconf,
    apppath,
    history,
    login
  }

});


/* eslint-disable no-new */
var app = new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});

window.app = app;
