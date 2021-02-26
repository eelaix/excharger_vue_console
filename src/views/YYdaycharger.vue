<template>
  <b-container fluid="xs">
    <div v-show="items.length">
    <b-table-simple hover small caption-top responsive>
      <b-thead head-variant="light">
        <b-tr>
          <b-th>{{$t('message.yyd_theday')}}</b-th>
          <b-th>{{$t('message.yyd_devcnts')}}</b-th>
          <b-th><span class="d-none d-md-table-cell">{{$t('message.yyd_bigch')}}</span>{{$t('message.yyd_psns')}}</b-th>
          <b-th><span class="d-none d-md-table-cell">{{$t('message.yyd_bigch')}}</span>{{$t('message.yyd_times')}}</b-th>
          <b-th><span class="d-none d-md-table-cell">{{$t('message.yyd_bigff')}}</span>{{$t('message.yyd_money')}}</b-th>
          <b-th><span class="d-none d-md-table-cell">{{$t('message.yyd_pow')}}</span>{{$t('message.yyd_powst')}}</b-th>
          <b-th><span class="d-none d-md-table-cell">{{$t('message.yyd_pow')}}</span>{{$t('message.yyd_powused')}}</b-th>
          <b-th class="d-none d-lg-table-cell" v-if="$route.query.chargerid || $route.query.siteid || $route.query.openid">{{$t('message.yyd_cash')}}</b-th>
        </b-tr>
      </b-thead>
      <b-tbody v-for="(item, index) in items" :key="index">
        <b-tr>
          <b-td>{{item.theday}}</b-td>
          <b-td>{{item.devcnts}}</b-td>
          <b-td>{{item.psns}}</b-td>
          <b-td>{{item.times}}</b-td>
          <b-td>{{item.money}}</b-td>
          <b-td>{{item.powst}}</b-td>
          <b-td>{{item.powused}}</b-td>
          <b-td class="d-none d-lg-table-cell" v-if="$route.query.chargerid || $route.query.siteid || $route.query.openid">{{item.billdone}}</b-td>
        </b-tr>
      </b-tbody>
    </b-table-simple>
    </div>
    <div v-show="items.length==0" class="pl-5 pr-5">
      <b-card class="xnshadow" header-tag="header" footer-tag="footer">
        <template v-slot:header>
          <h4 class="mb-0"><b-icon icon="person-check-fill"></b-icon> 运营统计</h4>
        </template>
        <b-card-text>
          <p>
            按日汇总每台设备，每个充电站的营业情况<br/><br/>
            包含充电人数，次数，充电消费金额，用电量，电表读数<br/>
            <b-form inline class="mt-4"><b-alert :show="admnodft">{{$t('message.cfmdefault')}}</b-alert></b-form>
           </p>
        </b-card-text>
      </b-card>
    </div>
    <b-form inline class="mt-4 ml-4">
      <b-button-group class="mr-4 mb-4">
        <b-button variant="success" @click="fetchNext" :disabled="!fetchmore">{{$t('message.btn_fetchmore')}}</b-button>
      </b-button-group>
    </b-form>
  </b-container>
</template>

<script>
  export default {
    name: 'yydaycharger',
    mounted() {
      this.fetchData();
    },
    data() {
      return {
        admnodft:false,
        items: [],
        autofetch: 0,
        fetchmore: false,
        nextday:1
      };
    },
    methods: {
      fetchNext() {
        this.fetchmore = false;
        this.autofetch = 0;
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
        let theapi = '/yydaycharger?tm='+new Date().getTime()+'&token='+token+'&theday='+this.nextday;
        if (this.$route.query.chargerid) {
          theapi = theapi + '&cid='+this.$route.query.chargerid;
        }
        if (this.$route.query.siteid) {
          theapi = theapi + '&sid='+this.$route.query.siteid;
        }
        if (this.$route.query.openid) {
          theapi = theapi + '&openid='+this.$route.query.openid;
        }
        this.axios.get(theapi).then(axresp => {
          let axdata = axresp.data;
          this.nextday = axdata.nextday;
          if (axdata.item) {
            this.items.push(axdata.item);
            this.autofetch = this.autofetch+1;
            if (this.autofetch<20) {
              this.fetchData();
            } else {
              this.fetchmore = true;
            }
          }
        });
      },
    }
  }
</script>
