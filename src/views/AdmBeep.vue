<template>
  <b-container fluid="xs">
    <b-table-simple hover small caption-top responsive="xs">
      <b-thead head-variant="light">
        <b-tr>
          <b-th style="width:8rem;" v-b-tooltip.hover title="设备更新间隔是5秒,页面自动刷新间隔1秒">{{localtime}}</b-th>
          <b-th v-b-tooltip.hover title="数据为实时,光标闪烁3秒">充电桩#</b-th>
          <b-th v-b-tooltip.hover title="火线对地,零线对地,正常01,急停,开箱,正常00">火 零 急 开</b-th>
          <b-th v-b-tooltip.hover title="多字段闪烁为快速模式,每十分钟一次定时更新">温0 度1 温度 电压</b-th>
<template v-if="cbktype==1">
          <b-th v-b-tooltip.hover title="单位是瓦时">左电表右</b-th>
          <b-th v-b-tooltip.hover title="方波开关充电时开,ST充电状态,2表示已插枪,8表示正在充电">CKST左/右</b-th>
          <b-th v-b-tooltip.hover title="0没有地锁,1未知状态,2立起无车,3中间无车,4中间有车,5倒下无车,6倒下有车">地 锁</b-th>
          <b-th v-b-tooltip.hover title="CP6表示充电中,12表示未插枪,9表示已插枪.CZ表示方波负半周电压,充电时为12">左CPCZ/右CPCZ</b-th>
          <b-th>开 关</b-th>
          <b-th v-b-tooltip.hover title="单位是mA">左电流右</b-th>
</template>
<template v-else>
          <b-th v-b-tooltip.hover title="单位是mA,瓦时">电流 电表</b-th>
          <b-th>开关123</b-th>
          <b-th>开关456</b-th>
          <b-th>开关789</b-th>
          <b-th>开关012</b-th>
          <b-th v-b-tooltip.hover title="单位是mA,端口1,2,3">电流123</b-th>
          <b-th v-b-tooltip.hover title="每组有一个保险管">电流456</b-th>
          <b-th v-b-tooltip.hover title="开关为1,无电流说明保险管坏">电流789</b-th>
          <b-th v-b-tooltip.hover title="端口10,11,12">电流012</b-th>
</template>
        </b-tr>
      </b-thead>
      <b-tbody>
        <b-tr v-for="(item) in items" :key="item.id">
          <b-th style="width:8rem;">{{item.act}}</b-th>
          <b-td v-b-tooltip.hover :title="item.mac">{{item.cid}}</b-td>
          <b-td>
          <span class="mr-1 p-1" :style="'background:rgba('+item.a0.cr+',0,0,'+item.a0.ca+');'">{{item.a0.va}}</span>
          <span class="mr-1 p-1" :style="'background:rgba('+item.a1.cr+',0,0,'+item.a1.ca+');'">{{item.a1.va}}</span>
          <span class="mr-1 p-1" :style="'background:rgba('+item.sp.cr+',0,0,'+item.sp.ca+');'">{{item.sp.va}}</span>
          <span class="p-1" :style="'background:rgba('+item.ta.cr+',0,0,'+item.ta.ca+');'">{{item.ta.va}}</span>
          </b-td>
          <b-td>
          <span class="mr-1 p-1" :style="'background:rgba('+item.t0.cr+',0,0,'+item.t0.ca+');'">{{item.t0.va}}</span>
          <span class="mr-1 p-1" :style="'background:rgba('+item.t1.cr+',0,0,'+item.t1.ca+');'">{{item.t1.va}}</span>
          <span class="mr-1 p-1" :style="'background:rgba('+item.t1.cr+',0,0,'+item.t2.ca+');'">{{item.t2.va}}</span>
          <span class="p-1" :style="'background:rgba('+item.pv.cr+',0,0,'+item.pv.ca+');'">{{item.pv.va}}</span>
          </b-td>
