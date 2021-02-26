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
          <b-th v-b-tooltip.hover :title="$t('message.msto_tta')" class="d-none d-md-table-cell">{{$t('message.msto_tha')}}</b-th>
          <b-th v-b-tooltip.hover :title="$t('message.msto_ttb')" class="d-none d-lg-table-cell">{{$t('message.msto_thb')}}</b-th>
          <b-th class="d-none d-lg-table-cell">{{$t('message.msto_thd')}}</b-th>
        </b-tr>
      </b-thead>
      <b-tbody v-for="(item, index) in items" :key="index">
        <b-tr>
          <b-td v-if="workingid==index">
              <b-input-group size="sm">
                <b-form-input v-model="item.chargerid"></b-form-input>
                <b-input-group-append>
                  <b-button variant="info" @click="resetchargerid(item)">{{$t('message.btn_save')}}</b-button>
                </b-input-group-append>
              </b-input-group>
          </b-td>
          <b-td v-else>
            <b-button size="sm" variant="outline-info" @click="gotodevice(item)">{{item.chargerid}}</b-button>
            <b-button size="sm" variant="link" @click="setme(index)"><b-icon variant="success" icon="gear"></b-icon></b-button>
          </b-td>
          <b-td :class="item.connected==1?'text-success':'text-secondary'" v-b-tooltip.hover :title="item.cellinfo">{{item.act}}</b-td>
          <b-td>
            <b-button size="sm" variant="default" @click="docmd(8,item)">{{item.pon}}</b-button>
          </b-td>
          <b-td>{{item.yyrealname}}
              <b-button size="sm" variant="link" :disabled="((item.siteid>0)||(item.openid==''))" @click="stoclearopenid(item)"><b-icon variant="success" icon="x-circle"></b-icon></b-button>
          </b-td>
          <b-td class="d-none d-sm-table-cell">{{item.sitename}}
            <b-button size="sm" variant="link" :disabled="item.siteid==0" @click="stoclearsiteid(item)"><b-icon variant="success" icon="x-circle"></b-icon></b-button>
          </b-td>
          <b-td class="d-none d-md-table-cell">{{item.addedtime}}</b-td>
          <b-td class="d-none d-md-table-cell">{{item.appname}}
              <b-button size="sm" variant="link" :disabled="((item.openid!='')||(item.chargerid==0))" @click="stoclearapp(item)"><b-icon variant="success" icon="x-circle"></b-icon></b-button>
          </b-td>
          <b-td class="d-none d-lg-table-cell">
              <b-button-group size="sm">
                  <b-button variant="outline-success" @click="docmd(2,item)" :disabled="item.connected==0">{{$t('message.msto_ca')}}</b-button>
                  <b-button variant="outline-success" @click="docmd(3,item)" :disabled="item.connected==0">
                  <span>{{item.upstep?item.upstep:item.ver}}</span>
                  </b-button>
                  <b-button variant="outline-success" @click="docmd(9,item)" :disabled="item.connected==0">{{$t('message.msto_getp')}}</b-button>
                  <b-button variant="outline-success" @click="docmd(10,item)" :disabled="item.connected==0">{{$t('message.msto_getl')}}</b-button>
                  <b-button variant="outline-success" @click="storedelete(item)"><b-icon icon="trash" aria-hidden="true"></b-icon></b-button>
              </b-button-group>
          </b-td>
          <b-td class="d-none d-lg-table-cell" v-b-tooltip.hover :title="item.swt">{{resetflags[item.rsf]}}</b-td>
        </b-tr>
        <b-tr>
          <b-td colspan="5" class="greyco d-table-cell d-md-none">
            <span>{{item.sitename}}
              <b-button size="sm" variant="link" :disabled="item.siteid==0" @click="stoclearsiteid(item)"><b-icon variant="success" icon="x-circle"></b-icon></b-button>
            </span>
            <span>{{item.addtime}}</span>
            {{item.appname}}<b-button size="sm" variant="link" :disabled="((item.openid!='')||(item.chargerid==0))" @click="stoclearapp(item)"><b-icon variant="success" icon="x-circle"></b-icon></b-button>
            <b-button-group size="sm">
                  <b-button variant="outline-success" @click="docmd(9,item)" :disabled="item.connected==0">{{$t('message.msto_getp')}}</b-button>
                  <b-button variant="outline-success" @click="docmd(10,item)" :disabled="item.connected==0">{{$t('message.msto_getl')}}</b-button>
                  <b-button variant="outline-success" @click="storedelete(item)"><b-icon icon="trash" aria-hidden="true"></b-icon></b-button>
            </b-button-group>
          </b-td>
        </b-tr>
      </b-tbody>
      </b-table-simple>
    </div>
    <div v-show="items.length==0" class="pl-5 pr-5">
      <b-card class="xnshadow" header-tag="header" footer-tag="footer">
        <template v-slot:header>
          <h4 class="mb-0">
            <b-icon icon="x-diamond"></b-icon> 没有库存设备
          </h4>
        </template>
        <b-card-text>
          <p>
            没有发现库存设备。<br />
            新设备开机工作步骤：<br />
            1)开关234打到ON,开机,三灯狂闪按急停,等十秒,恢复急停;<br />
            2)开关5打到OFF是获取证书,开关5打到ON是升级程序;<br />
            3)设备联网后也可以从后台发指令要求设备升级程序或下载证书;<br />
            4)板载开关设置需要后台允许,未经允许的设置无法开通;<br />
            5)若本页无数据,请选择其他类型充电桩。<br />
            6)库存管理仅限超级用户，展示所有设备，采购库存仅展示本运营商设备<br />
            7)电桩编号过滤支持模糊查询，比如：起始编号输入1010表示查询101000~101099<br />
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
      <b-radio-group buttons v-model="cbktype" class="mr-4" :options="cbktypes" @change="cbkchange" button-variant="outline-primary"></b-radio-group>
      <b-input-group class="col-7 col-sm-6 col-md-6 col-lg-5 col-xl-4">
          <b-form-input placeholder="起始桩号" v-model="cidstart"></b-form-input>
          <b-form-input placeholder="结束桩号" v-model="cidend"></b-form-input>
          <b-input-group-append>
            <b-button variant="info" @click="dofilter">过滤</b-button>
          </b-input-group-append>
      </b-input-group>
    </b-form>
    <b-form class="mt-2 ml-4 mr-4" v-if="cbktype==0">
      <b-input-group :prepend="$t('message.asto_newdeviceidbk')">
        <b-form-input :value="newdeviceidbk" :readonly="true"></b-form-input>
        <template v-slot:append>
          <b-button variant="info" @click="selectapp(0)">{{$t('message.asto_btn_selectapp')}}</b-button>
        </template>
      </b-input-group>
    </b-form>
    <b-form class="mt-2 ml-4 mr-4" v-if="cbktype==1">
      <b-input-group :prepend="$t('message.asto_newdeviceidac')">
        <b-form-input :value="newdeviceidac" :readonly="true"></b-form-input>
        <template v-slot:append>
          <b-button variant="info" @click="selectapp(1)">{{$t('message.asto_btn_selectapp')}}</b-button>
        </template>
      </b-input-group>
    </b-form>
    <b-form class="mt-2 ml-4 mr-4" v-if="cbktype==2">
      <b-input-group :prepend="$t('message.asto_newdeviceiddc')">
        <b-form-input :value="newdeviceiddc" :readonly="true"></b-form-input>
        <template v-slot:append>
          <b-button variant="info" @click="selectapp(2)">{{$t('message.asto_btn_selectapp')}}</b-button>
        </template>
      </b-input-group>
    </b-form>
    <b-modal v-model="modalshow" no-close-on-backdrop no-close-on-esc hide-header ok-only :ok-title="$t('message.btn_ok')">{{modalmsg}}</b-modal>
    <b-modal v-model="debugshow" no-close-on-backdrop size="xl" no-close-on-esc hide-header ok-only :ok-title="$t('message.btn_ok')"><span v-html="debugmsg"></span></b-modal>
    <b-modal v-model="appseshow" scrollable size="xl" hide-header hide-footer>
        <b-row class="p-4" cols="1">
          <div class="mb-3 pr-3" v-for="dat in data2" :key="dat.id">
            <b-button block :variant="target==dat.id?'info':'outline-info'" @click="selectme(dat.id)">{{dat.label}}</b-button>
          </div>
        </b-row>
    </b-modal>
  </b-container>
