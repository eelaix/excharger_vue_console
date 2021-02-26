<template>
  <b-container fluid="xs">
    <div v-show="items.length">
      <b-table-simple hover small caption-top responsive>
        <b-thead head-variant="light">
          <b-tr>
            <b-th>
              <b-icon icon="phone"></b-icon>{{$t('message.usr_th0')}}
            </b-th>
            <b-th>
              <b-icon icon="gem" class="d-none d-sm-inline-block"></b-icon>{{$t('message.usr_th1')}}
            </b-th>
            <b-th class="d-none d-lg-table-cell">
              {{$t('message.usr_th8')}}
            </b-th>
            <b-th class="d-none d-md-table-cell">
              <b-icon icon="clock-history"></b-icon>{{$t('message.usr_th2')}}
            </b-th>
            <b-th>
              <b-icon icon="clock" class="d-none d-sm-inline-block"></b-icon>{{$t('message.usr_th3')}}
            </b-th>
            <b-th class="d-none d-md-table-cell">
              <b-icon icon="wifi"></b-icon>{{$t('message.usr_th4')}}
            </b-th>
            <b-th v-b-tooltip.hover :title="$t('message.usr_bad')">
              <b-icon icon="lightning-fill" class="d-none d-sm-inline-block"></b-icon>{{$t('message.usr_th5')}}
            </b-th>
            <b-th>
              {{$t('message.usr_th7')}}
            </b-th>
            <b-th class="d-none d-md-table-cell">
              <b-icon icon="person-fill"></b-icon>{{$t('message.usr_th6')}}
            </b-th>
          </b-tr>
        </b-thead>
        <b-tbody v-for="(item, index) in items" :key="index">
          <b-tr>
            <b-td><span>{{item.mobile}}</span>
            <b-icon :icon="utype==1?'person-x-fill':'person-x'" class="ml-1 d-none d-lg-inline-block" @click="makeblack(item)" v-show="utype<2" v-b-tooltip.hover :title="$t('message.usr_black')"></b-icon>
            </b-td>
            <b-td>{{item.balance}}</b-td>
            <b-td class="d-none d-lg-table-cell">{{item.balancx}}</b-td>
            <b-td class="d-none d-md-table-cell">{{item.lastactive}}</b-td>
            <b-td>{{item.regtime}}</b-td>
            <b-td class="d-none d-md-table-cell" @click="getipcity(item)">{{item.remoteip}}</b-td>
            <b-td>
              <b-button-group size="sm">
                <b-button :variant="item.chargetms0 | toVar1" :disabled="item.chargetms0==0"
                :to="{path:'chargebk',query:{openid:item.id,tm:new Date().getTime()}}">{{item.chargetms0}}</b-button>
                <b-button :variant="item.chargetms1 | toVar1" :disabled="item.chargetms1==0"
                :to="{path:'chargeac',query:{openid:item.id,tm:new Date().getTime()}}">{{item.chargetms1}}</b-button>
                <b-button :variant="item.chargetms2 | toVar1" :disabled="item.chargetms2==0"
                :to="{path:'chargedc',query:{openid:item.id,tm:new Date().getTime()}}">{{item.chargetms2}}</b-button>
              </b-button-group>
            </b-td>
            <b-td>
              <b-button size="sm" :variant="item.prepaytms | toVar1" :disabled="item.prepaytms==0" :to="{path:'recharge',query:{openid:item.id,tm:new Date().getTime()}}">{{item.prepaytms}}</b-button>
            </b-td>
            <b-td class="d-none d-md-table-cell">
              <b-button size="sm" variant="outline-info" class="mr-2" :to="{path:'useroper',query:{openid:item.id,tm:new Date().getTime()}}">
                    <b-icon icon="person-lines-fill" aria-hidden="true"></b-icon>{{$t('message.btn_user_visit')}}
              </b-button>
              <img :src="item.headimgurl" class="wxhead" @click="showbig(item.headimgurl)" />
              {{item.nickname}}
            </b-td>
          </b-tr>
          <b-tr>
            <b-td colspan="5" class="d-table-cell d-md-none">
              <b-button size="sm" variant="inline-info" class="mr-2 greyco" :to="{path:'useroper',query:{openid:item.id,tm:new Date().getTime()}}">
                    <b-icon icon="person-lines-fill" aria-hidden="true" class="greyco"></b-icon>{{$t('message.btn_user_visit')}}
              </b-button>
              <img :src="item.headimgurl" class="wxhead mr-2" @click="showbig(item.headimgurl)" />
              <span class="greyco mr-3">{{item.nickname}}</span>
            </b-td>
          </b-tr>
        </b-tbody>
      </b-table-simple>
    </div>
    <div v-show="items.length==0" class="pl-5 pr-5">
      <b-card class="xnshadow" header-tag="header" footer-tag="footer">
        <template v-slot:header>
          <h4 class="mb-0">
            <b-icon icon="people"></b-icon> 用户管理
          </h4>
        </template>
        <b-card-text>
          <p>
            暂时没有发现符合条件的客户<br /><br />
            微信扫码，进入充电界面，用户数据自动注册<br />
            客户需主动绑定手机号码，充值后才可启动充电<br />
          </p>
        </b-card-text>
      </b-card>
    </div>
    <div v-show="maskenabled" class="fullmask" @click="closemask">
      <div class="imgshow xnshadow">
        <img :src="bigheadimgurl" class="w-100"/>
      </div>
    </div>
    <b-form inline class="mt-4 ml-4">
      <b-button-group class="mr-4 mb-4">
        <b-button variant="success" @click="fetchprev" :disabled="pageid==0">{{$t('message.btn_prevpage')}}</b-button>
        <b-button v-if="pageid>0" variant="outline-success" :disabled="true" >{{pageid+1}}</b-button>
        <b-button variant="success" @click="fetchNext" :disabled="pageid==newpagestart.length">{{$t('message.btn_nextpage')}}</b-button>
      </b-button-group>
      <b-radio-group buttons v-model="utype" class="mr-4 mb-4" :options="utypes" @change="uchange" button-variant="outline-primary"></b-radio-group>
      <b-input-group class="mb-4">
        <b-form-input :placeholder="$t('message.nickormobil')" v-model="searchmobile"></b-form-input>
        <b-input-group-append>
          <b-button variant="info" @click="search">{{$t('message.btn_search')}}</b-button>
        </b-input-group-append>
      </b-input-group>
    </b-form>
    <b-modal v-model="modalshow" no-close-on-backdrop no-close-on-esc hide-header ok-only :ok-title="$t('message.btn_ok')">{{modalmsg}}</b-modal>
    <b-alert class="ml-4 mr-4" :show="dismissCountDown" dismissible variant="warning" @dismissed="dismissCountDown=0" @dismiss-count-down="countDownChanged">
    {{alertmsg}}
    <b-progress variant="warning" :max="dismissSecs" :value="dismissCountDown" height="4px"></b-progress>
    </b-alert>
  </b-container>
