<template>
  <b-container fluid="xl">
    <b-card header-tag="header" class="mb-4">
      <template v-slot:header>
        <h6 class="mb-0">{{$t('message.prz_t00')}}</h6>
      </template>
          <b-row cols="1" cols-sm="1" cols-md="2" cols-lg="3">
            <b-input-group size="lg" :prepend="$t('message.prz_tt0')" :append="$t('message.prz_pkwh')" class="mb-4 pr-4 pl-4">
              <b-form-input :class="workingdataid==0?'border-success':''" v-model="evpofees[0]" v-b-tooltip.hover :title="$t('message.prz_t12')" @click="beforev(0)" @blur="afterv(0)"></b-form-input>
            </b-input-group>
            <b-input-group size="lg" :prepend="$t('message.prz_tt1')" :append="$t('message.prz_pkwh')" class="mb-4 pr-4 pl-4">
              <b-form-input :class="workingdataid==1?'border-dark':''" v-model="evpofees[1]" v-b-tooltip.hover :title="$t('message.prz_t13')" @click="beforev(1)" @blur="afterv(1)"></b-form-input>
            </b-input-group>
            <b-input-group size="lg" :prepend="$t('message.prz_tt2')" :append="$t('message.prz_pkwh')" class="mb-4 pr-4 pl-4">
              <b-form-input :class="workingdataid==2?'border-danger':''" v-model="evpofees[2]" v-b-tooltip.hover :title="$t('message.prz_t14')" @click="beforev(2)" @blur="afterv(2)"></b-form-input>
            </b-input-group>
            <b-input-group size="lg" :prepend="$t('message.prz_tt3')" :append="$t('message.prz_pkwh')" class="mb-4 pr-4 pl-4">
              <b-form-input v-model="evsvcfee" v-b-tooltip.hover :title="$t('message.prz_t15')"></b-form-input>
            </b-input-group>
            <b-input-group size="lg" :prepend="$t('message.prz_tt4')" :append="$t('message.prz_pmin')" class="mb-4 pr-4 pl-4">
              <b-form-input v-model="tmoutfee" v-b-tooltip.hover :title="$t('message.prz_t16')"></b-form-input>
            </b-input-group>
            <b-input-group size="lg" :prepend="$t('message.prz_tt5')" class="mb-4 pr-4 pl-4">
              <b-form-input v-model="sitename" v-b-tooltip.hover :title="$t('message.prz_t17')"></b-form-input>
            </b-input-group>
            <b-input-group size="lg" :prepend="$t('message.prz_tt6')" :append="$t('message.prz_phor')" class="mb-4 pr-4 pl-4">
              <b-form-input v-model="bkprize[0]" v-b-tooltip.hover :title="$t('message.prz_t18')"></b-form-input>
            </b-input-group>
            <b-input-group size="lg" :prepend="$t('message.prz_tt7')" :append="$t('message.prz_phor')" class="mb-4 pr-4 pl-4">
              <b-form-input v-model="bkprize[1]" v-b-tooltip.hover :title="$t('message.prz_t19')"></b-form-input>
            </b-input-group>
            <b-input-group size="lg" :prepend="$t('message.prz_tt8')" :append="$t('message.prz_phor')" class="mb-4 pr-4 pl-4">
              <b-form-input v-model="bkprize[2]" v-b-tooltip.hover :title="$t('message.prz_t20')"></b-form-input>
            </b-input-group>
            <b-input-group size="lg" :prepend="$t('message.prz_tt9')" :append="$t('message.prz_phor')" class="mb-4 pr-4 pl-4">
              <b-form-input v-model="bkprize[3]" v-b-tooltip.hover :title="$t('message.prz_t21')"></b-form-input>
            </b-input-group>
            <b-input-group size="lg" :prepend="$t('message.prz_t10')" :append="$t('message.prz_phor')" class="mb-4 pr-4 pl-4">
              <b-form-input v-model="bkprize[4]" v-b-tooltip.hover :title="$t('message.prz_t22')"></b-form-input>
            </b-input-group>
            <b-input-group size="lg" :prepend="$t('message.prz_t11')" :append="$t('message.prz_phor')" class="mb-4 pr-4 pl-4">
              <b-form-input v-model="bkprize[5]" v-b-tooltip.hover :title="$t('message.prz_t23')"></b-form-input>
            </b-input-group>
          </b-row>
    </b-card>
    <b-card header-tag="header" class="mb-4">
      <template v-slot:header>
        <h6 class="mb-0">汽车充电谷平峰时段设置</h6>
      </template>
    <b-row cols="1" cols-sm="1" cols-md="1" cols-lg="2" class="m-auto pr-2 pl-2">
      <div style="max-width:320px;" class="pr-5">
        <canvas id="myChart2" height="320px"></canvas>
      </div>
      <div class="mt-3">
        <div>谷平峰时间定义(按顺序不可重复)：</div>
        <div><b-link href @click="addnode">插入新的时间点</b-link></div>
        <div class="mb-2">
          <span v-for="(evp,edx) in evpoints" :key="edx">{{evp|tmFix}}<span v-show="edx<evpoints.length-1" :class="edx==workingdataid?'bg-danger text-white':'text-warning'"> ～ </span></span>
        </div>
        <div v-show="workingdataid==-1">
          <div>请先选择左边的时间段！</div>
          <div>最少设置四个时间点，三个时间段</div>
          <div>第一个时间段一定是谷期</div>
          <div>第二个时间段一定是平期</div>
          <div>第三个时间段一定是峰期</div>
          <div>可以系统设置中进行全局设置，新建电站时会用到全局定义</div>
          <div v-show="admnodft">
            <b-form inline class="mt-5 ml-1 mr-1"><b-alert show>没有选择默认应用，本页数据为示范</b-alert></b-form>
          </div>
        </div>
        <div v-show="workingdataid>-1">
          <div class="mb-2 h5">开始时间<span class="text-success ml-3">{{evpoints[workingdataid]|tmFix}}</span>
          </div>
          <div class="mb-2">
            <b-input-group prepend="结束时间">
              <template v-slot:append>
                <b-button variant="outline-success" @click="noderemove" :disabled="workingdataid==0||workingdataid>evpofees.length-2||evpofees.length<4">移除</b-button>
              </template>
              <b-form-timepicker :hour12="false" :hide-header="true" :no-close-button="true" @input="tmendchange"
                v-model="newendtm"></b-form-timepicker>
            </b-input-group>
          </div>
          <div class="mb-3">
            <b-input-group prepend="电价标准">
              <template v-slot:append>
                  <b-radio-group buttons class="mr-4" v-model="workingprizeid" @change="uchange" button-variant="outline-primary">
                    <b-form-radio value="0">谷期<span class="d-none d-sm-inline-block">电价</span>{{evpofees[0]}}</b-form-radio>
                    <b-form-radio value="1">平期<span class="d-none d-sm-inline-block">电价</span>{{evpofees[1]}}</b-form-radio>
                    <b-form-radio value="2">峰期<span class="d-none d-sm-inline-block">电价</span>{{evpofees[2]}}</b-form-radio>
                  </b-radio-group>
              </template>
            </b-input-group>
          </div>
          <b-form-group class="mb-3 mt-4">
            <b-button block pill variant="success" @click="saveprize">保存设置</b-button>
          </b-form-group>
        </div>
      </div>
    </b-row>
    </b-card>
    <b-card header-tag="header" class="mb-4">
      <template v-slot:header>
        <h6 class="mb-0">定价及时段设置说明</h6>
      </template>
      <b-card-text>
        <ul>
          <li>单车充电可按功率设置6个档位</li>
          <li>汽车充电可以根据不同时间段设置电价</li>
          <li>汽车充电必需保证最少四个时间点，三个时段</li>
          <li>汽车充电前三个时段必需是谷/平/峰</li>
          <li>汽车充电起始时间必需是0:00,结束时间必需是24:00</li>
          <li>汽车充电时段定义每个充电站可以不同</li>
          <li>汽车充电时段定义可以有初始值，在参数设置中定义</li>
        </ul>
      </b-card-text>
    </b-card>
    <b-modal v-model="modalshow" no-close-on-backdrop no-close-on-esc hide-header ok-only :ok-title="$t('message.btn_ok')">{{modalmsg}}</b-modal>
  </b-container>
