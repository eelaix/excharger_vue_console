<template>
  <b-container fluid="xs">
    <div v-show="items.length">
    <b-table-simple hover small caption-top responsive="xs">
      <b-thead head-variant="light">
        <b-tr>
          <b-th v-b-tooltip.hover :title="$t('message.msto_tt0')" @click="changesort(0)"><b-icon icon="sort-down" v-show="sort==0"></b-icon>{{$t('message.msto_th0')}}</b-th>
          <b-th v-b-tooltip.hover :title="$t('message.msto_tt1')" @click="changesort(1)"><b-icon icon="sort-down" v-show="sort==1"></b-icon>{{$t('message.msto_th1')}}</b-th>
          <b-th v-b-tooltip.hover :title="$t('message.msto_tt9')">{{$t('message.msto_th9')}}</b-th>
          <b-th v-b-tooltip.hover :title="$t('message.msto_tt2')">{{$t('message.msto_th2')}}</b-th>
          <b-th v-b-tooltip.hover :title="$t('message.msto_tt3')" class="d-none d-sm-table-cell">{{$t('message.msto_th3')}}</b-th>
          <b-th v-b-tooltip.hover :title="$t('message.msto_tt4')" class="d-none d-md-table-cell">{{$t('message.msto_th4')}}</b-th>
          <b-th v-b-tooltip.hover :title="$t('message.msto_tt5')" class="d-none d-md-table-cell">{{$t('message.msto_th5')}}</b-th>
          <b-th v-b-tooltip.hover :title="$t('message.msto_tt6')" class="d-none d-md-table-cell">{{$t('message.msto_th6')}}</b-th>
          <b-th v-b-tooltip.hover :title="$t('message.msto_tt7')" class="d-none d-sm-table-cell">{{$t('message.msto_th7')}}</b-th>
          <b-th v-b-tooltip.hover :title="$t('message.msto_tt8')">{{$t('message.msto_th8')}}</b-th>
          <b-th class="d-none d-lg-table-cell">{{$t('message.msto_thd')}}</b-th>
        </b-tr>
      </b-thead>
      <b-tbody v-for="(item, index) in items" :key="index">
        <b-tr>
          <b-td v-b-tooltip.hover :title="item.mac">
          <b-button size="sm" variant="outline-info" @click="gotodevice(item)">{{item.chargerid}}</b-button>
          </b-td>
          <b-td :class="item.connected==1?'text-success':'text-secondary'" v-b-tooltip.hover :title="item.connected==1?'第'+item.cot+'次联网: '+item.pot:'离线时间:'+item.offline">{{item.act}}</b-td>
          <b-td>{{item.pon}}</b-td>
          <b-td>{{item.yyrealname}}
              <b-button size="sm" variant="link" :disabled="((item.siteid>0)||(item.openid==''))" @click="stoclearopenid(item)"><b-icon variant="success" icon="x-circle"></b-icon></b-button>
          </b-td>
          <b-td class="d-none d-sm-table-cell">{{item.sitename}}
            <b-button size="sm" variant="link" :disabled="item.siteid==0" @click="stoclearsiteid(item)"><b-icon variant="success" icon="x-circle"></b-icon></b-button>
          </b-td>
          <b-td class="d-none d-md-table-cell">{{item.addedtime}}</b-td>
          <b-td class="d-none d-md-table-cell" v-b-tooltip.hover :title="item.cellinfo">{{item.netstr}}</b-td>
          <b-td class="d-none d-md-table-cell">{{item.ver}}</b-td>
          <b-td class="d-none d-sm-table-cell">{{item.ports}}</b-td>
          <b-td>
             <b-button size="sm" variant="outline-success" @click="storeqrcode(item)" ><b-icon icon="vr" rotate="90" aria-hidden="true"></b-icon></b-button>
          </b-td>
          <b-td class="d-none d-lg-table-cell">{{resetflags[item.rsf]}}</b-td>
        </b-tr>
        <b-tr>
          <b-td colspan="5" class="greyco d-table-cell d-sm-none">
            <span class="mr-2">{{item.sitename}}
              <b-button size="sm" variant="link" :disabled="item.siteid==0" @click="stoclearsiteid(item)"><b-icon variant="success" icon="x-circle"></b-icon></b-button>
            </span>
            <span class="mr-4">{{item.addtime}}</span>
            [{{$t('message.msto_th5')}}:{{item.netstr}}] [{{$t('message.msto_th6')}}:{{item.ver}}] [{{$t('message.msto_th7')}}:{{item.ports}}]
          </b-td>
        </b-tr>
      </b-tbody>
    </b-table-simple>
    </div>
    <div v-show="items.length==0" class="pl-5 pr-5">
      <b-card class="xnshadow" header-tag="header" footer-tag="footer">
        <template v-slot:header>
          <h4 class="mb-0"><b-icon icon="clock" variant="success"></b-icon> 采购库存</h4>
        </template>
        <b-card-text>
          <p>
            没有发现满足条件的数据<br/><br/>
            购买设备，扫码添加，创建电站，分配到电站，开始赚钱。<br/>
            默认按电桩编号降序排列，可选择按重启降序排列。<br/>
            请选择其他类型的设备查看数据<br/>
            电桩编号过滤支持模糊查询，比如：起始编号输入1010表示查询101000~101099<br />
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
      <b-button-group class="mr-4">
        <b-button variant="success" @click="fetchprev" :disabled="pageid==0">{{$t('message.btn_prevpage')}}</b-button>
        <b-button v-if="pageid>0" variant="outline-success" :disabled="true" >{{pageid+1}}</b-button>
        <b-button variant="success" @click="fetchNext" :disabled="pageid==newpagestart.length">{{$t('message.btn_nextpage')}}</b-button>
      </b-button-group>
      <b-radio-group
        buttons
        v-model="cbktype"
        class="mr-4"
        :options="cbktypes"
        @change="cbkchange"
        button-variant="outline-primary"
      ></b-radio-group>
      <b-input-group class="col-7 col-sm-6 col-md-6 col-lg-5 col-xl-4">
            <b-form-input placeholder="起始桩号" v-model="cidstart"></b-form-input>
            <b-form-input placeholder="结束桩号" v-model="cidend"></b-form-input>
            <b-input-group-append>
              <b-button variant="info" @click="dofilter">过滤</b-button>
            </b-input-group-append>
      </b-input-group>
    </b-form>
    <b-modal v-model="modalshow" no-close-on-backdrop no-close-on-esc hide-header ok-only :ok-title="$t('message.btn_ok')">{{modalmsg}}</b-modal>
  </b-container>
