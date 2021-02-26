<template>
  <b-container fluid="xs">
    <div v-show="items.length">
    <b-table-simple hover small caption-top responsive>
      <b-thead head-variant="light">
        <b-tr>
          <b-th>运营商姓名</b-th>
          <b-th>运营商手机</b-th>
          <b-th>提现日期</b-th>
          <b-th>结算比例</b-th>
          <b-th>应结金额</b-th>
          <b-th>实提金额</b-th>
          <b-th>相关说明</b-th>
        </b-tr>        
      </b-thead>
      <b-tbody v-for="(item, index) in items" :key="index">
        <b-tr>
          <b-td>{{item.yyrealname}}</b-td>
          <b-td>{{item.mobile}}</b-td>
          <b-td v-b-tooltip.hover :title="item.happentime">{{item.happendate}}</b-td>
          <b-td>{{item.yyrate}}</b-td>
          <b-td>{{item.chgmoney}}</b-td>
          <b-td>{{item.factpay}}</b-td>
          <b-td v-b-tooltip.hover :title="item.chargers">{{item.dayfromto}}</b-td>
        </b-tr>
      </b-tbody>
    </b-table-simple>
    </div>
    <div v-show="items.length==0" class="pl-5 pr-5">
      <b-card class="xnshadow" header-tag="header" footer-tag="footer">
        <template v-slot:header>
          <h4 class="mb-0"><b-icon icon="gem"></b-icon> 个人运营商提现（运营助手）</h4>
        </template>
        <b-card-text>
          <p>
            暂时没有个人运营商提现记录<br/><br/>
            子运营商：本平台的下级运营商<br/>
            任何个人从子运营商采购充电设备，自行安装运营，随时通过运营助手结算充电收益。子运营商与个人协商分成比例。<br/>
            运营结算按该用户创建的充电站统计：<br/>
            未结算收入=每日各站点消费额之和<br/>
            可提现金额=未结算收入*0.994*分成结算率<br/>
            运营助手提现分成，T+1结算，即刻秒到微信钱包<br/>
            <b-form inline class="mt-4"><b-alert :show="admnodft">{{$t('message.cfmdefault')}}</b-alert></b-form>
           </p>
        </b-card-text>
      </b-card>
    </div>
    <b-form inline class="mt-4 ml-4">
      <b-button-group class="mr-4">
        <b-button variant="success" @click="fetchprev" :disabled="pageid==0">{{$t('message.btn_prevpage')}}</b-button>
        <b-button v-if="pageid>0" variant="outline-success" :disabled="true" >{{pageid+1}}</b-button>
        <b-button variant="success" @click="fetchNext" :disabled="pageid==newpagestart.length">{{$t('message.btn_nextpage')}}</b-button>
      </b-button-group>
    </b-form>
    <b-modal v-model="modalshow" no-close-on-backdrop no-close-on-esc hide-header ok-only :ok-title="$t('message.btn_ok')">{{modalmsg}}</b-modal>
  </b-container>
</template>

<script>
  export default {
    name: 'psnyymoney',
    mounted() {
      this.fetchData();
    },
    data() {
      return {
        modalshow:false,
        modalmsg: '',
        admnodft:false,
        items: [],
        pageid:0,
        newpagestart:[]
      };
    },
    methods: {
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
        let theapi = '/psnyymoney?tm='+new Date().getTime()+'&token='+token+'&pagesize='+this.$pagesize;
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
