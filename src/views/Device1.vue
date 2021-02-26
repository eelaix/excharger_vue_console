<template>
  <b-container fluid="xl">
    <div v-show="items.length">
      <b-row cols="1" cols-sm="1" cols-md="2" cols-lg="3">
        <b-col v-for="(item, index) in items" :key="index">
      <b-card class="xnshadow mb-5" :body-class="item.connected?'':'offlin'" header-tag="header" :header-class="item.stp?'text-warning':'text-white'" footer-tag="footer" footer-class="text-right" :header-bg-variant="item.connected?'success':'danger'">
        <template v-slot:header>
          <p class="mb-0">{{item.sitename}}<span class="ml-3 mr-4">#{{item.chargerid}}</span>
          <img :src="item.sigid" style="width:20px;height:20px;" :alt="item.sigmsg" :title="item.sigmsg"/>
          </p>
        </template>
        <b-card-text>
          <b-row cols="2" class="mb-2">
            <div><span class="btn-sm">{{item.connected?'数据时间':'离线时间'}}</span><span style="font-size:small;">{{item.connected?item.beep:item.ofline}}</span></div>
            <div><b-link href class="text-decoration-none btn-sm" @click="gotopow(item)">用电抄表</b-link><span style="font-size:small;">{{item.pow}}</span></div>
            <div><span class="btn-sm" :class="item.ac?'text-danger':''">{{acs[item.ac]}}</span><span style="font-size:small;">{{localtime}}</span></div>
            <div><span class="btn-sm"><span @click="docmd(17,item)">设</span><span @click="docmd(18,item)">备</span><span @click="docmd(19,item)">温</span><span @click="docmd(20,item)">度</span></span><span style="font-size:small;">{{item.tp[0]}}/{{item.tp[1]}}/{{item.tp[2]}}</span></div>
            <div class="text-secondary"><span class="btn-sm">电压电流</span><span style="font-size:small;">{{item.pvv}}/{{item.pii}}</span></div>
            <div class="text-secondary"><span class="btn-sm"><span @click="allsw(15,item)">急停</span><span @click="allsw(16,item)">开箱</span></span><span style="font-size:small;">{{item.stp?'按下':'正常'}}/{{item.ta?'已开':'已关'}}</span></div>
          </b-row>
          <b-row cols="2" class="mb-2" style="font-size:small;">
            <div class="pt-2 pb-1">
              <b-col style="padding-left:0px;padding-right:0px;" class="mb-2">
                <b-link href @click="toggleimax(0,item)" class="text-decoration-none btn-sm" :disabled="item.connected==0"
                v-b-tooltip.hover :title="item.imax[0]?('最大电流'+item.imax[0]+'A,点击禁用'):('点击开启默认电流')">
                {{item.imax[0]?'左枪电量':'左枪禁用'}}
                </b-link>
                <span @click="resetpow(0,item)">{{item.pw[0]}}</span></b-col>
              <b-col style="padding-left:0px;padding-right:0px;" class="mb-2" :class="item.imax[0]?'':'invalid'"><span class="btn-sm" size="sm">通断用户</span>
              <b-link href @click="togglesw(0,item)" class="text-decoration-none">
              {{sws[item.sw[0]]}}
              </b-link>
              <span>
                <b-link href @click="showusr(0,item)" class="text-decoration-none mr-1" :class="item.openid[0]?'bg-primary text-white':''"
                :disabled="item.openid[0]==''">{{item.openid[0]?'有人':'无人'}}</b-link>
              </span></b-col>
              <b-col style="padding-left:0px;padding-right:0px;" class="mb-2" :class="item.imax[0]?'':'invalid'"><span class="btn-sm">地锁情况</span><span>{{lks[item.lk[0]]}}</span></b-col>
              <b-col style="padding-left:0px;padding-right:0px;" class="mb-2" :class="item.imax[0]?'':'invalid'"><span class="btn-sm">电流状态</span><span>{{item.pi[0]}}<span class="ml-1 greyco">{{item.st[0]}}</span></span></b-col>
              <b-col style="padding-left:0px;padding-right:0px;" class="btn-sm" :class="item.imax[0]?'':'invalid'"><span class="btn-sm">正负CP</span><span class="ml-2">{{item.cp[0]}}<span class="ml-1 greyco">{{item.cz[0]}}</span></span></b-col>
            </div>
            <div class="pt-2 pb-1">
              <b-col style="padding-left:0px;padding-right:0px;" class="mb-2">
                <b-link href @click="toggleimax(1,item)" class="text-decoration-none btn-sm" :disabled="item.connected==0"
                v-b-tooltip.hover :title="item.imax[1]?('最大电流'+item.imax[1]+'A,点击禁用'):('点击开启默认电流')">
                {{item.imax[1]?'右枪电量':'右枪禁用'}}
                </b-link>
                <span @click="resetpow(1,item)">{{item.pw[1]}}</span></b-col>
              <b-col style="padding-left:0px;padding-right:0px;" class="mb-2" :class="item.imax[1]?'':'invalid'"><span class="btn-sm">通断用户</span>
              <b-link href @click="togglesw(1,item)" class="text-decoration-none">
              {{sws[item.sw[1]]}}
              </b-link>
              <span>
                <b-link href @click="showusr(1,item)" class="text-decoration-none mr-1" :class="item.openid[1]?'bg-primary text-white':''"
                :disabled="item.openid[1]==''">{{item.openid[1]?'有人':'无人'}}</b-link>
              </span></b-col>
              <b-col style="padding-left:0px;padding-right:0px;" class="mb-2" :class="item.imax[1]?'':'invalid'"><span class="btn-sm">地锁情况</span><span>{{lks[item.lk[1]]}}</span></b-col>
              <b-col style="padding-left:0px;padding-right:0px;" class="mb-2" :class="item.imax[1]?'':'invalid'"><span class="btn-sm">电流状态</span><span>{{item.pi[1]}}<span class="ml-1 greyco">{{item.st[1]}}</span></span></b-col>
              <b-col style="padding-left:0px;padding-right:0px;" :class="item.imax[1]?'':'invalid'"><span class="btn-sm">正负CP</span><span class="ml-2">{{item.cp[1]}}</span><span class="ml-1 greyco">{{item.cz[1]}}</span></b-col>
            </div>
          </b-row>
          <b-row style="font-size:small;" class="ml-0">
            <div>第{{item.pon}}次 {{item.act}} {{resetflags[item.rsf]}}, {{item.pot}}第{{item.cot}}次联网</div>
          </b-row>
        </b-card-text>
        <template v-slot:footer>
          <b-button size="sm" variant="outline-primary" class="mr-2"
          :to="{path:'chargeac',query:{chargerid:item.chargerid,tm:new Date().getTime()}}">历史</b-button>
          <b-button size="sm" variant="outline-primary" class="mr-2" :to="{path:'yydaycharger',query:{tm:new Date().getTime(),chargerid:item.chargerid}}">统计</b-button>
          <b-button size="sm" variant="outline-primary" class="mr-2" :disabled="item.connected==0" @click="docmd(11,item)">激活</b-button>
          <b-button size="sm" variant="outline-primary" class="mr-2" :disabled="item.connected==0" @click="docmd(0,item)">三响</b-button>
          <b-button size="sm" variant="outline-primary" :disabled="item.connected==0" @click="docmd(1,item)">重启</b-button>
        </template>
      </b-card>
        </b-col>
      </b-row>
    </div>
    <div v-show="items.length==0">
      <b-card class="xnshadow" header-tag="header" footer-tag="footer">
        <template v-slot:header>
          <h4 class="mb-0"><b-icon icon="phone"></b-icon> 没有发现充电桩</h4>
        </template>
        <b-card-text>
          <p>
            暂时没有发现充电桩<br/>
            采购设备，扫码添加，分配到电站，立即显示。<br/>
            <b-form inline class="mt-4"><b-alert :show="admnodft">{{$t('message.cfmdefault')}}</b-alert></b-form>
           </p>
        </b-card-text>
      </b-card>
    </div>
    <div v-show="maskenabled" class="fullmask" @click="closemask">
      <div class="navbar-fixed-top alert-danger text-left pt-2 pb-2" :show="alertmsg" @click="closemask">{{alertmsg}}</div>
      <div class="imgshow xnshadow">
        <img :src="bigheadimgurl" style="max-width:100vw;max-height:50vh"/>
      </div>
    </div>
    <b-form inline class="mt-4">
      <b-button-group class="mr-4">
        <b-button variant="success" @click="fetchprev" :disabled="pageid==0">{{$t('message.btn_prevpage')}}</b-button>
        <b-button v-if="pageid>0" variant="outline-success" :disabled="true" >{{pageid+1}}</b-button>
        <b-button variant="success" @click="fetchNext" :disabled="pageid==newpagestart.length">{{$t('message.btn_nextpage')}}</b-button>
      </b-button-group>
      <b-radio-group buttons class="mr-4" v-model="online" @change="uchange" button-variant="outline-primary">
        <b-form-radio value="0">全部</b-form-radio>
        <b-form-radio value="1">在线</b-form-radio>
        <b-form-radio value="2">离线</b-form-radio>
      </b-radio-group>
    </b-form>
    <b-modal v-model="modalshow" no-close-on-backdrop no-close-on-esc hide-header ok-only :ok-title="$t('message.btn_ok')">{{modalmsg}}</b-modal>
  </b-container>