</template>

<style>
  .tooltip-inner{text-align:left;}
</style>
<script>
  import { QRSITE } from '@/config'
  export default {
    name: 'mystore',
    mounted() {
      this.cbktype = parseInt(localStorage.getItem('mystcbk')) || 0;
      this.fetchData();
    },
    data() {
      return {
        modalshow:false,
        modalmsg: '',
        maskenabled: false,
        bigheadimgurl: '',
        admnodft:false,
        cbktype:0,
        sort: 0,
        cidstart: '',
        cidend: '',
        resetflags:[this.$t('message.ref0'),this.$t('message.ref1'),this.$t('message.ref2'),this.$t('message.ref3'),this.$t('message.ref4'),this.$t('message.ref5'),this.$t('message.ref6'),this.$t('message.ref7')],
        cbktypes:[{text:this.$t('message.cbk0'),value:0},{text:this.$t('message.cbk1'),value:1},{text:this.$t('message.cbk2'),value:2}],
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
      cbkchange($event) {
        this.cbktype = $event;
        localStorage.setItem('mystcbk',''+$event);
        this.pageid = 0;
        this.newpagestart = [];
        this.fetchData();
      },
      changesort(id) {
        if (this.sort!=id) {
          this.sort = id;
          this.pageid = 0;
          this.newpagestart = [];
          this.fetchData();
        }
      },
      dofilter() {
        this.sort = 0;
        this.pageid = 0;
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
        let theapi = '/mystore?tm='+new Date().getTime()+'&token='+token+'&pagesize='+this.$pagesize+'&sort='+this.sort+'&cbk='+this.cbktype+'&cidst='+this.cidstart+'&ciden='+this.cidend;
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
      stoclearsiteid(itm) {
        let token = localStorage.getItem('token');
        let theapi = '/stoclearsiteid?tm=' + new Date().getTime() + '&token=' + token + '&mac=' + itm.mac;
        this.axios.get(theapi).then(axresp => {
          if (axresp.status == 200) {
            let axdata = axresp.data;
            if (axdata.rc>0) {
              this.fetchData();
            } else {
              this.modalmsg = axdata.rm;
              this.modalshow = true;
            }
          }
        });
      },
      stoclearopenid(itm) {
        let token = localStorage.getItem('token');
        let theapi = '/stoclearopenid?tm=' + new Date().getTime() + '&token=' + token + '&mac=' + itm.mac;
        this.axios.get(theapi).then(axresp => {
          if (axresp.status == 200) {
            let axdata = axresp.data;
            if (axdata.rc>0) {
              this.fetchData();
            } else {
              this.modalmsg = axdata.rm;
              this.modalshow = true;
            }
          }
        });
      },
      storeqrcode(itm) {
        if (itm.chargerid==0) {
          this.modalmsg = '设备未开机。 在本页最下面配置开机分配的APP和编号,然后开机,设备将分配到对应编号和应用。';
          this.modalshow = true;
        } else if (itm.hasqr){
          let cids = ''+itm.chargerid;
          let imgurl = QRSITE + '/qr/' + cids.substr(0,2) + '/' + cids.substr(2,2) + '/' + cids + '.jpeg';
          this.bigheadimgurl = imgurl;
          this.maskenabled = true;
        } else {
          let that = this;
          let token = localStorage.getItem('token');
          let genqrapi = '/admstoqrcode?tm='+new Date().getTime()+'&token='+token+'&mac='+itm.mac;
          this.axios.get(genqrapi).then(axresp => {
            if (axresp.data.rc>0) {
              itm.hasqr = 1;
              let cids = ''+itm.chargerid;
              let imgurl = QRSITE + '/qr/' + cids.substr(0,2) + '/' + cids.substr(2,2) + '/' + cids + '.jpeg';
              that.bigheadimgurl = imgurl;
              that.maskenabled = true;
            }
          });
        }
      },
      closemask() {
        this.maskenabled = false;
      },
      gotodevice(itm) {
        let cidstart = itm.chargerid-1;
        let cidend = itm.chargerid+1;
        if (itm.siteid==0) {
          window.location.href = '/#/device' + this.cbktype+'?siteid=0&cidstart='+cidstart+'&cidend='+cidend;
        } else {
          window.location.href = '/#/device' + this.cbktype+'?cidstart='+cidstart+'&cidend='+cidend;
        }
      },
    }
  }
</script>
