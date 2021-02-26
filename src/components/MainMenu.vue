<template>
  <b-navbar toggleable="sm" type="light" variant="faded mb-3">
    <b-navbar-brand to="startup">
      <b-img src="/logo.png" fluid></b-img>
    </b-navbar-brand>

    <b-navbar-toggle target="nav-collapse">({{appname|trans}})<b-icon icon="chevron-bar-down"></b-icon>
    </b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item to="user">{{$t('message.mnu_user')}}<span class="d-sm-none d-md-inline-block">{{$t('message.mnu_mgrch')}}</span></b-nav-item>
        <b-nav-item to="site">{{$t('message.mnu_site')}}<span class="d-sm-none d-md-inline-block">{{$t('message.mnu_mgrch')}}</span></b-nav-item>
        <b-nav-item-dropdown :text="$t('message.mnu_devices')">
          <b-dropdown-item to="device0" class="p-1">{{$t('message.mnu_device0')}}</b-dropdown-item>
          <b-dropdown-item to="device1" class="p-1">{{$t('message.mnu_device1')}}</b-dropdown-item>
          <b-dropdown-item to="device2" class="p-1" disabled>{{$t('message.mnu_device2')}}</b-dropdown-item>
          <b-dropdown-divider></b-dropdown-divider>
          <b-dropdown-item to="iccard" class="p-1">{{$t('message.mnu_iccard')}}</b-dropdown-item>
          <b-dropdown-divider v-show="isadm"></b-dropdown-divider>
          <b-dropdown-item v-show="isadm" :to="{path:'device0',query:{siteid:0,tm:new Date().getTime()}}" class="p-1">{{$t('message.mnu_device3')}}</b-dropdown-item>
          <b-dropdown-item v-show="isadm" :to="{path:'device1',query:{siteid:0,tm:new Date().getTime()}}" class="p-1">{{$t('message.mnu_device4')}}</b-dropdown-item>
          <b-dropdown-item v-show="isadm" :to="{path:'device2',query:{siteid:0,tm:new Date().getTime()}}" class="p-1" disabled>{{$t('message.mnu_device5')}}</b-dropdown-item>
        </b-nav-item-dropdown>
        <b-nav-item to="recharge">{{$t('message.mnu_prepay')}}</b-nav-item>
        <b-nav-item-dropdown :text="$t('message.mnu_bill')">
          <b-dropdown-item to="chargebk" class="p-1">{{$t('message.mnu_bkbill')}}</b-dropdown-item>
          <b-dropdown-item to="chargeac" class="p-1">{{$t('message.mnu_acbill')}}</b-dropdown-item>
          <b-dropdown-item to="chargedc" class="p-1" disabled>{{$t('message.mnu_dcbill')}}</b-dropdown-item>
        </b-nav-item-dropdown>
        <b-nav-item-dropdown :text="$t('message.mnu_more')">
          <b-dropdown-item to="setup" class="p-1">{{$t('message.mnu_param')}}</b-dropdown-item>
          <b-dropdown-item to="yydaycharger" class="p-1">{{$t('message.mnu_cnt')}}</b-dropdown-item>
          <b-dropdown-item to="feecard" class="p-1">{{$t('message.mnu_vmoney')}}</b-dropdown-item>
          <b-dropdown-item to="freeuser" class="p-1">{{$t('message.mnu_free')}}</b-dropdown-item>
          <b-dropdown-item :to="{path:'useroper',query:{tm:new Date().getTime()}}" class="p-1">{{$t('message.mnu_oper')}}</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-nav-item @click="logout" class="d-none d-md-block">
          <b-icon icon="power" variant="danger"></b-icon>
        </b-nav-item>
        <b-nav-item disabled class="d-none d-lg-block">({{appname|trans}})</b-nav-item>
        <b-nav-item-dropdown right>
          <template v-slot:button-content>
            <span class="d-none d-md-inline-block">{{nickname}}</span>
          </template>
          <b-dropdown-item to="psnyymaster" class="p-1">{{$t('message.mnu_cooper')}}</b-dropdown-item>
          <b-dropdown-item to="psnyymoney" class="p-1">{{$t('message.mnu_coopfee')}}</b-dropdown-item>
          <b-dropdown-divider></b-dropdown-divider>
          <b-dropdown-item to="mystore" class="p-1">
            <b-icon icon="clock" variant="success"></b-icon> {{$t('message.mnu_mystore')}}
          </b-dropdown-item>
          <b-dropdown-divider v-show="isadm"></b-dropdown-divider>
          <b-dropdown-item v-show="isadm" to="admmgr" class="p-1">
            <b-icon icon="unlock" variant="danger"></b-icon> *{{$t('message.mnu_mgr')}}
          </b-dropdown-item>
          <b-dropdown-item v-show="isadm" to="admsto" class="p-1">
            <b-icon icon="x-diamond" variant="danger"></b-icon> *{{$t('message.mnu_sto')}}
          </b-dropdown-item>
          <b-dropdown-item v-show="isadm" to="admapp" class="p-1">
            <b-icon icon="app-indicator" variant="danger"></b-icon> *{{$t('message.mnu_app')}}
          </b-dropdown-item>
          <b-dropdown-item v-show="isadm" to="admbeep" class="p-1">
            <b-icon icon="patch-plus" variant="danger"></b-icon> *{{$t('message.mnu_beep')}}
          </b-dropdown-item>
          <b-dropdown-item v-show="isadm" to="maps" class="p-1">
            <b-icon icon="map" variant="danger"></b-icon> *{{$t('message.mnu_maps')}}
          </b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
  export default {
    name: 'MainMenu',
    data() {
      let user = JSON.parse(localStorage.getItem('user'));
      if (user==undefined) {
        user = {'isadmin':false,'appname':'(+)','nickname':'(*)','headimgurl':'/logo.png'};
      }
      return {
        isadm: user.isadmin,
        appname: user.appname,
        nickname: user.nickname,
        headimgurl: user.headimgurl
      };
    },
    methods: {
      logout() {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        localStorage.removeItem('dftapp');
        localStorage.removeItem('spw');
        localStorage.removeItem('uid');
        localStorage.removeItem('pas');
        this.$router.push('login');
      },
    }
  }
</script>