<template v-if="cbktype==1">
          <b-td>
          <span class="mr-1 p-1" :style="'background:rgba('+item.w0.cr+',0,0,'+item.w0.ca+');'">{{item.w0.va}}</span>
          <span class="p-1" :style="'background:rgba('+item.w1.cr+',0,0,'+item.w1.ca+');'">{{item.w1.va}}</span>
          </b-td>
          <b-td>
          <span class="mr-1 p-1" :style="'background:rgba('+item.k0.cr+',0,0,'+item.k0.ca+');'">{{item.k0.va}}</span>
          <span class="mr-1 p-1" :style="'background:rgba('+item.s8.cr+',0,0,'+item.s8.ca+');'">{{item.s8.va}}</span>
          <span class="mr-1 p-1" :style="'background:rgba('+item.k1.cr+',0,0,'+item.k1.ca+');'">{{item.k1.va}}</span>
          <span class="p-1" :style="'background:rgba('+item.s9.cr+',0,0,'+item.s9.ca+');'">{{item.s9.va}}</span>
          </b-td>
          <b-td>
          <span class="mr-1 p-1" :style="'background:rgba('+item.l0.cr+',0,0,'+item.l0.ca+');'">{{item.l0.va}}</span>
          <span class="p-1" :style="'background:rgba('+item.l1.cr+',0,0,'+item.l1.ca+');'">{{item.l1.va}}</span>
          </b-td>
          <b-td>
          <span class="mr-1 p-1" :style="'background:rgba('+item.c0.cr+',0,0,'+item.c0.ca+');'">{{item.c0.va}}</span>
          <span class="mr-1 p-1" :style="'background:rgba('+item.z0.cr+',0,0,'+item.z0.ca+');'">{{item.z0.va}}</span>
          <span class="mr-1 p-1" :style="'background:rgba('+item.c1.cr+',0,0,'+item.c1.ca+');'">{{item.c1.va}}</span>
          <span class="p-1" :style="'background:rgba('+item.z1.cr+',0,0,'+item.z1.ca+');'">{{item.z1.va}}</span>
          </b-td>
          <b-td>
          <span class="mr-1 p-1" :style="'background:rgba('+item.s0.cr+',0,0,'+item.s0.ca+');'">{{item.s0.va}}</span>
          <span class="p-1" :style="'background:rgba('+item.s1.cr+',0,0,'+item.s1.ca+');'">{{item.s1.va}}</span>
          </b-td>
          <b-td>
          <span class="mr-1 p-1" :style="'background:rgba('+item.i0.cr+',0,0,'+item.i0.ca+');'">{{item.i0.va}}</span>
          <span class="p-1" :style="'background:rgba('+item.i1.cr+',0,0,'+item.i1.ca+');'">{{item.i1.va}}</span>
          </b-td>
</template>
<template v-else>
          <b-td>
          <span class="mr-1 p-1" :style="'background:rgba('+item.pi.cr+',0,0,'+item.pi.ca+');'">{{item.pi.va}}</span>
          <span class="p-1" :style="'background:rgba('+item.w1.cr+',0,0,'+item.w1.ca+');'">{{item.w1.va}}</span>
          </b-td>
          <b-td>
          <span class="mr-1 p-1" :style="'background:rgba('+item.s0.cr+',0,0,'+item.s0.ca+');'">{{item.s0.va}}</span>
          <span class="mr-1 p-1" :style="'background:rgba('+item.s1.cr+',0,0,'+item.s1.ca+');'">{{item.s1.va}}</span>
          <span class="p-1" :style="'background:rgba('+item.s2.cr+',0,0,'+item.s2.ca+');'">{{item.s2.va}}</span>
          </b-td>
          <b-td>
          <span class="mr-1 p-1" :style="'background:rgba('+item.s3.cr+',0,0,'+item.s3.ca+');'">{{item.s3.va}}</span>
          <span class="mr-1 p-1" :style="'background:rgba('+item.s4.cr+',0,0,'+item.s4.ca+');'">{{item.s4.va}}</span>
          <span class="p-1" :style="'background:rgba('+item.s5.cr+',0,0,'+item.s5.ca+');'">{{item.s5.va}}</span>
          </b-td>
          <b-td>
          <span class="mr-1 p-1" :style="'background:rgba('+item.s6.cr+',0,0,'+item.s6.ca+');'">{{item.s6.va}}</span>
          <span class="mr-1 p-1" :style="'background:rgba('+item.s7.cr+',0,0,'+item.s7.ca+');'">{{item.s7.va}}</span>
          <span class="p-1" :style="'background:rgba('+item.s8.cr+',0,0,'+item.s8.ca+');'">{{item.s8.va}}</span>
          </b-td>
          <b-td>
          <span class="mr-1 p-1" :style="'background:rgba('+item.s9.cr+',0,0,'+item.s9.ca+');'">{{item.s9.va}}</span>
          <span class="mr-1 p-1" :style="'background:rgba('+item.sa.cr+',0,0,'+item.sa.ca+');'">{{item.sa.va}}</span>
          <span class="p-1" :style="'background:rgba('+item.sb.cr+',0,0,'+item.sb.ca+');'">{{item.sb.va}}</span>
          </b-td>
          <b-td>
          <span class="mr-1 p-1" :style="'background:rgba('+item.i0.cr+',0,0,'+item.i0.ca+');'">{{item.i0.va}}</span>
          <span class="mr-1 p-1" :style="'background:rgba('+item.i1.cr+',0,0,'+item.i1.ca+');'">{{item.i1.va}}</span>
          <span class="p-1" :style="'background:rgba('+item.i2.cr+',0,0,'+item.i2.ca+');'">{{item.i2.va}}</span>
          </b-td>
          <b-td>
          <span class="mr-1 p-1" :style="'background:rgba('+item.i3.cr+',0,0,'+item.i3.ca+');'">{{item.i3.va}}</span>
          <span class="mr-1 p-1" :style="'background:rgba('+item.i4.cr+',0,0,'+item.i4.ca+');'">{{item.i4.va}}</span>
          <span class="p-1" :style="'background:rgba('+item.i5.cr+',0,0,'+item.i5.ca+');'">{{item.i5.va}}</span>
          </b-td>
          <b-td>
          <span class="mr-1 p-1" :style="'background:rgba('+item.i6.cr+',0,0,'+item.i6.ca+');'">{{item.i6.va}}</span>
          <span class="mr-1 p-1" :style="'background:rgba('+item.i7.cr+',0,0,'+item.i7.ca+');'">{{item.i7.va}}</span>
          <span class="p-1" :style="'background:rgba('+item.i8.cr+',0,0,'+item.i8.ca+');'">{{item.i8.va}}</span>
          </b-td>
          <b-td>
          <span class="mr-1 p-1" :style="'background:rgba('+item.i9.cr+',0,0,'+item.i9.ca+');'">{{item.i9.va}}</span>
          <span class="mr-1 p-1" :style="'background:rgba('+item.ia.cr+',0,0,'+item.ia.ca+');'">{{item.ia.va}}</span>
          <span class="p-1" :style="'background:rgba('+item.ib.cr+',0,0,'+item.ib.ca+');'">{{item.ib.va}}</span>
          </b-td>
