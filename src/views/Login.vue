<template>
  <div class="container">
    <b-navbar>
      <b-navbar-nav class="ml-auto">
        <b-nav-item @click="setLocale">{{$t('message.language')}} <b-avatar size="2.5em" v-t.text="'message.langto'"></b-avatar></b-nav-item>
      </b-navbar-nav>
    </b-navbar>
    <b-tabs class="xnpanel p-3">
      <b-tab :title="$t('message.login_title')">
        <b-form-group>
          <p class="mt-4">&nbsp;</p>
          <b-form-input size="lg" type="text" v-model="uid" :placeholder="$t('message.login_mobile')" required maxlength="32"></b-form-input>
        </b-form-group>
        <b-form-group>
          <p class="mt-4">&nbsp;</p>
          <b-form-input size="lg" type="password" v-model="pas" :placeholder="$t('message.login_passwd')" required maxlength="16"></b-form-input>
        </b-form-group>
        <b-form-group v-if="!uamobile" class="ml-2">
          <p class="mt-4">&nbsp;</p>
          <b-form-checkbox v-model="savepw">{{$t('message.login_save_pwd')}}</b-form-checkbox>
        </b-form-group>
        <b-form-group>
          <p class="mt-4">&nbsp;</p>
          <b-button block size="lg" variant="success" @click="loginow">{{$t('message.login_text')}}
          </b-button>
        </b-form-group>
        <b-form-group class="mt-5">
          <div class="loginmsg">{{errormsg}}</div>
          <div class="text-right mt-3">
            <b-button to="/reset" variant="primary mr-2">{{$t('message.login_btn_resetpw')}}</b-button>
            <b-button v-b-modal.modal-1 variant="primary mr-2">{{$t('message.login_btn_join')}}</b-button>
            <b-button :to="'/helper'+$i18n.locale" variant="primary">{{$t('message.login_btn_help')}}</b-button>
          </div>
        </b-form-group>
      </b-tab>
    </b-tabs>
    <p class="p-3 text-right text-black-50">
      <a class="btn btn-lg well-lg absver" href="//www.mosf.cn/">V {{ver}}</a>
    </p>
    <div><a class="btn btn-lg well-lg absrb" href="//www.mosf.cn/" title="深圳小牛新能源有限公司">深圳小牛新能源有限公司</a></div>
    <div><a class="btn btn-lg well-lg absmiit" href="http://beian.miit.gov.cn/" target="_blank" title="查看网站备案信息">粤ICP备17085407号-2</a></div>
    <b-modal size="lg" id="modal-1" hide-footer>
      <b-popover target="showme" triggers="hover">
        <b-img src="/images/openassist.png" alt="assist"></b-img>
      </b-popover>
      <template v-slot:modal-title>{{$t('message.login_start')}}</template>
      <div class="p-3">
        <span v-html="$t('message.login_begin')"></span>
        <div class="text-center">
          <b-img src="/images/openassis.png" fluid alt="wechat" width="666px" id="showme"></b-img>
        </div>
        <div class="text-info" v-html="$t('message.login_st1')"></div>
        <div class="text-info" v-html="$t('message.login_st2')"></div>
        <div class="text-danger" v-html="$t('message.login_st3')"></div>
        <div class="text-info" v-html="$t('message.login_st4')"></div>
        <div class="text-right mt-4" v-html="$t('message.login_st5')"></div>
      </div>
      <b-button variant="success" class="mt-3" block @click="$bvModal.hide('modal-1')">{{$t('message.btn_ok')}}</b-button>
    </b-modal>
    <b-modal id="multiAppSelector" scrollable size="lg" no-close-on-backdrop no-close-on-esc hide-footer header-bg-variant="warning" title="同时管理多个应用,请选择:">
      <b-row class="p-4" cols="1">
        <div class="mb-3 pr-3" v-for="dat in loginapps" :key="dat.id">
        <b-button size="lg" variant="outline-primary" block @click="selectme(dat.id)">{{dat.appname}}({{dat.id}})</b-button>
        </div>
      </b-row>
    </b-modal>
  </div>
</template>
<style>
  .absver{
      color: #ccc;
      text-decoration: none;
  }
  .absrb{
      position: absolute;
      bottom:5%;
      right:5%;
      color: #ccc;
      text-decoration: none;
      text-shadow:-1px -1px 0 #fff, 1px 1px 0 #ccc, 1px 1px 0 #333;
  }
  .absmiit{
      position: absolute;
      bottom:1%;
      right:5%;
      color: #ccc;
      text-decoration: none;
  }
.body {
  position: absolute;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  background: radial-gradient(
    200% 100% at bottom center,
    #f7f7b6,
    #e96f92,
    #1b2947
  );
  background: radial-gradient(
    200% 105% at top center,
    #1b2947 10%,
    #75517d 40%,
    #e96f92 65%,
    #f7f7b6
  );
  background-attachment: fixed;
  overflow: hidden;
}
</style>
<script>
  import { isMobile } from '@/consv'
  import { APPVERSION } from '@/config'
  export default {
    name: 'login',
    mounted() {
    },
    data() {
      return {
        savepw: localStorage.spw==undefined?true:localStorage.spw,
        uamobile: isMobile(),
        uid: localStorage.uid,
        pas: localStorage.pas,
        ver: APPVERSION,
        selectedappid:'',
        loginapps:[],
        errormsg: ''
      };
    },
    methods: {
      loginow() {
        if (!this.uid || this.uid.length<2) {
          this.errormsg = '登陆账户错误';
        } else if (!this.pas || this.pas.length<5) {
          this.errormsg = '登陆密码不对';
        } else {
        localStorage.removeItem('dftapp');
        let theapi = '/login?tm=' + new Date().getTime() + '&uid=' + this.uid + '&pas=' + this.pas;
        if (this.selectedappid) {
          theapi = theapi + '&app='+this.selectedappid;
        }
        this.axios.get(theapi).then(axresp => {
          if (axresp.data.rc==1) {
            let user = axresp.data.user;
            localStorage.setItem('token', axresp.data.token);
            localStorage.setItem('user',JSON.stringify(user));
            if (this.savepw) {
              localStorage.setItem('spw', this.savepw);
              localStorage.setItem('uid', this.uid);
              localStorage.setItem('pas', this.pas);
            } else {
              localStorage.removeItem('spw');
              localStorage.removeItem('uid');
              localStorage.removeItem('pas');
            }
            if(this.$route.params.nextUrl){
              this.$router.push(this.$route.params.nextUrl);
            } else {
              if(user && user.isadmin){
                this.$router.push('admapp');
              } else {
                this.$router.push('startup');
              }
            }
          } else {
            this.errormsg = axresp.data.rm;
            if (axresp.data.rc>1){
              this.loginapps = axresp.data.loginapps;
              this.$bvModal.show('multiAppSelector');
            }
          }
        });
        }
      },
      selectme(id) {
        this.$bvModal.hide('multiAppSelector');
        this.selectedappid = id;
        this.loginow();
      },
      setLocale() {
        if (this.$i18n.locale=='EN') {
          localStorage.setItem('locale', 'SE');
          this.$i18n.locale='SE';
        } else {
          localStorage.setItem('locale', 'EN');
          this.$i18n.locale='EN';
        }
      },
    },
  }
</script>
