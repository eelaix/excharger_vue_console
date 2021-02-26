<template>
  <b-container fluid="xs">
    <div v-show="items.length">
    <b-table-simple hover small caption-top responsive>
      <b-thead head-variant="light">
        <b-tr>
          <b-th class="d-none d-md-table-cell" v-b-tooltip.hover :title="$t('message.site_tt0')">&nbsp;<br/>{{$t('message.site_name')}}</b-th>
          <b-th class="d-none d-md-table-cell">&nbsp;<br/>{{$t('message.site_creator')}}</b-th>
          <b-th v-b-tooltip.hover :title="$t('message.site_tt1')" v-html="$t('message.site_start')"></b-th>
          <b-th class="d-none d-md-table-cell"><span class="small" v-html="$t('message.site_tocharger')"></span></b-th>
          <b-th v-html="$t('message.site_topaybill')"></b-th>
          <b-th v-b-tooltip.hover :title="$t('message.site_tt2')" v-html="$t('message.site_fee1')"></b-th>
          <b-th class="d-none d-lg-table-cell"><span class="small" v-html="$t('message.site_fee2')"></span></b-th>
          <b-th v-b-tooltip.hover :title="$t('message.site_tt3')" class="d-none d-sm-table-cell d-md-table-cell d-lg-none"><span class="small" v-html="$t('message.site_fee3')"></span></b-th>
          <b-th><span v-html="$t('message.site_evday')"></span><span v-html="$t('message.site_count')"></span></b-th>
        </b-tr>        
      </b-thead>
      <b-tbody v-for="item in items" :key="item.id">
        <b-tr>
          <b-td class="d-none d-md-table-cell" v-b-tooltip.hover :title="item.id">{{item.sitename}}</b-td>
          <b-td class="d-none d-md-table-cell" v-b-tooltip.hover :title="item.mobile">{{item.nickname}}</b-td>
          <b-td>
            <b-button size="sm" variant="outline-success" @click="showmask(item)">{{item.creday}}</b-button>
          </b-td>
          <b-td class="d-none d-md-table-cell">
            <b-button-group size="sm">
            <b-button :variant="item.regcnt0 | toVar1" :disabled="item.regcnt0==0"
            :to="{path:'device0',query:{siteid:item.id,tm:new Date().getTime()}}">{{item.regcnt0}}</b-button>
            <b-button :variant="item.regcnt1 | toVar1" :disabled="item.regcnt1==0"
            :to="{path:'device1',query:{siteid:item.id,tm:new Date().getTime()}}">{{item.regcnt1}}</b-button>
            <b-button :variant="item.regcnt2 | toVar1" :disabled="item.regcnt2==0"
            :to="{path:'device2',query:{siteid:item.id,tm:new Date().getTime()}}">{{item.regcnt2}}</b-button>
            </b-button-group>
          </b-td>
          <b-td>
            <b-button-group size="sm">
            <b-button :variant="item.regcnt0 | toVar1" :disabled="item.regcnt0==0"
            :to="{path:'chargebk',query:{siteid:item.id,tm:new Date().getTime()}}"
            >{{$t('message.comm_bk1')}}<span class="d-none d-sm-inline-block">{{$t('message.comm_bk2')}}</span></b-button>
            <b-button :variant="item.regcnt1 | toVar1" :disabled="item.regcnt1==0"
            :to="{path:'chargeac',query:{siteid:item.id,tm:new Date().getTime()}}"
            >{{$t('message.comm_ac1')}}<span class="d-none d-sm-inline-block">{{$t('message.comm_ac2')}}</span></b-button>
            <b-button :variant="item.regcnt2 | toVar1" :disabled="item.regcnt2==0"
            :to="{path:'chargedc',query:{siteid:item.id,tm:new Date().getTime()}}"
            >{{$t('message.comm_dc1')}}<span class="d-none d-sm-inline-block">{{$t('message.comm_dc2')}}</span></b-button>
            </b-button-group>
          </b-td>
          <b-td>
            <b-button size="sm" variant="outline-success" :to="{path:'prize',query:{site:item.id}}">{{item.evpofees[0].toFixed(2)}}+{{item.evsvcfee.toFixed(2)}}</b-button>
          </b-td>
          <b-td class="d-none d-lg-table-cell">{{item.bkprize|a2str}}</b-td>
          <b-td class="d-none d-sm-table-cell d-md-table-cell d-lg-none">{{item.bkprize[0].toFixed(2)}}</b-td>
          <b-td>
            <b-button-group size="sm">
              <b-button variant="outline-success" :to="{path:'yydaycharger',query:{tm:new Date().getTime(),siteid:item.id}}">{{$t('message.comm_cnt1')}}<span class="d-none d-sm-inline-block">{{$t('message.comm_cnt2')}}</span></b-button>
              <b-button variant="outline-success" @click="gotopow(item)">{{$t('message.comm_cnt3')}}<span class="d-none d-sm-inline-block">{{$t('message.comm_cnt4')}}</span></b-button>
            </b-button-group>
          </b-td>
        </b-tr>
        <b-tr>
          <b-td colspan="5" class="d-table-cell d-md-none">
          <span class="greyco mr-3">{{item.nickname}}</span>
          <b-button-group class="mr-3">
            <b-link href class="text-decoration-none mr-1" :disabled="item.regcnt0==0" :to="{path:'device0',query:{siteid:item.id,tm:new Date().getTime()}}">{{$t('message.cbk0')}}{{item.regcnt0}}</b-link>
            <b-link href class="text-decoration-none mr-1" :disabled="item.regcnt1==0" :to="{path:'device1',query:{siteid:item.id,tm:new Date().getTime()}}">{{$t('message.cbk1')}}{{item.regcnt1}}</b-link>
            <b-link href class="text-decoration-none" :disabled="item.regcnt2==0" :to="{path:'device2',query:{siteid:item.id,tm:new Date().getTime()}}">{{$t('message.cbk2')}}{{item.regcnt2}}</b-link>
          </b-button-group>
          <span class="greyco mr-3">{{item.sitename}}</span>
          </b-td>
        </b-tr>
      </b-tbody>
    </b-table-simple>
    </div>
    <div v-show="items.length==0" class="pl-5 pr-5">
      <b-card class="xnshadow" header-tag="header" footer-tag="footer">
        <template v-slot:header>
          <h4 class="mb-0"><b-icon icon="grid-1x2"></b-icon> 充电站</h4>
        </template>
        <b-card-text>
          <p>
            暂时未发现充电站<br/><br/>
            微信小程序-充值-运营助手-创建充电站<br/>
            创建充电站之前需先采购充电桩设备<br/>
           </p>
        </b-card-text>
      </b-card>
    </div>
    <b-form inline class="mt-4 ml-4">
      <b-button-group>
        <b-button variant="success" @click="fetchprev" :disabled="pageid==0">{{$t('message.btn_prevpage')}}</b-button>
        <b-button v-if="pageid>0" variant="outline-success" :disabled="true" >{{pageid+1}}</b-button>
        <b-button variant="success" @click="fetchNext" :disabled="pageid==newpagestart.length">{{$t('message.btn_nextpage')}}</b-button>
      </b-button-group>
      <b-input-group class="col-7 col-sm-6 col-md-6 col-lg-5 col-xl-4">
          <b-form-input placeholder="5～6位桩号或4,7~11位手机" v-model="search" type="number"></b-form-input>
          <b-input-group-append>
            <b-button variant="info" @click="gosearch"><b-icon icon="search"></b-icon></b-button>
          </b-input-group-append>
      </b-input-group>
    </b-form>
    <div v-show="maskenabled" class="fullmask" @click="closemask">
      <div class="mapshow xnshadow">
        <baidu-map class="bm-view" ak="qnVnrNzpNWBZxWvLwtL2jYhwe70WgCB1" :zoom="15" :center="center">
          <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
          <bm-marker :position="center" :dragging="true" animation="BMAP_ANIMATION_BOUNCE">
            <bm-label :content="sitename" :labelStyle="{color:'red',fontSize:'12px'}" :offset="{width: -30, height: 30}"/>
          </bm-marker>
        </baidu-map>
      </div>
    </div>
    <b-modal v-model="modalshow" no-close-on-backdrop no-close-on-esc hide-header ok-only :ok-title="$t('message.btn_ok')">{{modalmsg}}</b-modal>
  </b-container>