</template>

<style>
  .tooltip-inner{text-align:left;}
</style>
<script>
  import { QRSITE } from '@/config'
  export default {
    name: 'admsto',
    mounted() {
      this.cbktype = parseInt(localStorage.getItem('admscbk')) || 0;
      this.fetchData();
    },
    data() {
      return {
        workingid:-1,
        items: [],
        target: -1,
        appseshow: false,
        modalshow: false,
        debugshow: false,
        maskenabled: false,
        bigheadimgurl: '',
        modalmsg: '',
        debugmsg: '',
        cbktype: 0,
        sort: 0,
        cidstart: '',
        cidend: '',
        newdevidtype: 0,
        newdeviceidbk: '',
        newdeviceidac: '',
        newdeviceiddc: '',
        DEVDATA: false,
        data2: [],
        resetflags:[this.$t('message.ref0'),this.$t('message.ref1'),this.$t('message.ref2'),this.$t('message.ref3'),this.$t('message.ref4'),this.$t('message.ref5'),this.$t('message.ref6'),this.$t('message.ref7')],
        cbktypes: [{text: this.$t('message.cbk0'),value: 0}, {text: this.$t('message.cbk1'),value: 1}, {text: this.$t('message.cbk2'),value: 2}],
        pageid:0,
        newpagestart:[]
      };
    },
    methods: {
      cbkchange($event) {
        this.cbktype = $event;
        localStorage.setItem('admscbk',''+$event);
        this.pageid = 0;
        this.newpagestart = [];
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
        this.newpagestart = [];
        this.fetchData();
      },
      setme(index) {
        this.workingid = index;
      },
      docmd(id,itm) {
        let token = localStorage.getItem('token');
        let upmac = itm.mac;
        let theapi = '/docmd?tm='+new Date().getTime()+'&token='+token+'&mac='+itm.mac+'&cmd='+id;
        this.axios.get(theapi).then(axresp => {
          if (axresp.status==200) {
            this.fetchData();
            if (id==3) {
              this.getuprocess(itm);
            } else if (id==9) {
              setTimeout(() => {
                let jsonurl = QRSITE+'/qr/'+upmac+'.json?tm='+new Date().getTime();
                this.axios.get(jsonurl).then(axresp2 => {
                    if (axresp2.status==200) {
                      let debugmsg = '<div class="row">';
                      let debugobj = axresp2.data;
                      for (let key in debugobj) {
                        debugmsg = debugmsg + '<div class="col-4">' + key + ' = ' + debugobj[key] + '</div>';
                      }
                      debugmsg = debugmsg + '</div>';
                      this.debugmsg = debugmsg;
                      this.debugshow = true;
                    }
                });
              }, 10000);
            } else if (id==10) {
              setTimeout(() => {
                let jsonurl = QRSITE+'/qr/'+upmac+'.json?tm='+new Date().getTime();
                this.axios.get(jsonurl).then(axresp3 => {
                    if (axresp3.status==200) {
                      this.debugmsg = axresp3.data;
                      this.debugshow = true;
                    }
                });
              }, 10000);
            }
          }
        });
      },
      getuprocess(itm) {
        let token = localStorage.getItem('token');
        let theapi = '/douprocess?tm='+new Date().getTime()+'&token='+token+'&mac='+itm.mac;
        this.axios.get(theapi).then(axresp => {
          if (axresp.status==200) {
            let axdata = axresp.data;
            this.$set(itm,'upstep',axdata.step.toFixed(1)+'%');
            if (axdata.step<99.5 && this.$route.fullPath.indexOf('admsto')>0) {
              this.getuprocess(itm);
            }
          }
        });
      },
      selectapp(id) {
        this.newdevidtype = id;
        this.appseshow = true;
      },
      selectme(selected) {
        this.appseshow = false;
        this.target = selected;
        let lb = this.data2[selected].label;
        let pos1 = lb.indexOf('(')+1;
        let pos2 = lb.indexOf(')');
        lb = lb.substr(pos1, pos2-pos1);
        let token = localStorage.getItem('token');
        let theapi = '/admstogetappnewid?tm=' + new Date().getTime() + '&token=' + token + '&id=' + lb + '&type=' + this.newdevidtype;
        this.axios.get(theapi).then(axresp => {
          if (axresp.status == 200) {
            let axdata = axresp.data;
            if (this.newdevidtype == 0) {
              this.newdeviceidbk = axdata.newid;
            } else if (this.newdevidtype == 1) {
              this.newdeviceidac = axdata.newid;
            } else {
              this.newdeviceiddc = axdata.newid;
            }
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
      stoclearapp(itm) {
        let token = localStorage.getItem('token');
        let theapi = '/admstoclearapp?tm=' + new Date().getTime() + '&token=' + token + '&mac=' + itm.mac;
        this.axios.get(theapi).then((axresp) => {
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
      storedelete(itm) {
        var msg = '【删除库存】将导致设备数据永久丢失。请确认真的要删除吗？';
        if (confirm(msg)) {
          let token = localStorage.getItem('token');
          let theapi = '/admstodelete?tm=' + new Date().getTime() + '&token=' + token + '&mac=' + itm.mac;
          this.axios.get(theapi).then((axresp) => {
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
        }
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
          let token = localStorage.getItem('token');
          let genqrapi = '/admstoqrcode?tm='+new Date().getTime()+'&token='+token+'&mac='+itm.mac;
          this.axios.get(genqrapi).then((axresp) => {
            if (axresp.data.rc>0) {
              itm.hasqr = 1;
              let cids = ''+itm.chargerid;
              let imgurl = QRSITE + '/qr/' + cids.substr(0,2) + '/' + cids.substr(2,2) + '/' + cids + '.jpeg';
              this.bigheadimgurl = imgurl;
              this.maskenabled = true;
            }
          });
        }
      },
      fetchData() {
        let token = localStorage.getItem('token');
        if (this.data2.length==0) {
          let namesapi = '/admappnames?tm='+new Date().getTime()+'&token='+token;
          this.axios.get(namesapi).then(axresp => {
            let axdata = axresp.data;
            this.data2 = axdata.apps;
            this.newdeviceidbk = axdata.newdeviceidbk;
            this.newdeviceidac = axdata.newdeviceidac;
            this.newdeviceiddc = axdata.newdeviceiddc;
          });
        }
        let theapi = '/admstos?tm='+new Date().getTime()+'&token='+token+'&cbk='+this.cbktype+'&pagesize='+this.$pagesize+'&sort='+this.sort+'&cidst='+this.cidstart+'&ciden='+this.cidend;
        if (this.pageid>0 && this.newpagestart[this.pageid-1]) {
          theapi = theapi + '&last='+encodeURIComponent(JSON.stringify(this.newpagestart[this.pageid-1]));
        }
        this.axios.get(theapi).then(axresp => {
          if (axresp.status == 200) {
            let axdata = axresp.data;
            if (axdata.Items) this.items = axdata.Items;
            if (axdata.LastEvaluatedKey) {
              if (this.newpagestart.length<=this.pageid) {
                this.newpagestart.push(axdata.LastEvaluatedKey);
              } else {
                this.newpagestart[this.pageid] = axdata.LastEvaluatedKey;
              }
            }
            for (let i=0;i<this.items.length;i++) {
              if (this.items[i].isuping) this.getuprocess(this.items[i]);
            }
          } else {
            this.items = [];
          }
        });
      },
      closemask() {
        this.maskenabled = false;
      },
      resetchargerid(itm) {
        this.workingid = -1;
        let mac = itm.mac;
        let cid = itm.chargerid;
        let token = localStorage.getItem('token');
        let theapi = '/admresetcid?tm='+new Date().getTime()+'&token='+token+'&mac='+mac+'&cid='+cid;
        this.axios.get(theapi).then(axresp => {
          if (axresp.status==200) {
            this.fetchData();
          }
        });
      },
      gotodevice(itm) {
        let appid = itm.appid;
        let cidstart = itm.chargerid-1;
        let cidend = itm.chargerid+1;
        let token = localStorage.getItem('token');
        let theapi = '/admappdft?tm='+new Date().getTime()+'&token='+token+'&id='+appid;
        this.axios.get(theapi).then((axresp) => {
          localStorage.setItem('dftapp',appid);
          let user = JSON.parse(localStorage.getItem('user'));
          user.appname = axresp.data.appname;
          localStorage.setItem('user',JSON.stringify(user));
          if (itm.siteid==0) {
            window.location.href = '/#/device' + this.cbktype+'?siteid=0&cidstart='+cidstart+'&cidend='+cidend;
          } else {
            window.location.href = '/#/device' + this.cbktype+'?cidstart='+cidstart+'&cidend='+cidend;
          }
        });
      },
    }
  }
</script>