</template>
        </b-tr>
      </b-tbody>
    </b-table-simple>
    <b-form inline class="mt-4 ml-4">
      <b-radio-group buttons v-model="cbktype" class="mr-4" :options="cbktypes" @change="cbkchange" button-variant="outline-primary" :disabled="clicked"></b-radio-group>
    </b-form>
  </b-container>
</template>

<style>
  span {border-radius:5px;}
</style>
<script>
  export default {
    name: 'admbeep',
    mounted() {
      this.cbktype = parseInt(localStorage.getItem('beepcbk')) || 0;
      this.fetchData();
      this.flash();
    },
    data() {
      return {
        localtime:'00:00:00',
        items: [],
        cbktype: 0,
        shadowcalled: false,
        clicked: false,
        cbktypes: [{
            text: this.$t('message.cbk0'),
            value: 0
          }, {
            text: this.$t('message.cbk1'),
            value: 1
          }, {
            text: this.$t('message.cbk2'),
            value: 2
          }]
      };
    },
    methods: {
      flash(){
        for (let j=0;j<this.items.length;j++) {
          Object.keys(this.items[j]).forEach((key) => {
            if (key!='mac' && key!='act' && key!='cid' && this.items[j] && this.items[j][key] && this.items[j][key].cr) {
              this.items[j][key].cr -= 2;
              this.items[j][key].ca -= 0.01;
            }
          });
        }
        let nowtm = new Date();
        let hour = nowtm.getHours();
        let minu = nowtm.getMinutes();
        let secd = nowtm.getSeconds();
        if (hour<10) hour = '0'+hour;
        if (minu<10) minu = '0'+minu;
        if (secd<10) secd = '0'+secd;
        this.localtime = hour+':'+minu+':'+secd;
        if (this.$route.fullPath.indexOf('admbeep')>0) setTimeout(this.flash, 30);
      },
      cbkchange($event) {
        this.items.length = 0;
        this.shadowcalled = false;
        this.clicked = true;
        this.cbktype = $event;
        localStorage.setItem('beepcbk',''+$event);
        setTimeout(this.fetchData, 5000);
        setTimeout(() => {
          this.clicked = false;
        }, 6000);
      },
      fetchShadow() {
        if (this.items.length>0) {
          let Lst = this.items.length-1;
          this.shadowcalled = true;
          let token = localStorage.getItem('token');
          let theapi = '/admbeep?tm='+new Date().getTime()+'&token='+token+'&cbk='+this.cbktype+'&mac='+this.items[Lst].mac;
          this.axios.get(theapi).then(axresp => {
            if (axresp.status==200) {
              let axdata = axresp.data;
              if (axdata && axdata.length==1) {
                let axitem = axdata[0];
                if (this.items[Lst].act!=axitem.act) {
                  this.items[Lst]['act'] = axitem.act;
                  Object.keys(this.items[Lst]).forEach((key) => {
                    if (key!='mac' && key!='act' && key!='cid' && this.items[Lst][key].ts != axitem[key].ts) {
                      this.items[Lst][key].va = axitem[key].va;
                      this.items[Lst][key].ts = axitem[key].ts;
                      this.items[Lst][key].cr = 200;
                      this.items[Lst][key].ca = 1.0;
                    }
                  });
                  let newarr = new Array();
                  newarr.push(this.items[Lst]);
                  for (let i=0;i<this.items.length-1;i++) {
                    newarr.push(this.items[i]);
                  }
                  this.items = newarr;
                }
              }
              if (this.$route.fullPath.indexOf('admbeep')>0) setTimeout(this.fetchShadow, 400);
            }
          });
        }
      },
      fetchData() {
        let token = localStorage.getItem('token');
        let theapi = '/admbeep?tm='+new Date().getTime()+'&token='+token+'&cbk='+this.cbktype+'&pagesize='+this.$pagesize;
        this.axios.get(theapi).then(axresp => {
          if (axresp.status==200) {
            let axdata = axresp.data;
            this.items = axdata;
            if (!this.shadowcalled) {
              this.fetchShadow();
            }
          } else {
            this.items = [];
          }
        });
      },
    }
  }
</script>
