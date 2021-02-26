import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter);

const routes = [{
    path: '',
    redirect: '/site'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login.vue')
  },
  {
    path: '/reset',
    name: 'reset',
    component: () => import('@/views/Reset.vue')
  },
  {
    path: '/helperSE',
    name: 'helperse',
    component: () => import('@/views/HelperSE.vue')
  },
  {
    path: '/helperEN',
    name: 'helperen',
    component: () => import('@/views/HelperEN.vue')
  },
  {
    path: '/power/:tp/:id/:sec',
    name: 'power',
    component: () => import('@/views/Power.vue')
  },
  {
    path: '/site',
    name: 'site',
    meta: { requiresAuth:true },
    component: () => import('@/views/MainSite.vue')
  },
  {
    path: '/maps',
    name: 'maps',
    component: () => import('@/views/Maps.vue')
  },
  {
    path: '/admsto',
    name: 'admsto',
    meta: { requiresAuth:true, requiresAdmin:true },
    component: () => import('@/views/AdmSto.vue')
  },
  {
    path: '/admapp',
    name: 'admapp',
    meta: { requiresAuth:true, requiresAdmin:true },
    component: () => import('@/views/AdmApp.vue')
  },
  {
    path: '/admbeep',
    name: 'admbeep',
    meta: { requiresAuth:true, requiresAdmin:true },
    component: () => import('@/views/AdmBeep.vue')
  },
  {
    path: '/admmgr',
    name: 'admmgr',
    meta: { requiresAuth:true },
    component: () => import('@/views/AdmMgr.vue')
  },
  {
    path: '/useroper',
    name: 'useroper',
    meta: { requiresAuth:true },
    component: () => import('@/views/Useroper.vue')
  },
  {
    path: '/device0',
    name: 'device0',
    meta: { requiresAuth:true },
    component: () => import('@/views/Device0.vue')
  },
  {
    path: '/device1',
    name: 'device1',
    meta: { requiresAuth:true },
    component: () => import('@/views/Device1.vue')
  },
  {
    path: '/prize',
    name: 'prize',
    meta: { requiresAuth:true },
    component: () => import('@/views/Prize.vue')
  },
  {
    path: '/mystore',
    name: 'mystore',
    meta: { requiresAuth:true },
    component: () => import('@/views/Mystore.vue')
  },
  {
    path: '/setup',
    name: 'setup',
    meta: { requiresAuth:true },
    component: () => import('@/views/Setup.vue')
  },
  {
    path: '/startup',
    name: 'startup',
    meta: { requiresAuth:true },
    component: () => import('@/views/Startup.vue')
  },
  {
    path: '/user',
    name: 'user',
    meta: { requiresAuth:true },
    component: () => import('@/views/User.vue')
  },
  {
    path: '/recharge',
    name: 'recharge',
    meta: { requiresAuth:true },
    component: () => import('@/views/Recharge.vue')
  },
  {
    path: '/chargeac',
    name: 'chargeac',
    meta: { requiresAuth:true },
    component: () => import('@/views/Chargeac.vue')
  },
  {
    path: '/chargebk',
    name: 'chargebk',
    meta: { requiresAuth:true },
    component: () => import('@/views/Chargebk.vue')
  },
  {
    path: '/iccard',
    name: 'iccard',
    meta: { requiresAuth:true },
    component: () => import('@/views/Iccard.vue')
  },
  {
    path: '/feecard',
    name: 'feecard',
    meta: { requiresAuth:true },
    component: () => import('@/views/Feecard.vue')
  },
  {
    path: '/freeuser',
    name: 'freeuser',
    meta: { requiresAuth:true },
    component: () => import('@/views/Freeuser.vue')
  },
  {
    path: '/psnyymaster',
    name: 'psnyymaster',
    meta: { requiresAuth:true },
    component: () => import('@/views/PsnYYmaster.vue')
  },
  {
    path: '/psnyymoney',
    name: 'psnyymoney',
    meta: { requiresAuth:true },
    component: () => import('@/views/PsnYYmoney.vue')
  },
  {
    path: '/yydaycharger',
    name: 'yydaycharger',
    meta: { requiresAuth:true },
    component: () => import('@/views/YYdaycharger.vue')
  },
];

const router = new VueRouter({
  routes
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    let token = localStorage.getItem('token');
    let user = JSON.parse(localStorage.getItem('user'));
    if (token) {
      var theapi = '/auth?tm=' + new Date().getTime() + '&token=' + token;
      Vue.axios.get(theapi).then(axresp => {
        if (axresp.status==200) {
          if (to.matched.some(record => record.meta.requiresAdmin)) {
            if (user && user.isadmin) {
              next();
            } else {
              next({ path:'/startup'});
            }
          } else {
            next();
          }
        } else {
          localStorage.removeItem('user');
          localStorage.removeItem('token');
          next({ path:'/login', params:{ nextUrl:to.fullPath } });
        }
      });
    } else {
      next({ path:'/login', params:{ nextUrl:to.fullPath } });
    }
  } else {
    next();
  }
});

export default router