</template>

<script>
  export default {
    name: 'user',
    mounted() {
      if (this.$route.query.alertmsg) {
        this.dismissSecs = 10;
        this.dismissCountDown = 10;
        this.alertmsg = this.$route.query.alertmsg;
        delete this.$route.query.alertmsg;
      }
      this.utype = parseInt(localStorage.getItem('ustype')) || 0;
      this.fetchData();
    },
    data() {
      return {
        modalshow: false,
        modalmsg: '',
        alertmsg: '',
        utype: 1,
        dismissSecs: 0,
        dismissCountDown: 0,
        searchmobile: '',
        utypes: [{
          text: this.$t('message.btn_ublack'),
          value: 0
        }, {
          text: this.$t('message.btn_unormal'),
          value: 1
        }, {
          text: this.$t('message.btn_uvip'),
          value: 2
        }, {
          text: this.$t('message.btn_umgr'),
          value: 3
        }],
        maskenabled: false,
        bigheadimgurl: '',
        thecity: '',
        items: [],
        pageid:0,
        newpagestart:[]
      };
    },
    methods: {
      countDownChanged(dismissCountDown) {
        this.dismissCountDown = dismissCountDown
      },
      search() {
        delete this.$route.query.search;
        this.pageid = 0;
        this.newpagestart = [];
        this.fetchData();
      },
      uchange($event) {
        this.searchmobile = '';
        this.utype = $event;
        localStorage.setItem('ustype',''+$event);
        this.pageid = 0;
        this.newpagestart = [];
        this.fetchData();
      },
      fetchprev() {
        this.pageid = this.pageid-1;
        this.fetchData();
      },
      fetchPage(page) {
        this.pageid = page;
        this.fetchData();
      },
      fetchNext() {
        this.pageid = this.pageid+1;
        this.fetchData();
      },
      fetchData() {
        let token = localStorage.getItem('token');
        let theapi = '/users?tm=' + new Date().getTime() + '&token=' + token + '&utype=' + this.utype + '&pagesize=' + this.$pagesize;
        if (this.$route.query.search) {
          theapi = theapi + '&mobile='+this.$route.query.search;
        } else {
          if (this.searchmobile) {
            theapi = theapi + '&mobile=' + this.searchmobile;
          }
        }
        if (this.pageid>0 && this.newpagestart[this.pageid-1]) {
          theapi = theapi + '&last='+encodeURIComponent(JSON.stringify(this.newpagestart[this.pageid-1]));
        }
        this.axios.get(theapi).then(axresp => {
          if (axresp.status == 200) {
            let axdata = axresp.data;
            this.items = axdata.Items;
            if (axdata.LastEvaluatedKey) {
              if (this.newpagestart.length<=this.pageid) {
                this.newpagestart.push(axdata.LastEvaluatedKey);
              } else {
                this.newpagestart[this.pageid] = axdata.LastEvaluatedKey;
              }
            }
          } else {
            this.items = [];
          }
        });
      },
      getipcity(itm) {
        let ip = itm.remoteip;
        if ((/\d+\.\d+\.\d+\.\d+/).test(ip)) {
          let theapi = '/ipcity?tm=' + new Date().getTime() + '&ip=' + ip;
          this.axios.get(theapi).then(axresp => {
            if (axresp.status == 200) {
              itm.remoteip = axresp.data;
            }
          });
        }
      },
      makeblack(itm) {
        let token = localStorage.getItem('token');
        let theapi = '/usmkblack?tm=' + new Date().getTime() + '&token=' + token + '&id=' + itm.id;
        this.axios.get(theapi).then(axresp => {
          if (axresp.status == 200) {
            this.pageid = 0;
            this.newpagestart = [];
            this.fetchData();
          }
        });
      },
      showbig(url) {
        this.bigheadimgurl = url;
        this.maskenabled = true;
      },
      closemask() {
        this.maskenabled = false;
      },
    }
  }
</script>
