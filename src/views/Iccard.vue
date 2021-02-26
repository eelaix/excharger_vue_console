<template>
  <b-container fluid="xs">
    <div v-show="items.length">
    <b-table-simple hover small caption-top responsive="xs">
      <b-thead head-variant="light">
        <b-tr>
          <b-th>IC卡号</b-th>
          <b-th>首次刷卡时间</b-th>
          <b-th v-b-tooltip.hover title="点击可查看地图位置">刷卡站点</b-th>
          <b-th v-b-tooltip.hover title="分配前与分配后的次数">次数</b-th>
          <b-th v-b-tooltip.hover title="客户自主启用/禁用">状态</b-th>
          <b-th>启禁用时间</b-th>
          <b-th>分配时间</b-th>
          <b-th v-b-tooltip.hover title="输入手机号,分配给账户">分配客户</b-th>
        </b-tr>        
      </b-thead>
      <b-tbody>
        <b-tr v-for="(item, index) in items" :key="index">
          <b-td>{{item.id}}</b-td>
          <b-td>{{item.cretimestr}}</b-td>
          <b-td @click="showmask(item)">{{item.sitename}}</b-td>
          <b-td>{{item.usetms0}}/{{item.usetms1}}</b-td>
          <b-td>{{item.valid?'有效':'禁用'}}</b-td>
          <b-td>{{item.vldtime?item.vldtime:'未启用'}}</b-td>
          <b-td>{{item.fptime?item.fptime:'未分配'}}</b-td>
          <b-td v-if="workingid==index">
               <b-input-group size="sm">
                 <b-form-input v-model="item.mobile"></b-form-input>
                 <b-input-group-append>
                   <b-button variant="info" @click="iccardfp(item)">{{$t('message.btn_iccardfp1')}}</b-button>
                 </b-input-group-append>
               </b-input-group>
          </b-td>
           <b-td v-else-if="item.mobile">
           {{item.mobile}} {{item.nickname}} 
          </b-td>
          <b-td v-else>
             <b-button size="sm" variant="outline-secondary" @click="setme(index)">{{$t('message.btn_iccardfp2')}}</b-button>
          </b-td>
        </b-tr>
      </b-tbody>
    </b-table-simple>
    </div>
    <div v-show="items.length==0" class="pl-5 pr-5">
      <b-card class="xnshadow" header-tag="header" footer-tag="footer">
        <template v-slot:header>
          <h4 class="mb-0"><b-icon icon="card-heading"></b-icon> IC卡管理</h4>
        </template>
        <b-card-text>
          <p>
            暂时没有发现有效的IC卡<br/><br/>
            客户刷任何IC卡可显示卡号<br/>
            在这里可绑定IC卡与微信账号<br/>
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
    <b-radio-group
        buttons
        v-model="fpstate"
        class="mr-4"
        :options="fpopts"
        @change="fpchange"
        button-variant="outline-primary"
      ></b-radio-group>
    <b-input-group class="col-3">
        <b-form-input placeholder="刷卡电桩或手机号" v-model="mocharge"></b-form-input>
        <b-input-group-append>
          <b-button variant="info" @click="search">查找</b-button>
        </b-input-group-append>
    </b-input-group>
    </b-form>
    <b-modal v-model="modalshow" no-close-on-backdrop no-close-on-esc hide-header ok-only :ok-title="$t('message.btn_ok')">{{modalmsg}}</b-modal>
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
  </b-container>
</template>

<script>
  import { MOBILEX } from '@/consv'
  import BaiduMap from 'vue-baidu-map/components/map/Map.vue';
  import BmLabel from 'vue-baidu-map/components/overlays/Label.vue';
  import BmMarker from 'vue-baidu-map/components/overlays/Marker.vue';
  import BmNavigation from 'vue-baidu-map/components/controls/Navigation.vue';
  export default {
    name: 'iccard',
    components: {
      BaiduMap,
      BmLabel,
      BmMarker,
      BmNavigation
    },
    mounted() {
      this.fpstate = parseInt(localStorage.getItem('icfpst')) || 0;
      this.fetchData();
    },
    data() {
      return {
        maskenabled: false,
        center:{lat:0,lng:0},
        sitename:'sitename',
        workingid:-1,
        modalshow:false,
        modalmsg: '',
        mocharge: '',
        fpstate:0,
        fpopts:[{text:'未分配',value:0},{text:'已分配',value:1}],
        items: [],
        pageid:0,
        newpagestart:[]
      };
    },
    methods: {
      setme(index) {
        this.workingid = index;
      },
      fpchange($event) {
        this.fpstate = $event;
        localStorage.setItem('icfpst',''+$event);
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
      search() {
        if (this.mocharge.length==0 || this.mocharge.length==6 || this.mocharge.length==11) {
          if (this.mocharge.length==11 && this.fpstate==0) {
            this.modalmsg = '手机号查询只能在已分配中进行';
            this.modalshow = true;
          } else {
            this.pageid = 0;
            this.newpagestart = [];
            this.fetchData();
          }
        }else{
          this.modalmsg = '请输入6位电桩编号或11位手机号';
          this.modalshow = true;
        }
      },
      fetchData() {
        let token = localStorage.getItem('token');
        let theapi = '/iccards?tm='+new Date().getTime()+'&token='+token+'&pagesize='+this.$pagesize+'&fp='+this.fpstate+'&mocharge='+this.mocharge;
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
      iccardfp(itm) {
        this.workingid = -1;
        let mobile = itm.mobile;
        let cardid = itm.id;
        if (mobile) {
          if (!MOBILEX.test(mobile)) {
            this.modalmsg = '无效的手机号！';
            this.modalshow = true;
          } else {
            let token = localStorage.getItem('token');
            let theapi = '/iccardfp?tm='+new Date().getTime()+'&token='+token+'&mobile='+mobile+'&cardid='+cardid;
            this.axios.get(theapi).then(axresp => {
              if (axresp.status==200) {
                if (axresp.data.rc>0) {
                  this.fetchData();
                } else {
                  this.modalmsg = axresp.data.rm;
                  this.modalshow = true;
                }
              }
            });
          }
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
    }
  }
</script>
