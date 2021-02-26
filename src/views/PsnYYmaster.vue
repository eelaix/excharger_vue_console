<template>
  <b-container fluid="xs">
    <div v-show="items.length">
    <b-table-simple hover small caption-top responsive>
      <b-thead head-variant="light">
        <b-tr>
          <b-th class="d-none d-md-table-cell"><b-icon icon="person"></b-icon>{{$t('message.pym_th0')}}</b-th>
          <b-th class="d-none d-lg-table-cell"><b-icon icon="clock"></b-icon>{{$t('message.pym_th1')}}</b-th>
          <b-th class="d-none d-sm-table-cell"><b-icon icon="person-lines-fill"></b-icon>{{$t('message.pym_th2')}}</b-th>
          <template v-if="utype==1">
            <b-th>{{$t('message.pym_th3')}}</b-th>
            <b-th v-b-tooltip.hover title="含今日的实时可结算金额,运营助手金额不含今日.">{{$t('message.pym_th5')}}</b-th>
            <b-th>{{$t('message.pym_th6')}}</b-th>
            <b-th>{{$t('message.pym_th4')}}</b-th>
            <b-th v-b-tooltip.hover :title="$t('message.yyma_hover6')">{{$t('message.yyma_th6')}}</b-th>
          </template>
          <template v-else>
            <b-th>{{$t('message.pym_th7')}}</b-th>
            <b-th>{{$t('message.pym_th8')}}</b-th>
            <b-th>{{$t('message.pym_th9')}}</b-th>
            <b-th>{{$t('message.pym_tha')}}</b-th>
          </template>
        </b-tr>        
      </b-thead>
      <b-tbody v-for="(item, index) in items" :key="index">
        <b-tr>
          <b-td class="d-none d-md-table-cell">{{item.yyrealname}}</b-td>
          <b-td class="d-none d-lg-table-cell">{{item.regtime}}</b-td>
          <b-td class="d-none d-sm-table-cell">
            <span>{{item.mobile}}</span><img :src="item.headimgurl" class="wxhead ml-2" @click="showbig(item.headimgurl)" /><span class="d-none d-md-inline-block ml-2">{{item.nickname}}</span>
            </b-td>
          <template v-if="utype==1">
            <b-td>{{item.yymgdsites}} ({{item.yychargers0}},{{item.yychargers1}},{{item.yychargers2}})</b-td>
            <b-td>
              <b-button size="sm" variant="outline-success" :to="{path:'yydaycharger',query:{tm:new Date().getTime(),openid:item.id}}">{{item.yybillneed}}</b-button>
            </b-td>
            <b-td>
              <b-button size="sm" variant="outline-success" :to="{path:'yydaycharger',query:{tm:new Date().getTime(),openid:item.id}}">{{item.yycashdone}}</b-button>
            </b-td>
            <b-td v-show="rateid==index">
              <b-input-group>
                <b-form-input v-model="item.yyrate"></b-form-input>
                <b-input-group-append>
                  <b-button variant="info" @click="mgrrate(item)">{{$t('message.btn_save')}}</b-button>
                </b-input-group-append>
              </b-input-group>
            </b-td>
            <b-td v-show="rateid!=index" @click="setme(index)">{{item.yyrate}}</b-td>
            <b-td><b-checkbox :key="index" v-model="item.yyaddfree" @change="saveaddfree($event,item)" switch></b-checkbox></b-td>
          </template>
          <template v-else>
            <b-td>{{item.yyupdtime}}</b-td>
            <b-td>{{item.balance}}</b-td>
            <b-td>{{item.prepaytms}}</b-td>
            <b-td>{{item.chargpays0}},{{item.chargpays1}},{{item.chargpays2}}</b-td>
          </template>
        </b-tr>
        <b-tr>
            <b-td colspan="5" class="d-table-cell d-sm-none">
              <span class="greyco ml-2">{{item.mobile}}</span><img :src="item.headimgurl" class="wxhead ml-2 mr-2" @click="showbig(item.headimgurl)" />
              <span class="greyco mr-3">{{item.nickname}}</span><span class="greyco mr-3">{{item.regtime}}</span>
            </b-td>
        </b-tr>
      </b-tbody>
    </b-table-simple>
    </div>
    <div v-show="items.length==0" class="pl-5 pr-5">
      <b-card class="xnshadow" header-tag="header" footer-tag="footer">
        <template v-slot:header>
          <h4 class="mb-0"><b-icon icon="person-check-fill"></b-icon> 个人运营商管理（运营助手）</h4>
        </template>
        <b-card-text>
          <p>
            任何个人运行充电小程序，进入运营助手，填写手机姓名申请<br/><br/>
            运营助手【填写真实姓名】为新人,(采购)扫码添加了设备为正式用户。<br/>
            运营助手填写【后台网页申请】经审核通过成为运营商管理者。<br/>
            正式个人运营商经协商【设置分成比例】后可提现<br/>
            未结算收入=每日各站点消费额之和<br/>
            可提现金额=未结算收入*0.994*分成结算率<br/>
            运营助手提现分成，T+1结算，即刻秒到微信钱包<br/>
            <b-form inline class="mt-4"><b-alert :show="admnodft">{{$t('message.cfmdefault')}}</b-alert></b-form>
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
    </b-form>
    <b-modal v-model="modalshow" no-close-on-backdrop no-close-on-esc hide-header ok-only :ok-title="$t('message.btn_ok')">{{modalmsg}}</b-modal>
  </b-container>