</template>

<script>
  let oldvalue = '';
  const bgcolor0 = 'rgba(51,201,51,0.5)';
  const bgcolor1 = 'rgba(102,102,102,0.5)';
  const bgcolor2 = 'rgba(201,51,51,0.5)';
  let chart, chartopt;
  const tm = function(tm0) {
    if (tm0==1440) {
      return '00:00';
    } else {
      let hr = parseInt(tm0 / 60);
      let mi = parseInt(tm0 % 60);
      if (hr < 10) hr = '0' + hr;
      if (mi < 10) mi = '0' + mi;
      return hr + ':' + mi;
    }
  };
  const tim = function(tm0, tm1) {
    let mins = tm1 - tm0;
    let hr = parseInt(tm0 / 60);
    let mi = parseInt(tm0 % 60);
    let ret = '';
    if (hr < 10) hr = '0' + hr;
    if (mi < 10) mi = '0' + mi;
    ret = hr + ':' + mi + '～';
    hr = parseInt(tm1 / 60);
    mi = parseInt(tm1 % 60);
    if (hr < 10) hr = '0' + hr;
    if (mi < 10) mi = '0' + mi;
    ret = ret + hr + ':' + mi + '【时长';
    hr = parseInt(mins / 60);
    mi = parseInt(mins % 60);
    if (mi > 0) {
      ret = ret + hr + '时';
      ret = ret + mi + '分】';
    } else {
      ret = ret + hr + '小时】';
    }
    return ret;
  };
  import {
    Chart
  } from 'chart.js'
  export default {
    components: {},
    name: 'prize',
    mounted() {
      this.fetchData();
      this.fillData()
    },
    data() {
      return {
        modalshow:false,
        admnodft:false,
        modalmsg: '',
        newendtm: '',
        newpofee: '',
        regtime: '',
        bkprize: ['0.30','0.40','0.55','0.80','1.10','1.50'],
        evsvcfee: '0.70',
        tmoutfee: '0.00',
        sitename: '测试电站',
        evpoints: [0, 420, 540, 690, 840, 990, 1140, 1260, 1380, 1440],
        evpofees: ['0.50', '0.80', '1.10', '0.80', '1.10', '0.80', '1.10', '0.80', '0.50'],
        workingprizeid: -1,
        workingdataid: -1
      };
    },
    methods: {
      uchange($event) {
        if (this.workingdataid>2) {
          this.evpofees[this.workingdataid] = this.evpofees[$event];
        } else {
          this.modalmsg = '前三个时段，直接修改上面的价格即可';
          this.modalshow = true;
        }
        this.reloadopt();
        chart.update();
      },
      beforev(id) {
        if (oldvalue=='') {
          oldvalue = this.evpofees[id];
        }
      },
      afterv(id) {
        this.evpofees[id] = (Number(this.evpofees[id])).toFixed(2);
        if (oldvalue!=this.evpofees[id]) {
          for (let i=3;i<this.evpofees.length;i++) {
            if (this.evpofees[i]==oldvalue) {
              this.evpofees[i] = this.evpofees[id];
            }
          }
          this.reloadopt();
          chart.update();
        }
        oldvalue = '';
      },
      tmendchange() {
        let prevnode = this.evpoints[this.workingdataid];
        let nextnode = this.evpoints[this.workingdataid+2];
        let newendarr = this.newendtm.split(':');
        let newendint = parseInt(newendarr[0])*60+parseInt(newendarr[1]);
        if (newendint>=nextnode) {
          this.modalmsg = '结束时间设置错误，不能超过下一时间点。';
          this.modalshow = true;
        } else if (newendint<=prevnode) {
          this.modalmsg = '结束时间设置错误，不能早于上一时间点。';
          this.modalshow = true;
        } else {
          this.evpoints[this.workingdataid+1] = newendint;
          this.reloadopt();
          chart.update();
        }
      },
      noderemove() {
        if (this.workingdataid==0) {
          this.modalmsg = '第一个节点不能删除';
          this.modalshow = true;
        } else if (this.workingdataid==this.evpofees.length-1) {
          this.modalmsg = '最后一个节点不能删除';
          this.modalshow = true;
        } else {
          this.evpoints.splice(this.workingdataid+1, 1);
          this.evpofees.splice(this.workingdataid, 1);
          this.reloadopt();
          chart.update();
        }
      },
      addnode() {
        let tmhalf = parseInt(chartopt.data.datasets[0].data[this.workingdataid]/2);
        tmhalf = this.evpoints[this.workingdataid] + tmhalf;
        this.evpofees.splice(this.workingdataid+1, 0, this.evpofees[0]);
        this.evpoints.splice(this.workingdataid+1, 0, tmhalf);
        this.reloadopt();
        chart.update();
      },
      reloadopt() {
        let mins = 0;
        chartopt.data.labels.length = this.evpofees.length;
        chartopt.data.datasets[0].backgroundColor.length = this.evpofees.length;
        chartopt.data.datasets[0].data.length = this.evpofees.length;
        for (var i = 1; i < this.evpoints.length; i++) {
          mins = this.evpoints[i] - this.evpoints[i - 1];
          chartopt.data.datasets[0].data[i - 1] = mins;
          chartopt.data.labels[i - 1] = tim(this.evpoints[i - 1], this.evpoints[i]);
          if (i == 1 || this.evpofees[i - 1] == this.evpofees[0]) {
            chartopt.data.datasets[0].backgroundColor[i-1] = bgcolor0;
          } else if (i == 2 || this.evpofees[i - 1] == this.evpofees[1]) {
            if (this.evpofees[1]==this.evpofees[0]) {
              chartopt.data.datasets[0].backgroundColor[i-1] = bgcolor0;
            }else {
              chartopt.data.datasets[0].backgroundColor[i-1] = bgcolor1;
            }
          } else {
            if (this.evpofees[2]==this.evpofees[0]) {
              chartopt.data.datasets[0].backgroundColor[i-1] = bgcolor0;
            } else if (this.evpofees[2]==this.evpofees[1]) {
              chartopt.data.datasets[0].backgroundColor[i-1] = bgcolor1;
            } else {
              chartopt.data.datasets[0].backgroundColor[i-1] = bgcolor2;
            }
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
        let theapi = '/sitprize?tm=' + new Date().getTime() + '&token=' + token + '&sit=' + this.$route.query.site;
        this.axios.get(theapi).then(axresp => {
          if (axresp.status == 200) {
            let axdata = axresp.data;
            this.bkprize = axdata.bkprize;
            this.evpofees = axdata.evpofees;
            this.evpoints = axdata.evpoints;
            this.evsvcfee = axdata.evsvcfee;
            this.tmoutfee = axdata.tmoutfee;
            this.sitename = axdata.sitename;
            this.regtime = axdata.regtime;
            this.reloadopt();
            chart.update();
          }
        });
      },
      fillData() {
        let ctx2 = document.getElementById("myChart2");
        chartopt = {
          type: "doughnut",
          data: {
            labels: [],
            datasets: [{
              backgroundColor: [],
              borderColor: 'rgba(255,255,0, 0.3)',
              borderWidth: 3,
              hoverBorderWidth: 6,
              hoverBorderColor: "#fff",
              data: []
            }]
          },
          options: {
            legend: false,
            tooltip: false,
            responsive: true,
            onClick: (evt, itms) => {
              if (itms && itms[0]) {
                this.workingdataid = itms[0]._index;
                if (this.evpofees[itms[0]._index]==this.evpofees[0]) {
                  this.workingprizeid = 0;
                } else if (this.evpofees[itms[0]._index]==this.evpofees[1]) {
                  this.workingprizeid = 1;
                } else {
                  this.workingprizeid = 2;
                }
                this.newendtm = tm(this.evpoints[this.workingdataid + 1]);
                chart.update();
              }
            }
          }
        };
        this.reloadopt();
        chart = new Chart(ctx2, chartopt);
      },
      saveprize() {
        let token = localStorage.getItem('token');
        let theapi = '/sitsavprize?tm=' + new Date().getTime() + '&token=' + token + '&sit=' + this.$route.query.site;
        theapi = theapi + '&bkprize=' + this.bkprize.join(',');
        theapi = theapi + '&evpofees=' + this.evpofees.join(',');
        theapi = theapi + '&evpoints=' + this.evpoints.join(',');
        theapi = theapi + '&evsvcfee=' + this.evsvcfee;
        theapi = theapi + '&tmoutfee=' + this.tmoutfee;
        theapi = theapi + '&sitename=' + this.sitename;
        this.axios.get(theapi).then(axresp => {
          if (axresp.status == 200) {
            this.fetchData();
          }
        });
      },
    }
  }
</script>
<style>
  .small {
    max-width: 300px;
    margin: 0px auto;
  }
</style>