</template>

<style>
  a{color:rgba(0,102,0,0.5);}
  .offlin {background-color:#D3D3D3;filter:Alpha(Opacity=60);opacity:0.6;color:#666}
</style>
<script>
  let reloades = 0;
  export default {
    name: 'device1',
    created() {
      this.gettime();
    },
    mounted() {
      this.fetchData();
    },
    data() {
      return {
        modalshow:false,
        modalmsg: '',
        maskenabled: false,
        bigheadimgurl: '',
        alertmsg: '',
        online:0,
        resetflags:[this.$t('message.ref0'),this.$t('message.ref1'),this.$t('message.ref2'),this.$t('message.ref3'),this.$t('message.ref4'),this.$t('message.ref5'),this.$t('message.ref6'),this.$t('message.ref7')],
        lks: ['没有地锁', '未知状态', '立起无车', '中间无车', '中间有车', '倒下无车', '倒下有车', '故障'],
        acs: ['本地时间','接地不良','火零反接','接地检测'],
        sws: ['已断','已通','禁用'],
        admnodft:false,
        localtime:'00:00:00',
        facemoney:'',
        cardcnts:'',
        expdays:'',
        items: [],
        pageid:0,
        newpagestart:[]
      };
    },
    methods: {
      gettime(){
        let nowtm = new Date();
        let hour = nowtm.getHours();
        let minu = nowtm.getMinutes();
        let secd = nowtm.getSeconds();
        if (hour<10) hour = '0'+hour;
        if (minu<10) minu = '0'+minu;
        if (secd<10) secd = '0'+secd;
        this.localtime = hour+':'+minu+':'+secd;
        if (this.$route.fullPath.indexOf('device1')>0) setTimeout(this.gettime, 900);
      },
      fetchprev() {
        this.pageid = this.pageid-1;
      },
      fetchPage(page) {
        this.pageid = page;
      },
      fetchNext() {
        this.pageid = this.pageid+1;
      },
      uchange($event) {
        this.online = $event;
        this.pageid = 0;
        this.newpagestart = [];
      },
      togglesw(id,itm) {
        reloades = 0;
        let val = itm.sw[id]*100+id;
        let token = localStorage.getItem('token');
        let theapi = '/docmd?tm='+new Date().getTime()+'&token='+token+'&mac='+itm.mac+'&cmd=14&val='+val;
        if (itm.cp[id]>10 && itm.sw[id]==0) {
          theapi = theapi + '&openid=' + itm.openid[id];
        }
        this.axios.get(theapi).then();        
      },
      toggleimax(id,itm) {
        reloades = 0;
        let sw = itm.sw[id];
        if (sw==1) {
            this.modalmsg = '正在充电，不能禁用端口！';
            this.modalshow = true;
        } else {
            if (sw==2) {
              let token = localStorage.getItem('token');
              let theapi = '/docmd?tm='+new Date().getTime()+'&token='+token+'&mac='+itm.mac+'&cmd=12&val='+id;
              this.axios.get(theapi).then();
            } else {
              if (confirm('您真的想要禁用这个端口吗？')) {
                let token = localStorage.getItem('token');
                let theapi = '/docmd?tm='+new Date().getTime()+'&token='+token+'&mac='+itm.mac+'&cmd=13&val='+id;
                this.axios.get(theapi).then();
              }
            }
        }
      },
      closemask() {
        this.maskenabled = false;
        this.alertmsg = '';
      },
      showusr(id,itm) {
        reloades = 0;
        let cid = itm.chargerid;
        let pow = Number(itm.pw[id])*1000;
        let oid = itm.openid[id];
        let avgpow = (itm.pi[id]*itm.pvv/1000).toFixed(1);
        let token = localStorage.getItem('token');
        let theapi = '/showusr?tm='+new Date().getTime()+'&token='+token+'&oid='+oid+'&cid='+cid;
        this.axios.get(theapi).then(axresp => {
          this.bigheadimgurl = axresp.data.url;
          let powuse = pow - axresp.data.powstart;
          if (powuse<0) powuse = 0;
          powuse = powuse + axresp.data.powused;
          powuse = (powuse/1000).toFixed(3);
          this.alertmsg = axresp.data.nickname+axresp.data.msg+', 功率'+avgpow+'千瓦, 已用电'+powuse+'度';
          this.maskenabled = true;
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
      gotopow(itm) {
        reloades = 0;
        var agree1 = parseInt(localStorage.getItem('agree1')) || 0;
        if (agree1 < 10) {
          var msg = '电表每日抄表数据可按充电站统计，也可按充电桩统计，不需要登陆，打开网页后将网页地址复制给到相关人员即可打开。你真的要访问本站(桩)电表每日抄表数吗？';
          if (confirm(msg)) {
            localStorage.setItem('agree1',''+(agree1+1));
            this.funagreepow(1, itm.chargerid);
          }
        } else {
          this.funagreepow(1, itm.chargerid);
        }
      },
      docmd(id,itm) {
        reloades = 0;
        let token = localStorage.getItem('token');
        let theapi = '/docmd?tm='+new Date().getTime()+'&token='+token+'&mac='+itm.mac+'&cmd='+id;
        this.axios.get(theapi).then();
      },
      allsw(id,itm) {
        reloades = 0;
        let token = localStorage.getItem('token');
        let theapi = '/docmd?tm='+new Date().getTime()+'&token='+token+'&mac='+itm.mac+'&cmd='+id;
        this.axios.get(theapi).then();
      },
      resetpow(id,itm) {
        reloades = 0;
        var msg = '重置电表可以让电表恢复至0，你真的想要重置电表数据吗？';
        if (confirm(msg)) {
          if (id==0) {
            this.docmd(6,itm);
          } else {
            this.docmd(7,itm);
          }
        }
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
        let theapi = '/device1?tm='+new Date().getTime()+'&token='+token+'&pagesize='+this.$pagesize+'&online='+this.online;
        if (this.$route.query.siteid || this.$route.query.siteid==0) {
          theapi = theapi + '&siteid='+this.$route.query.siteid;
        }
        if (this.$route.query.cidstart) {
          theapi = theapi + '&cidstart='+this.$route.query.cidstart+'&cidend='+this.$route.query.cidend;
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
          if (this.$route.fullPath.indexOf('device1')>0 && reloades<10000) {
            let reloadms = 1000;
            if (this.items.lengtg<4) {
              reloadms = 300;
            } else {
              if (reloades<500) {
                reloadms = 500;
              } else if (reloades<1000) {
                reloadms = 800;
              } else if (reloades<2000) {
                reloadms = 1000;
              } else {
                reloadms = 2000;
              }
            }
            setTimeout(this.fetchData, reloadms);
            reloades++;
          }
        });
      },
    }
  }
</script>