</template>

<script>
  export default {
    name: 'psnyymaster',
    mounted() {
      this.utype = parseInt(localStorage.getItem('yyutype')) || 0;
      this.fetchData();
    },
    data() {
      return {
        modalshow:false,
        modalmsg: '',
        utype:0,
        sort:0,
        rateid:-1,
        utypes: [{
          text: this.$t('message.btn_pymnew'),
          value: 0
        }, {
          text: this.$t('message.btn_pymcashed'),
          value: 1
        }],
        maskenabled: false,
        bigheadimgurl: '',
        admnodft:false,
        items: [],
        pageid:0,
        newpagestart:[]
      };
    },
    methods: {
      uchange($event) {
        this.utype = $event;
        localStorage.setItem('yyutype',''+$event);
        this.pageid = 0;
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
        let user = JSON.parse(localStorage.getItem('user'));
        let dftapp = localStorage.getItem('dftapp');
        if (user.isadmin && !dftapp) {
          this.admnodft = true;
        } else {
          this.admnodft = false;
        }
        let token = localStorage.getItem('token');
        let theapi = '/yymasters?tm='+new Date().getTime()+'&token='+token+'&pagesize='+this.$pagesize;
        theapi = theapi + '&utype='+this.utype;
        theapi = theapi + '&sort='+this.sort;
        if (this.pageid>0 && this.newpagestart[this.pageid-1]) {
          theapi = theapi + '&last='+encodeURIComponent(JSON.stringify(this.newpagestart[this.pageid-1]));
        }
        this.axios.get(theapi).then(axresp => {
          if (axresp.status==200) {
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
      setme(index) {
        this.rateid = index;
      },
      mgrrate(itm) {
        let rate = itm.yyrate;
        if (rate.indexOf('%')>0){
          rate = rate.substr(0,rate.length-1);
          rate = Number((parseInt(rate)/100).toFixed(2));
        } else {
          rate = Number(rate);
          if (rate>1) {
            rate = Number((rate/100).toFixed(2));
          }
        }
        if (rate<0) {
          this.modalmsg = '结算率请填写80%这样的数字或者小于1的小数。';
          this.modalshow = true;
        } else if (rate>1){
          this.modalmsg = '结算率请填写80%这样的数字或者小于1的小数。';
          this.modalshow = true;
        } else {
          this.rateid = -1;
          let token = localStorage.getItem('token');
          let theapi = '/mgrrate?tm='+new Date().getTime()+'&token='+token+'&id='+itm.id+'&rate='+rate;
          this.axios.get(theapi).then(axresp => {
            if (axresp.status==200) {
              this.fetchData();
            }
          });
        }
      },
      saveaddfree($event, itm) {
        let token = localStorage.getItem('token');
        let theapi = '/mgrfree?tm='+new Date().getTime()+'&token='+token+'&id='+itm.id+'&adf='+$event;
        this.axios.get(theapi).then(axresp => {
          if (axresp.status==200) {
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
