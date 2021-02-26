<template>
  <b-container fluid="md">
      <b-row cols="1" cols-sm="1" cols-md="3" cols-lg="3" class="mb-3 pl-3">
      <div class="mb-3 pr-3">
      <b-card header-tag="header" :header="$t('message.st_h0')" class="xnshadow">
        <b-card-text class="text-danger pr-3 h4">{{regusercnt}}</b-card-text>
      </b-card>
      </div>
      <div class="mb-3 pr-3">
      <b-card header-tag="header" :header="$t('message.st_h1')" class="xnshadow">
        <b-card-text class="text-danger pr-3 h4">{{chgusercnt}}</b-card-text>
      </b-card>
      </div>
      <div class="mb-3 pr-3">
      <b-card header-tag="header" :header="$t('message.st_h2')" class="xnshadow">
        <b-card-text class="text-danger pr-3 h4">{{activeucnt}}</b-card-text>
      </b-card>
      </div>
      <div class="mb-3 pr-3">
      <b-card header-tag="header" :header="$t('message.st_h3')" class="xnshadow">
        <b-card-text class="text-info pr-3 h4">{{devicereg0}},{{devicereg1}},{{devicereg2}}</b-card-text>
      </b-card>
      </div>
      <div class="mb-3 pr-3">
      <b-card header-tag="header" :header="$t('message.st_h4')" class="xnshadow">
        <b-card-text class="text-info pr-3 h4">{{deviceols0}},{{deviceols1}},{{deviceols2}}</b-card-text>
      </b-card>
      </div>
      <div class="mb-3 pr-3">
      <b-card header-tag="header" :header="$t('message.st_h5')" class="xnshadow">
        <b-card-text class="text-info pr-3 h4">{{powused0}},{{powused1}},{{powused2}}</b-card-text>
      </b-card>
      </div>
      <div class="mb-3 pr-3">
      <b-card header-tag="header" :header="$t('message.st_h6')" class="xnshadow">
        <b-card-text class="text-warning pr-3 h4">{{fullmoney}}</b-card-text>
      </b-card>
      </div>
      <div class="mb-3 pr-3">
      <b-card header-tag="header" :header="$t('message.st_h7')" class="xnshadow">
        <b-card-text class="text-warning pr-3 h4">{{premonthmn}}</b-card-text>
      </b-card>
      </div>
      <div class="mb-3 pr-3">
      <b-card header-tag="header" :header="$t('message.st_h8')" class="xnshadow">
        <b-card-text class="text-warning pr-3 h4">{{monthmoney}}</b-card-text>
      </b-card>
      </div>
      <div class="mb-3 pr-3">
      <b-card header-tag="header" :header="$t('message.st_h9')" class="xnshadow">
        <b-card-text class="text-warning pr-3 h4">{{todaymoney}}</b-card-text>
      </b-card>
      </div>
      <div class="mb-3 pr-3">
      <b-card header-tag="header" :header="$t('message.st_10')" class="xnshadow">
        <b-card-text class="text-warning pr-3 h4">{{fullretmn}}</b-card-text>
      </b-card>
      </div>
      <div class="mb-3 pr-3">
      <b-card header-tag="header" :header="$t('message.st_11')" class="xnshadow">
        <b-card-text class="text-warning pr-3 h4">{{fullgift}}</b-card-text>
      </b-card>
      </div>
      <div class="mb-3 pr-3">
      <b-card header-tag="header" :header="$t('message.st_12')" class="xnshadow">
        <b-card-text class="text-primary pr-3 h4">{{fullbalance}}</b-card-text>
      </b-card>
      </div>
      <div class="mb-3 pr-3">
      <b-card header-tag="header" :header="$t('message.st_13')" class="xnshadow">
        <b-card-text class="text-primary pr-3 h4">{{fullfree}}</b-card-text>
      </b-card>
      </div>
      <div class="mb-3 pr-3">
      <b-card header-tag="header" :header="$t('message.st_14')" class="xnshadow">
        <b-card-text class="text-primary pr-3 h4">{{cashgets}}</b-card-text>
      </b-card>
      </div>
      <div class="mb-3 pr-3">
      <b-card header-tag="header" :header="$t('message.st_15')" class="xnshadow">
        <b-card-text class="text-secondary pr-3 h4">{{bkminutes}}</b-card-text>
      </b-card>
      </div>
      <div class="mb-3 pr-3">
      <b-card header-tag="header" :header="$t('message.st_16')" class="xnshadow">
        <b-card-text class="text-secondary pr-3 h4">{{pluginver}}</b-card-text>
      </b-card>
      </div>
      <div class="mb-3 pr-3">
      <b-card header-tag="header" :header="$t('message.st_17')" class="xnshadow">
        <b-card-text class="text-secondary pr-3 h4">{{cretime}}</b-card-text>
      </b-card>
      </div>
      </b-row>
  </b-container>
