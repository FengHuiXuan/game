// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import Mint from 'mint-ui';

import 'animate.css/animate.min.css'
Vue.use(Mint);
Vue.config.productionTip = false
axios.defaults.timeout = 2000
axios.defaults.withCredentials = true
Vue.prototype.$http = axios
function isweixin() {
		var ua = window.navigator.userAgent.toLowerCase();
		if(ua.match(/MicroMessenger/i) == 'micromessenger'){
				return true;
		} else {
				return false;
		}
}
if(isweixin()){
	new Vue({
		el: '#app',
		components: { App },
		template: '<App/>',
		router,
	})
}else{
	alert('请在微信内打开')
}


 
