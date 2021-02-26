<template>
  <b-container fluid="xs">
    <div v-show="items.length">
    <b-table-simple hover small caption-top responsive="xs">
      <b-thead head-variant="light">
        <b-tr>
          <b-th>面额</b-th>
          <b-th class="d-none d-sm-table-cell">创建日期</b-th>
          <b-th>过期日期</b-th>
          <b-th class="d-none d-md-table-cell">标码</b-th>
          <b-th>派发手机</b-th>
          <b-th>派发日期</b-th>
          <b-th>激活日期</b-th>
          <b-th class="d-none d-md-table-cell">激活用户</b-th>
        </b-tr>        
      </b-thead>
      <b-tbody>
        <b-tr v-for="(item, index) in items" :key="index">
          <b-td>{{item.facemoney}}</b-td>
          <b-td v-b-tooltip.hover :title="item.happefull" class="d-none d-sm-table-cell">{{item.happestr}}</b-td>
          <b-td>{{item.timeouts}}</b-td>
          <b-td class="d-none d-md-table-cell">{{item.mark}}</b-td>
          <b-td v-if="workingid==index">
              <b-input-group size="sm">
                <b-form-input v-model="item.mobile"></b-form-input>
                <b-input-group-append>
                  <b-button variant="info" @click="feecardsms(item)">{{$t('message.btn_feecardsms')}}</b-button>
                </b-input-group-append>
              </b-input-group>
          </b-td>
          <b-td v-else-if="item.mobile">
          {{item.mobile}}
          </b-td>
          <b-td v-else>
            <b-button size="sm" variant="outline-secondary" @click="setme(index)">{{$t('message.btn_feecardme')}}</b-button>
          </b-td>
          <b-td>{{item.smstime}}</b-td>
          <b-td>{{item.usetime}}</b-td>
          <b-td v-if="item.nickname" class="d-none d-md-table-cell">
            <img :src="item.headimgurl" class="wxhead" @click="showbig(item.headimgurl)"/> {{item.nickname}}
          </b-td>
          <b-td v-else class="d-none d-md-table-cell">
            尚未激活
          </b-td>          
        </b-tr>
      </b-tbody>
    </b-table-simple>
    </div>
    <div v-show="items.length==0" class="pl-5 pr-5">
      <b-card class="xnshadow" header-tag="header" footer-tag="footer">
        <template v-slot:header>
          <h4 class="mb-0"><b-icon icon="gem"></b-icon> 空中充值卡</h4>
        </template>
        <b-card-text>
          <p>
            没有发现虚拟充值卡<br/><br/>
            请生成虚拟充值卡并派发<br/>
            客户收到派发短信可激活<br/>
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
    <b-input-group class="col-7 col-sm-6 col-md-6 col-lg-5 col-xl-4 mb-4">
        <b-form-input placeholder="卡面金额" v-model="facemoney"></b-form-input>
        <b-form-input placeholder="卡片数量" v-model="cardcnts"></b-form-input>
        <b-form-input placeholder="过期天数" v-model="expdays"></b-form-input>
        <b-input-group-append>
          <b-button variant="info" @click="generate" :disabled="executed">生成</b-button>
        </b-input-group-append>
    </b-input-group>
    </b-form>
    <b-modal v-model="modalshow" no-close-on-backdrop no-close-on-esc hide-header ok-only :ok-title="$t('message.btn_ok')">{{modalmsg}}</b-modal>
  </b-container>
</template>

<script>
  import { MOBILEX } from '@/consv'
  export default {
    name: 'recharge',
    mounted() {
      this.fetchData();
    },
    data() {
      return {
        workingid:-1,
        modalshow:false,
        modalmsg: '',
        admnodft:false,
        executed:false,
        facemoney:'',
        cardcnts:'',
        expdays:'',
        items: [],
        pageid:0,
        newpagestart:[]
      };
    },
    methods: {
      generate() {
        let lfacemoney = parseInt(this.facemoney);
        let lcardcnts = parseInt(this.cardcnts);
        let lexpdays = parseInt(this.expdays);
        if (isNaN(lfacemoney) || lfacemoney<1 || lfacemoney>10000) {
          this.modalmsg = '无效的数字，请填写卡面金额！';
          this.modalshow = true;
        } else if (isNaN(lcardcnts) || lcardcnts<1 || lcardcnts>100) {
          this.modalmsg = '无效的数字，请填写卡片数量！';
          this.modalshow = true;
        } else if (isNaN(lexpdays) || lexpdays<10 || lexpdays>1000) {
          this.modalmsg = '无效的数字，请填写有效期天数！';
          this.modalshow = true;
        }else{
          this.executed = true;
          let token = localStorage.getItem('token');
          let theapi = '/feecgen?tm='+new Date().getTime()+'&token='+token+'&facemoney='+this.facemoney+'&cardcnts='+this.cardcnts+'&expdays='+this.expdays;
          this.axios.get(theapi).then(axresp => {
            if (axresp.status==200) {
              this.fetchData();
            } else {
              this.modalmsg = axresp.data;
              this.modalshow = true;
            }
          });
        }
      },
      setme(index) {
        this.workingid = index;
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
        let theapi = '/feecardlist?tm='+new Date().getTime()+'&token='+token+'&pagesize='+this.$pagesize;
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
      feecardsms(itm) {
        this.workingid = -1;
        let mobile = itm.mobile;
        let happen = itm.happen;
        if (mobile) {
          if (!MOBILEX.test(mobile)) {
            this.modalmsg = '无效的手机号！';
            this.modalshow = true;
          } else {
            let token = localStorage.getItem('token');
            let theapi = '/feecardsms?tm='+new Date().getTime()+'&token='+token+'&mobile='+mobile+'&happen='+happen;
            this.axios.get(theapi).then(axresp => {
              if (axresp.status==200) {
                this.fetchData();
              }
            });
          }
        }
      },
    }
  }
</script>
