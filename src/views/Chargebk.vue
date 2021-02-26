<template>
  <b-container fluid="xs">
    <div v-show="items.length">
    <b-table-simple hover small caption-top responsive="xs">
      <b-thead head-variant="light">
        <b-tr>
          <b-th>用户昵称</b-th>
          <b-th>缴费日期</b-th>
          <b-th>启动时间</b-th>
          <b-th>账单</b-th>
          <b-th>实付</b-th>
          <b-th>电桩#端口</b-th>
          <b-th>断电原因</b-th>
          <b-th>计划,实际,功率</b-th>
        </b-tr>        
      </b-thead>
      <b-tbody>
        <b-tr v-for="(item, index) in items" :key="index">
          <b-td>{{item.nickname}}</b-td>
          <b-td v-b-tooltip.hover :title="item.paytime">{{item.paydate}}</b-td>
          <b-td v-b-tooltip.hover :title="item.startimeday">{{item.startimestr}}</b-td>
          <b-td>{{item.billmoney}}</b-td>
          <b-td>{{item.paymoney}}</b-td>
          <b-td>{{item.chargerid}}#{{item.portid}}</b-td>
          <b-td>{{reasons[item.reason]}}</b-td>
          <b-td>{{item.plan}}时,{{item.fact}}分,{{item.avgpow}}瓦</b-td>
        </b-tr>
      </b-tbody>
    </b-table-simple>
    </div>
    <div v-show="items.length==0" class="pl-5 pr-5">
      <b-card class="xnshadow" header-tag="header" footer-tag="footer">
        <template v-slot:header>
          <h4 class="mb-0"><b-icon icon="lightning"></b-icon> 电动单车充电记录</h4>
        </template>
        <b-card-text>
          <p>
            没有发现满足条件的数据<br/><br/>
            扫码-绑手机-充值-充电<br/>
            充电结束，断电自动扣费<br/>
            <b-form inline class="mt-4"><b-alert :show="admnodft">{{$t('message.cfmdefault')}}</b-alert></b-form>
           </p>
        </b-card-text>
      </b-card>
    </div>
    <b-form inline class="mt-4 ml-4">
      <b-button-group class="mr-4 mb-4">
        <b-button variant="success" @click="fetchprev" :disabled="pageid==0">{{$t('message.btn_prevpage')}}</b-button>
        <b-button v-if="pageid>0" variant="outline-success" :disabled="true" >{{pageid+1}}</b-button>
        <b-button variant="success" @click="fetchNext" :disabled="pageid==newpagestart.length">{{$t('message.btn_nextpage')}}</b-button>
      </b-button-group>
    <b-input-group class="mb-4">
        <b-form-input :placeholder="$t('message.entermobile')" v-model="searchmobile"></b-form-input>
        <b-input-group-append>
          <b-button variant="info" @click="search">{{$t('message.btn_search')}}</b-button>
        </b-input-group-append>
    </b-input-group>
    </b-form>
    <b-modal v-model="modalshow" no-close-on-backdrop no-close-on-esc hide-header ok-only :ok-title="$t('message.btn_ok')">{{modalmsg}}</b-modal>
  </b-container>
</template>

<script>
  export default {
    name: 'chargebk',
    mounted() {
      this.fetchData();
    },
    data() {
      return {
        modalshow:false,
        modalmsg: '',
        admnodft:false,
        searchmobile:'',
        reasons: ['未知原因','未接设备','到时停充','插头拔出','功率极限','余额不足','线损过高','温度极高','温度太高','主动停止','充电完成'],
        items: [],
        pageid:0,
        newpagestart:[]
      };
    },
    methods: {
      search() {
        let mo = parseInt(this.searchmobile);
        if (this.searchmobile.length > 0 && isNaN(mo)) {
          this.modalmsg = '无效的手机号，请输入数字！';
          this.modalshow = true;
        } else if (this.searchmobile.length > 0 && this.searchmobile.length < 4) {
          this.modalmsg = '无效的手机号，最少4位数！';
          this.modalshow = true;
        } else if (this.searchmobile.length > 11) {
          this.modalmsg = '手机号输入有误，最多11位！';
          this.modalshow = true;
        } else {
          this.pageid = 0;
          this.newpagestart = [];
          this.fetchData();
        }
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
        let theapi = '/chargebk?tm='+new Date().getTime()+'&token='+token+'&pagesize='+this.$pagesize;
        if (this.searchmobile) {
          theapi = theapi + '&mobile='+this.searchmobile
        } else if (this.$route.query.openid) {
          theapi = theapi + '&openid='+this.$route.query.openid;
        } else if (this.$route.query.siteid) {
          theapi = theapi + '&siteid='+this.$route.query.siteid;
        } else if (this.$route.query.chargerid) {
          theapi = theapi + '&chargerid='+this.$route.query.chargerid;
        }
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
    }
  }
</script>
