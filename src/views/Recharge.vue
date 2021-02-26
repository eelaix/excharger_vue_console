<template>
  <b-container fluid="xs">
    <div v-show="items.length">
    <b-table-simple hover small caption-top responsive="xs">
      <b-thead head-variant="light">
        <b-tr>
          <b-th>{{$t('message.rech_th0')}}</b-th>
          <b-th class="d-none d-md-table-cell">{{$t('message.rech_th1')}}</b-th>
          <b-th>{{$t('message.rech_th2')}}</b-th>
          <b-th v-show="retfee">{{$t('message.rech_th3')}}</b-th>
          <b-th v-show="!retfee">{{$t('message.rech_th4')}}</b-th>
          <b-th>{{$t('message.rech_th5')}}</b-th>
          <b-th v-b-tooltip.hover :title="$t('message.rech_tt6')" v-show="retfee">{{$t('message.rech_th6')}}</b-th>
          <b-th v-b-tooltip.hover :title="$t('message.rech_tt7')" v-show="!retfee">{{$t('message.rech_th7')}}</b-th>
          <b-th v-b-tooltip.hover :title="$t('message.rech_tt8')">{{$t('message.rech_th8')}}</b-th>
          <b-th class="d-none d-sm-table-cell">{{$t('message.rech_th9')}}</b-th>
        </b-tr>        
      </b-thead>
      <b-tbody>
        <b-tr v-for="(item, index) in items" :key="index">
          <b-td v-b-tooltip.hover :title="item.nowmobile">{{item.mobile}}</b-td>
          <b-td class="d-none d-md-table-cell">{{item.regtime}}</b-td>
          <b-td>{{item.paytime}}</b-td>
          <b-td>{{item.cretime}}</b-td>
          <b-td>{{item.money}}</b-td>
          <b-td>{{item.balance}}
            <b-button v-show="workingid==-1" size="sm" variant="outline-secondary" class="mr-2" @click="setme(index)" v-if="!retfee">
              送
            </b-button>
          </b-td>
          <b-td colspan="2" v-show="workingid==index">
                <b-input-group size="sm">
                  <b-form-input v-model="thefreemoney"></b-form-input>
                  <b-input-group-append>
                    <b-button variant="info" @click="freemoney(item)">赠送</b-button>
                  </b-input-group-append>
                </b-input-group>
          </b-td>
          <b-td v-if="workingid!=index">{{item.payseq}}</b-td>
          <b-td v-if="workingid!=index" class="d-none d-sm-table-cell">
            <b-button size="sm" variant="outline-info" class="mr-2" :to="{path:'useroper',query:{openid:item.openid,tm:new Date().getTime()}}">
              <b-icon icon="person-lines-fill" aria-hidden="true"></b-icon>{{$t('message.btn_user_visit')}}
            </b-button>
            <img :src="item.headimgurl" class="wxhead" @click="showbig(item.headimgurl)"/> {{item.nickname}}
          </b-td>
        </b-tr>
      </b-tbody>
    </b-table-simple>
    </div>
    <div v-show="items.length==0" class="pl-5 pr-5">
      <b-card class="xnshadow" header-tag="header" footer-tag="footer">
        <template v-slot:header>
          <h4 class="mb-0"><b-icon icon="gem"></b-icon> 用户充值或退款记录</h4>
        </template>
        <b-card-text>
          <p>
            暂时没有数据<br/><br/>
            扫码-绑手机-充值-充电<br/>
            充电页面支持一键充值<br/>
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
      <b-radio-group
        buttons
        v-model="retfee"
        class="mr-4 mb-4"
        :options="retopts"
        @change="retchange"
        button-variant="outline-primary"
      ></b-radio-group>
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
    name: 'recharge',
    mounted() {
      this.fetchData();
    },
    data() {
      return {
        workingid: -1,
        thefreemoney: 0,
        filteropenid: this.$route.query.openid,
        modalshow:false,
        modalmsg: '',
        maskenabled: false,
        bigheadimgurl: '',
        admnodft:false,
        searchmobile:'',
        retfee:0,
        retopts:[{text:this.$t('message.btn_chargerecod'),value:0},{text:this.$t('message.btn_refundrecod'),value:1}],
        items: [],
        pageid:0,
        newpagestart:[]
      };
    },
    methods: {
      retchange($event) {
        this.workingid = -1;
        this.searchmobile='';
        this.retfee = $event;
        this.pageid = 0;
        this.fetchData();
      },
      search() {
        let mo = parseInt(this.searchmobile);
        if (this.searchmobile.length>0 && (this.searchmobile.length<4 || isNaN(mo))) {
          this.errormsg = '无效的手机号，最少4位数字';
          this.$bvModal.show('errmodal');
        }else{
          this.pageid = 0;
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
        let user = JSON.parse(localStorage.getItem('user'));
        let dftapp = localStorage.getItem('dftapp');
        if (user.isadmin && !dftapp) {
          this.admnodft = true;
        } else {
          this.admnodft = false;
        }
        let token = localStorage.getItem('token');
        let theapi = '/prepays?tm='+new Date().getTime()+'&token='+token+'&retfee='+this.retfee+'&pagesize='+this.$pagesize;
        if (this.filteropenid) {
          theapi = theapi + '&openid='+this.filteropenid;
        } else {
          theapi = theapi + '&mobile='+this.searchmobile;
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
      showbig(url) {
        this.bigheadimgurl = url;
        this.maskenabled = true;
      },
      closemask() {
        this.maskenabled = false;
      },
      setme(index) {
        this.workingid = index;
      },
      freemoney(itm) {
        this.workingid = -1;
        let token = localStorage.getItem('token');
        let theapi = '/freemoney?tm='+new Date().getTime()+'&token='+token+'&appid='+itm.appid+'&openid='+itm.openid+'&money='+this.thefreemoney;
        this.axios.get(theapi).then(axresp => {
          if (axresp.status==200) {
            this.fetchData();
          }
        });
      },
    }
  }
</script>
