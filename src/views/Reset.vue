<template>
  <div class="container">
    <div class="xnpanel panel-default p-5" v-show="step<2">
      <div class="panel-body">
        <h6 class="panel-heading">{{$t('message.reset_msg0')}}</h6>
        <div class="panel-title mt-4">{{$t('message.reset_msg1')}}</div>
        <b-form-group>
          <p class="mt-4">&nbsp;</p>
          <b-form-input size="lg" type="text" v-model="umobile" :placeholder="$t('message.login_mobile')" required maxlength="11"></b-form-input>
        </b-form-group>
        <b-form-group>
          <p class="mt-3">&nbsp;</p>
          <b-button variant="success" class="mt-3" block @click="sendsms" v-show="step==0" :disabled="loading">{{$t('message.reset_msg2')}}</b-button>
          <b-button variant="success" class="mt-3" block @click="nextstep" v-show="step==1" :disabled="loading">{{$t('message.btn_nextstep')}}</b-button>
        </b-form-group>
      </div>
      <div class="panel-footer loginmsg">
        {{errormsg}}<b-spinner v-show="loading"></b-spinner>
      </div>
    </div>
    <div class="xnpanel panel-success p-5" v-show="step>1">
      <div class="panel-body">
        <h5 class="panel-heading">{{$t('message.reset_msg3')}}</h5>
        <b-form-group>
          <p class="mt-3">&nbsp;</p>
          <b-form-input size="lg" type="text" v-model="vcode" :placeholder="$t('message.reset_msg4')" required maxlength="6"></b-form-input>
          <p class="mt-3">&nbsp;</p>
          <b-form-input size="lg" type="text" v-model="upw1" :placeholder="$t('message.reset_msg5')" required maxlength="16"></b-form-input>
          <p class="mt-3">&nbsp;</p>
          <b-form-input size="lg" type="text" v-model="upw2" :placeholder="$t('message.reset_msg6')" required maxlength="16"></b-form-input>
        </b-form-group>
        <b-form-group>
          <p class="mt-3">&nbsp;</p>
          <b-button variant="success" class="mt-3" block @click="resetpw" v-show="step==2" :disabled="loading">{{$t('message.reset_msg7')}}</b-button>
          <b-button to="/" variant="success" class="mt-3" block v-show="step==3">{{$t('message.btn_backhome')}}</b-button>
        </b-form-group>
      </div>
      <div class="panel-footer loginmsg">
        {{errormsg}}
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'reset',
    data() {
      return {
        step: 0,
        umobile: '',
        vcode: '',
        upw1: '',
        upw2: '',
        loading: false,
        errormsg: ''
      };
    },
    methods: {
      sendsms() {
        this.errormsg = '';
        if (this.umobile.length != 11) {
          this.errormsg = this.$t('message.reset_err0');
        } else if (isNaN(this.umobile)) {
          this.errormsg = this.$t('message.reset_err1');
        } else {
          this.loading = true;
          let theapi = '/reset1?tm=' + new Date().getTime() + '&mobile=' + this.umobile;
          this.axios.get(theapi).then(axresp => {
            this.loading = false;
            if (axresp.data.rc) {
              this.step = 1;
              this.errormsg = this.$t('message.reset_err2');
            } else {
              this.errormsg = axresp.data.rm;
            }
          });
        }
      },
      nextstep() {
        this.step = 2;
        this.errormsg = this.$t('message.reset_err3');
      },
      resetpw() {
        this.errormsg = '';
        if (this.vcode.length < 4) {
          this.errormsg = this.$t('message.reset_err4');
        } else if (this.upw1.length < 6) {
          this.errormsg = this.$t('message.reset_err5');
        } else if (this.upw1 != this.upw2) {
          this.errormsg = this.$t('message.reset_err6');
        } else {
          this.loading = true;
          var theapi = '/reset2?tm=' + new Date().getTime() + '&mobile=' + this.umobile + '&vcode=' + this.vcode +
            '&pw1=' + this.upw1 + '&pw2=' + this.upw2;
          this.axios.get(theapi).then(axresp => {
            this.loading = false;
            if (axresp.data.rc) {
              this.step = 3;
              this.errormsg = this.$t('message.reset_err7');
            } else {
              this.errormsg = axresp.data.rm;
            }
          });
        }
      }
    }
  }
</script>
