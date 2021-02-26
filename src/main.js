import Vue from 'vue'
import VueI18n from 'vue-i18n'
import App from './App.vue'
import router from './router'
import {
  BootstrapVue,
  IconsPlugin,
  LayoutPlugin,
  ModalPlugin,
  CardPlugin,
  VBScrollspyPlugin,
  DropdownPlugin,
  TablePlugin
} from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
Vue.config.productionTip = false;
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(LayoutPlugin);
Vue.use(ModalPlugin);
Vue.use(CardPlugin);
Vue.use(VBScrollspyPlugin);
Vue.use(DropdownPlugin);
Vue.use(TablePlugin);
Vue.use(VueI18n);
import axios from 'axios'
import { BASE } from '@/config'
import { PAGEIDS } from '@/consv'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios);
Vue.axios.defaults.baseURL = BASE;
Vue.prototype.$pagesize = 12;
let lpagesize = window.localStorage.getItem('_pagesize');
if (lpagesize) {
  Vue.prototype.$pagesize = lpagesize;
}

Vue.filter('idFix', function (pageid) {
  if (!pageid) return '-';
  let pagestr = PAGEIDS[pageid];
  if (pagestr) {
    return pagestr;
  } else {
    return pageid;
  }
});

Vue.filter('toVar1', function (mount) {
  if (mount) {
    return 'outline-success';
  } else {
    return 'outline-secondary';
  }
});

Vue.filter('tmFix', function (tm0) {
    let hr = parseInt(tm0/60);
    let mi = parseInt(tm0%60);
    if (hr<10) hr = '0'+hr;
    if (mi<10) mi = '0'+mi;
    return hr+':'+mi;
});

Vue.filter('a2str', function (arr) {
    let ret = '';
    for(var i=0;i<arr.length;i++){
      ret = ret + arr[i].toFixed(2) + ' ';
    }
    return ret.substr(0,ret.length-1);
});

const i18n = new VueI18n({
  locale: localStorage.getItem('locale') || 'SE',
  messages: {
    'EN': require('./assets/lang/en'),
    'SE': require('./assets/lang/se')
  },
});

Vue.filter('trans', function (engstr) {
  let lo = localStorage.getItem('locale') || 'SE';
  let trastr = i18n.messages[lo].message[engstr];
  if (trastr){
    return trastr;
  } else {
    return engstr;
  }
});

new Vue({
  i18n,
  router,
  render: h => h(App),
  data() {return {};},
  methods: {}
}).$mount('#h5app');