</template>

<script>
  export default {
    name: 'startup',
    mounted() {
      this.fetchData();
    },
    data() {
      return {
        admnodft: false,
        pluginver: '',
        powfix: 0,
        onekeycharg0: 0,
        onekeycharg1: 0,
        onekeycharg2: 0,
        allowdstart0: 0,
        allowdstart1: 0,
        allowdstart2: 0,
        chargelimit: 0,
        regusercnt: 0,
        chgusercnt: 0,
        activeucnt: 0,
        bkminutes: 0,
        powused0: 0,
        powused1: 0,
        powused2: 0,
        deviceols0: 0,
        deviceols1: 0,
        deviceols2: 0,
        devicereg0: 0,
        devicereg1: 0,
        devicereg2: 0,
        fullmoney: 0,
        fullretmn: 0,
        fullgift: 0,
        fullbalance: 0,
        fullfree: 0,
        cretime:0,
        premonthmn:0,
        monthmoney:0,
        todaymoney:0,
        cashgets:0,
        newendtm: '',
        evpofees: ['0.50', '0.70', '1.10', '0.70', '0.00', '30'],
        bkprize: ['0.40', '0.50', '0.60', '0.90', '1.20', '1.60'],
        evpoints: [0, 420, 690, 840, 1080, 1380, 1440],
        evpofeeid: [0, 1, 2, 1, 2, 0],
        workingdataid: -1,
        returnfee: false,
        pagesize: this.$pagesize
      };
    },
    methods: {
      fetchData() {
        let user = JSON.parse(localStorage.getItem('user'));
        let dftapp = localStorage.getItem('dftapp');
        if (user.isadmin && !dftapp) {
          this.admnodft = true;
        } else {
          this.admnodft = false;
        }
        if (!this.admnodft) {
          let token = localStorage.getItem('token');
          let theapi = '/setread?tm=' + new Date().getTime() + '&token=' + token;
          this.axios.get(theapi).then(axresp => {
            if (axresp.status == 200) {
              let item = axresp.data.Item;
              this.returnfee = item.returnfee;
              this.pluginver = item.pluginver;
              this.powfix = item.powfix;
              this.onekeycharg0 = item.onekeycharg0;
              this.onekeycharg1 = item.onekeycharg1;
              this.onekeycharg2 = item.onekeycharg2;
              this.allowdstart0 = item.allowdstart0;
              this.allowdstart1 = item.allowdstart1;
              this.allowdstart2 = item.allowdstart2;
              this.chargelimit = item.chargelimit;
              this.regusercnt = item.regusercnt;
              this.chgusercnt = item.chgusercnt;
              this.activeucnt = item.activeucnt;
              this.bkminutes = item.bkminutes;
              this.powused0 = item.powused0;
              this.powused1 = item.powused1;
              this.powused2 = item.powused2;
              this.deviceols0 = item.deviceols0;
              this.deviceols1 = item.deviceols1;
              this.deviceols2 = item.deviceols2;
              this.devicereg0 = item.devicereg0;
              this.devicereg1 = item.devicereg1;
              this.devicereg2 = item.devicereg2;
              this.fullmoney = item.fullmoney;
              this.fullretmn = item.fullretmn;
              this.fullgift = item.fullgift;
              this.fullbalance = item.fullbalance;
              this.fullfree = item.fullfree;
              this.premonthmn = item.premonthmn;
              this.monthmoney = item.monthmoney;
              this.todaymoney = item.todaymoney;
              this.cashgets = item.cashgets;
              this.cretime = item.cretime;
              this.bkprize = item.defaultsbk;
              this.evpoints = item.defaultpot;
              this.evpofeeid = item.defaultfee;
              this.evpofees = item.defaultsev;
            }
          });
        }
      },
    }
  }
</script>