</template>

<script>
  import BaiduMap from 'vue-baidu-map/components/map/Map.vue';
  import BmLabel from 'vue-baidu-map/components/overlays/Label.vue';
  import BmMarker from 'vue-baidu-map/components/overlays/Marker.vue';
  import BmNavigation from 'vue-baidu-map/components/controls/Navigation.vue';
  export default {
    name: 'site',
    components: {
      BaiduMap,
      BmLabel,
      BmMarker,
      BmNavigation
    },
    mounted() {
      this.fetchData();
    },
    data() {
      return {
        modalshow:false,
        modalmsg: '',
        maskenabled: false,
        center:{lat:0,lng:0},
        sitename:'sitename',
        test:'success',
        search:'',
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
        let token = localStorage.getItem('token');
        let theapi = '/sites?tm='+new Date().getTime()+'&token='+token+'&pagesize='+this.$pagesize;
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
      funagreepow(tp,id) {
        let token = localStorage.getItem('token');
        var theapi = '/powsec?tm='+new Date().getTime()+'&token='+token+'&tp='+tp+'&id='+id;
        this.axios.get(theapi).then(axresp => {
          if (axresp.status==200) {
            var data = axresp.data;
            if (data.rc>0 && data.sec) {
              this.$router.push({name:'power',params:{tp:tp,id:id,sec:data.sec}});
            }
          }
        });
      },
      gosearch() {
        let token = localStorage.getItem('token');
        let theapi = '/gosearch?tm='+new Date().getTime()+'&token='+token+'&search='+this.search;
        this.axios.get(theapi).then(axresp => {
          if (axresp.status==200) {
            let data = axresp.data;
            if (data.rc>0) {
              if (data.setdft) {
                localStorage.setItem('dftapp',data.setdft);
                let user = JSON.parse(localStorage.getItem('user'));
                user.appname = data.appname;
                localStorage.setItem('user',JSON.stringify(user));
              }
              if (data.cbk<3) {
                let query = {tm:new Date().getTime(),cidstart:data.cidstart,cidend:data.cidend};
                if (data.siteid==0) {
                  query.siteid = 0;
                }
                this.$router.push({name:'device'+data.cbk,query:query});
              } else {
                let query = {tm:new Date().getTime(),search:data.search};
                if (data.alertmsg) {
                  query.alertmsg = data.alertmsg;
                }
                this.$router.push({name:'user',query:query});
              }
            } else {
              this.modalmsg = data.rm;
              this.modalshow = true;
            }
          }
        });
      },
      gotopow(itm) {
        var agree1 = parseInt(localStorage.getItem('agree1')) || 0;
        if (agree1 < 10) {
          var msg = '电表每日抄表数据可按充电站统计，也可按充电桩统计，不需要登陆，打开网页后将网页地址复制给到相关人员即可打开。你真的要访问本站(桩)电表每日抄表数吗？';
          if (confirm(msg)) {
            localStorage.setItem('agree1',''+(agree1+1));
            this.funagreepow(3, itm.id);
          }
        } else {
          this.funagreepow(3, itm.id);
        }
      },
      showmask(itm) {
        this.center.lng = itm.lng;
        this.center.lat = itm.lat;
        this.sitename = itm.sitename;
        this.maskenabled = true;
      },
      closemask() {
        this.maskenabled = false;
      }
    },
  }
</script>
