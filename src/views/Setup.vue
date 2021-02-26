<template>
  <b-container fluid="md">
    <div v-show="admnodft">
      <b-card class="xnshadow mb-5" header-tag="header">
        <template v-slot:header>
          <h5 class="mb-0">
            <b-icon icon="power"></b-icon> 错误提示：
          </h5>
        </template>
        <b-card-text>
          <b-alert variant="danger" show>{{$t('message.cfmdefault')}}</b-alert>
        </b-card-text>
      </b-card>
    </div>
    <div v-show="!admnodft">
      <b-card class="xnshadow mb-5" header-tag="header">
        <template v-slot:header>
          <h5 class="mb-0">
            <b-icon icon="power"></b-icon> 退款总开关
          </h5>
        </template>
        <b-card-text>
          <b-form-checkbox v-model="returnfee" size="lg" switch @change="setsave1">
            是否允许用户自主退款
          </b-form-checkbox>
        </b-card-text>
      </b-card>
      <b-card class="xnshadow mb-5" header-tag="header">
        <template v-slot:header>
          <h5 class="mb-0">
            <b-icon icon="card-list"></b-icon> 退款设置概览
          </h5>
        </template>
        <b-card-text>
          上面的按钮是允许/禁止用户主动退款的总开关。<br />
          开关打开时，微信小程序 - 单车充电（汽车充电）- 账户余额 - 将会显示"退款"按钮。<br />
          开关关闭时，以上位置不显示"退款"按钮。<br />
          <img src="/images/returnfe1.png" alt="退款示意图" />
          <img src="/images/returnfe2.png" alt="退款示意图" />
          <div>允许退款的必要条件：<br />
            <ul>
              <li>1. 只允许针对该用户的最后一笔费用退款。</li>
              <li>2. 最后一笔费用必需要是"微信充值"（也就是说最后一笔费用是"充值赠送"时不允许退款）。</li>
              <li>3. 退款金额不超过最后一笔费用和账户余额的最小值。</li>
              <li>4. 后台总开关关闭时，不显示"退款"按钮。</li>
              <li>5. 上图的案例实际不会显示退款（因为最后一笔是充值赠送）。</li>
            </ul>
          </div>
        </b-card-text>
      </b-card>
      <b-card class="xnshadow mb-5" header-tag="header">
        <template v-slot:header>
          <h5 class="mb-0">
            <b-icon icon="card-list"></b-icon> 退款设置：支付通道
          </h5>
        </template>
        <b-card-text>
          <div>
            在启用用户主动退费之前还有以下工作要做：<br />
            <ul>
              <li>1. 登陆微信支付商家平台（https://pay.weixin.qq.com）。</li>
              <li>2. 点击"产品中心"-"我授权的产品"-"服务商API退款"-"允许授权"(如果已经授权不要解除）。</li>
              <li>3. 保证账户有足够资金（不要全部提现）。</li>
              <li>4. 回到本页面，打开允许退款开关。</li>
            </ul>
          </div>
          <div>
            <img src="/images/returnw1.png" alt="支付通道设置" />
            <img src="/images/returnw2.png" alt="支付通道设置" />
          </div>
        </b-card-text>
      </b-card>
      <b-card class="xnshadow mb-5" header-tag="header">
        <template v-slot:header>
          <h3 class="mb-0">
            <b-icon icon="tools"></b-icon> 一键充值与启动底限
          </h3>
        </template>
        <b-card-text>
          客户扫码后，如果账户余额低于"最低启动金额"，则会出现"一键充值"的按钮，这里可以设置一键充值的金额。<br />
          设置需要客户端重新登陆以后才会生效，过程比较慢，不要着急，也不要频繁修改。<br /><br />
          <b-input-group prepend="电动单车一键充值金额" append="元" class="mb-1">
            <b-form-input v-model="onekeycharg0"></b-form-input>
          </b-input-group>
          <b-input-group prepend="电动单车最低启动金额" append="元" class="mb-3">
            <b-form-input v-model="allowdstart0"></b-form-input>
          </b-input-group>
          <b-input-group prepend="汽车交流一键充值金额" append="元" class="mb-1">
            <b-form-input v-model="onekeycharg1"></b-form-input>
          </b-input-group>
          <b-input-group prepend="汽车交流最低启动金额" append="元" class="mb-3">
            <b-form-input v-model="allowdstart1"></b-form-input>
          </b-input-group>
          <b-input-group prepend="直流快充一键充值金额" append="元" class="mb-1">
            <b-form-input v-model="onekeycharg2"></b-form-input>
          </b-input-group>
          <b-input-group prepend="直流快充最低启动金额" append="元" class="mb-3">
            <b-form-input v-model="allowdstart2"></b-form-input>
          </b-input-group>
          <b-input-group prepend="充值页面最低充值金额" append="元" class="mb-3">
            <b-form-input v-model="chargelimit"></b-form-input>
          </b-input-group>
          <b-input-group prepend="直流快充电损上浮比例" append="%" class="mb-3">
            <b-form-input v-model="powfix" v-b-tooltip.hover title="用户充电结算费用按此系数作为电损增加"></b-form-input>
          </b-input-group>
          <b-input-group prepend="后台管理每页数据大小" append="条" class="mb-3">
            <b-form-input v-model="pagesize"></b-form-input>
          </b-input-group>
          <b-form-group class="mb-3">
            <b-button block size="lg" variant="success" @click="setsave2">立即保存设置</b-button>
          </b-form-group>
        </b-card-text>
      </b-card>
      <b-card class="xnshadow mb-5" header-tag="header">
        <template v-slot:header>
          <h3 class="mb-0">
            <b-icon icon="tools"></b-icon> 新建充电站默认收费标准
          </h3>
        </template>
        <b-card-text>
          <div class="mb-3">创建新的充电站，以下数据将被作为默认值应用到电站属性。你可以在任何时间重新定义每个电站的收费标准。</div>
          <b-row cols="1" cols-sm="1" cols-md="2" cols-lg="3" class="mb-3 pl-3">
            <b-input-group prepend="汽车谷期电价" append="元每度" class="mb-3 pr-3">
              <b-form-input :class="workingdataid==0?'border-success':''" v-model="evpofees[0]"></b-form-input>
            </b-input-group>
            <b-input-group prepend="汽车平期电价" append="元每度" class="mb-3 pr-3">
              <b-form-input :class="workingdataid==1?'border-dark':''" v-model="evpofees[1]"></b-form-input>
            </b-input-group>
            <b-input-group prepend="汽车峰期电价" append="元每度" class="mb-3 pr-3">
              <b-form-input :class="workingdataid==2?'border-danger':''" v-model="evpofees[2]"></b-form-input>
            </b-input-group>
            <b-input-group prepend="汽车服务费率" append="元每度" class="mb-3 pr-3">
              <b-form-input v-model="evpofees[3]"></b-form-input>
            </b-input-group>
            <b-input-group prepend="汽车超时费率" append="每分钟" class="mb-3 pr-3">
              <b-form-input v-model="evpofees[4]"></b-form-input>
            </b-input-group>
            <b-input-group prepend="汽车超时计费" append="分钟数" class="mb-3 pr-3">
              <b-form-input v-model="evpofees[5]"></b-form-input>
            </b-input-group>
          </b-row>
          <b-row cols="1" cols-sm="1" cols-md="2" cols-lg="3" class="pl-3">
            <b-input-group prepend="单车000~150W" append="每小时" class="mb-3 pr-3">
              <b-form-input v-model="bkprize[0]"></b-form-input>
            </b-input-group>
            <b-input-group prepend="单车150~250W" append="每小时" class="mb-3 pr-3">
              <b-form-input v-model="bkprize[1]"></b-form-input>
            </b-input-group>
            <b-input-group prepend="单车250~350W" append="每小时" class="mb-3 pr-3">
              <b-form-input v-model="bkprize[2]"></b-form-input>
            </b-input-group>
            <b-input-group prepend="单车350~500W" append="单位元" class="mb-3 pr-3">
              <b-form-input v-model="bkprize[3]"></b-form-input>
            </b-input-group>
            <b-input-group prepend="单车500~700W" append="小时价" class="mb-3 pr-3">
              <b-form-input v-model="bkprize[4]"></b-form-input>
            </b-input-group>
            <b-input-group prepend="单车700~900W" append="元每时" class="mb-3 pr-3">
              <b-form-input v-model="bkprize[5]"></b-form-input>
            </b-input-group>
          </b-row>
          <div class="mb-3">汽车充电支持分时段电价，不同时段有不同的电价，创建新的充电站时将按这里的设置定义。你可以在任何时间重新定义每个电站的时段设置。</div>
          <b-row cols="1" cols-sm="1" cols-md="1" cols-lg="2" class="m-auto pr-3">
            <div style="max-width:320px;" class="pr-5">
              <canvas id="myChart2" height="320px"></canvas>
            </div>
            <div class="mt-3">
              <div>谷平峰时间定义(按顺序不可重复)：</div>
              <div>
                <b-link href @click="addnode">插入新的时间点</b-link>
              </div>
              <div class="mb-3">
                <span v-for="(evp,edx) in evpoints" :key="edx">{{evp|tmFix}}<span v-show="edx<evpoints.length-1" :class="edx==workingdataid?'bg-danger text-white':'text-warning'">
                    ～ </span></span>
              </div>
              <div v-show="workingdataid==-1">
                <div>请先选择左边的时间段！</div>
                <div>最少设置四个时间点，三个时间段</div>
                <div>第一个时间段一定是谷期</div>
                <div>第二个时间段一定是平期</div>
                <div>第三个时间段一定是峰期</div>
                <div>可以系统设置中进行全局设置，新建电站时会用到全局定义</div>
              </div>
              <div v-show="workingdataid>-1">
                <div class="mb-2 h5">开始时间<span class="text-success ml-3">{{evpoints[workingdataid]|tmFix}}</span>
                </div>
                <div class="mb-2">
                  <b-input-group prepend="结束时间">
                    <template v-slot:append>
                      <b-button variant="outline-success" @click="noderemove" :disabled="workingdataid==0||workingdataid>evpofeeid.length-2||evpofeeid.length<4">移除</b-button>
                    </template>
                    <b-form-timepicker :hour12="false" :hide-header="true" :no-close-button="true" @input="tmendchange"
                      v-model="newendtm"></b-form-timepicker>
                  </b-input-group>
                </div>
                <div class="mb-3">
                  <b-input-group prepend="电价标准">
                    <template v-slot:append>
                      <b-radio-group buttons v-model="evpofeeid[workingdataid]" @change="uchange"
                        button-variant="outline-primary">
                        <b-form-radio value="0">谷期<span class="d-none d-sm-inline-block">电价</span>{{evpofees[0]}}</b-form-radio>
                        <b-form-radio value="1">平期<span class="d-none d-sm-inline-block">电价</span>{{evpofees[1]}}</b-form-radio>
                        <b-form-radio value="2">峰期<span class="d-none d-sm-inline-block">电价</span>{{evpofees[2]}}</b-form-radio>
                      </b-radio-group>
                    </template>
                  </b-input-group>
                </div>
              </div>
            </div>
          </b-row>
          <b-form-group class="mb-3 mt-4">
            <b-button block pill size="lg" variant="success" @click="setsave3">立即保存设置</b-button>
          </b-form-group>
        </b-card-text>
      </b-card>
      <b-card class="xnshadow mb-5" header-tag="header">
        <template v-slot:header>
          <h3 class="mb-0">
            <b-icon icon="tools"></b-icon> 充电运营助手
          </h3>
        </template>
        <b-card-text class="mb-0">
          <p>手机版业务管理工具。用来<span class="text-success">创建充电站</span>，<span class="text-info">添加充电桩</span>，<span class="text-danger">分配电桩到电站</span>，<span
              class="text-warning">查看本人管理的运营数据</span>。</p>
          <ul>
            <li>1. 首次打开运营助手需要登陆</li>
            <li>2. 新用户登陆后填写设置向导</li>
            <li>3. "运营助手"，"我的电站"，"我的电桩"，"查看收入"</li>
            <li>4. "我的电站"->扫码添加新电桩</li>
            <li>5. 请注意研究，学习软件使用方法</li>
          </ul>
        </b-card-text>
      </b-card>
      <b-card class="xnshadow mb-5" header-tag="header">
        <template v-slot:header>
          <h3 class="mb-0">
            <b-icon icon="person-lines-fill"></b-icon> 关于个人运营商
          </h3>
        </template>
        <b-card-text>
          <p>拥有支付通道的合作伙伴将自家品牌充电桩设备卖给个人，个人买到设备安装好，用<span class="text-danger">充电运营助手</span>创建电站，添加电桩，设置价格，产生的充电消费收入可提现。</p>
          <p>买设备的人就是<span class="text-danger">个人运营商</span>。买设备，安装，用助手设置价格，提取收益。</p>
          <p>双方协商销售价格与分成比例。</p>
        </b-card-text>
      </b-card>
    </div>
  </b-container>
</template>

<script>
  const bgcolor0 = 'rgba(51,201,51,0.5)';
  const bgcolor1 = 'rgba(102,102,102,0.5)';
  const bgcolor2 = 'rgba(201,51,51,0.5)';
  let chart, chartopt;
  const tm = function(tm0) {
    if (tm0 == 1440) {
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
    name: 'setup',
    mounted() {
      this.fetchData();
      this.fillData()
    },
    data() {
      return {
        admnodft: false,
        pluginver: '',
        powfix: 0,
        onekeycharg0: 0,
        onekeycharg1: 0,
        onekeycharg2: 0,
        allowdstart0: 0,
        allowdstart1: 0,
        allowdstart2: 0,
        chargelimit: 0,
        regusercnt: 0,
        chgusercnt: 0,
        activeucnt: 0,
        bkminutes: 0,
        powused0: 0,
        powused1: 0,
        powused2: 0,
        deviceols0: 0,
        deviceols1: 0,
        deviceols2: 0,
        devicereg0: 0,
        devicereg1: 0,
        devicereg2: 0,
        fullmoney: 0,
        fullretmn: 0,
        fullgift: 0,
        fullbalance: 0,
        fullfree: 0,
        cretime:0,
        premonthmn:0,
        monthmoney:0,
        todaymoney:0,
        cashgets:0,
        newendtm: '',
        evpofees: ['0.50', '0.70', '1.10', '0.70', '0.00', '30'],
        bkprize: ['0.40', '0.50', '0.60', '0.90', '1.20', '1.60'],
        evpoints: [0, 420, 690, 840, 1080, 1380, 1440],
        evpofeeid: [0, 1, 2, 1, 2, 0],
        workingdataid: -1,
        returnfee: false,
        pagesize: this.$pagesize
      };
    },
    methods: {
      fetchData() {
        let user = JSON.parse(localStorage.getItem('user'));
        let dftapp = localStorage.getItem('dftapp');
        if (user.isadmin && !dftapp) {
          this.admnodft = true;
        } else {
          this.admnodft = false;
        }
        if (!this.admnodft) {
          let token = localStorage.getItem('token');
          let theapi = '/setread?tm=' + new Date().getTime() + '&token=' + token;
          this.axios.get(theapi).then(axresp => {
            if (axresp.status == 200) {
              let item = axresp.data.Item;
              this.returnfee = item.returnfee;
              this.pluginver = item.pluginver;
              this.powfix = item.powfix;
              this.onekeycharg0 = item.onekeycharg0;
              this.onekeycharg1 = item.onekeycharg1;
              this.onekeycharg2 = item.onekeycharg2;
              this.allowdstart0 = item.allowdstart0;
              this.allowdstart1 = item.allowdstart1;
              this.allowdstart2 = item.allowdstart2;
              this.chargelimit = item.chargelimit;
              this.regusercnt = item.regusercnt;
              this.chgusercnt = item.chgusercnt;
              this.activeucnt = item.activeucnt;
              this.bkminutes = item.bkminutes;
              this.powused0 = item.powused0;
              this.powused1 = item.powused1;
              this.powused2 = item.powused2;
              this.deviceols0 = item.deviceols0;
              this.deviceols1 = item.deviceols1;
              this.deviceols2 = item.deviceols2;
              this.devicereg0 = item.devicereg0;
              this.devicereg1 = item.devicereg1;
              this.devicereg2 = item.devicereg2;
              this.fullmoney = item.fullmoney;
              this.fullretmn = item.fullretmn;
              this.fullgift = item.fullgift;
              this.fullbalance = item.fullbalance;
              this.fullfree = item.fullfree;
              this.premonthmn = item.premonthmn;
              this.monthmoney = item.monthmoney;
              this.todaymoney = item.todaymoney;
              this.cashgets = item.cashgets;
              this.cretime = item.cretime;
              this.bkprize = item.defaultsbk;
              this.evpoints = item.defaultpot;
              this.evpofeeid = item.defaultfee;
              this.evpofees = item.defaultsev;
              this.reloadopt();
              chart.update();
            }
          });
        }
      },
      uchange($event) {
        this.evpofeeid[this.workingdataid] = $event;
        this.reloadopt();
        chart.update();
      },
      setsave1($event) {
        let token = localStorage.getItem('token');
        let theapi = '/setsave1?tm=' + new Date().getTime() + '&token=' + token + '&ret=' + $event;
        this.axios.get(theapi).then(axresp => {
          if (axresp.status == 200) {
            this.fetchData();
          }
        });
      },
      setsave2() {
        if (this.powfix>0.2) {
          this.modalmsg = '直流快充电损上浮比例设置过大，不能超过0.2';
          this.modalshow = true;
        } else if (this.pagesize>36) {
          this.modalmsg = '后台管理每页数据大小设置过大，不能超过36';
          this.modalshow = true;
        } else if (this.pagesize<3) {
          this.modalmsg = '后台管理每页数据大小设置过小，不能小于3';
          this.modalshow = true;
        } else {
          let token = localStorage.getItem('token');
          let theapi = '/setsave2?tm=' + new Date().getTime() + '&token=' + token;
          theapi = theapi + '&chargelimit=' + this.chargelimit;
          theapi = theapi + '&allowdstart0=' + this.allowdstart0;
          theapi = theapi + '&allowdstart1=' + this.allowdstart1;
          theapi = theapi + '&allowdstart2=' + this.allowdstart2;
          theapi = theapi + '&onekeycharg0=' + this.onekeycharg0;
          theapi = theapi + '&onekeycharg1=' + this.onekeycharg1;
          theapi = theapi + '&onekeycharg2=' + this.onekeycharg2;
          theapi = theapi + '&powfix=' + this.powfix;
          this.axios.get(theapi).then(axresp => {
            if (axresp.status == 200) {
              localStorage.setItem('_pagesize', this.pagesize);
              this.fetchData();
            }
          });
        }
      },
      setsave3() {
        let token = localStorage.getItem('token');
        let theapi = '/setsave3?tm=' + new Date().getTime() + '&token=' + token;
        theapi = theapi + '&bkprize=' + this.bkprize;
        theapi = theapi + '&evpofees=' + this.evpofees;
        theapi = theapi + '&evpoints=' + this.evpoints;
        theapi = theapi + '&evpofeeid=' + this.evpofeeid;
        this.axios.get(theapi).then(axresp => {
          if (axresp.status == 200) {
            this.fetchData();
          }
        });
      },
      tmendchange() {
        let prevnode = this.evpoints[this.workingdataid];
        let nextnode = this.evpoints[this.workingdataid + 2];
        let newendarr = this.newendtm.split(':');
        let newendint = parseInt(newendarr[0]) * 60 + parseInt(newendarr[1]);
        if (newendint >= nextnode) {
          this.modalmsg = '结束时间设置错误，不能超过下一时间点。';
          this.modalshow = true;
        } else if (newendint <= prevnode) {
          this.modalmsg = '结束时间设置错误，不能早于上一时间点。';
          this.modalshow = true;
        } else {
          this.evpoints[this.workingdataid + 1] = newendint;
          this.reloadopt();
          chart.update();
        }
      },
      noderemove() {
        if (this.workingdataid == 0) {
          this.modalmsg = '第一个节点不能删除';
          this.modalshow = true;
        } else if (this.workingdataid == this.evpofees.length - 1) {
          this.modalmsg = '最后一个节点不能删除';
          this.modalshow = true;
        } else {
          this.evpoints.splice(this.workingdataid + 1, 1);
          this.evpofees.splice(this.workingdataid, 1);
          this.reloadopt();
          chart.update();
        }
      },
      addnode() {
        let tmhalf = parseInt(chartopt.data.datasets[0].data[this.workingdataid] / 2);
        tmhalf = this.evpoints[this.workingdataid] + tmhalf;
        this.evpofees.splice(this.workingdataid + 1, 0, this.evpofees[0]);
        this.evpoints.splice(this.workingdataid + 1, 0, tmhalf);
        this.reloadopt();
        chart.update();
      },
      reloadopt() {
        let mins = 0;
        chartopt.data.labels.length = this.evpofeeid.length;
        chartopt.data.datasets[0].backgroundColor.length = this.evpofeeid.length;
        chartopt.data.datasets[0].data.length = this.evpofeeid.length;
        for (var i = 1; i < this.evpoints.length; i++) {
          mins = this.evpoints[i] - this.evpoints[i - 1];
          chartopt.data.datasets[0].data[i - 1] = mins;
          chartopt.data.labels[i - 1] = tim(this.evpoints[i - 1], this.evpoints[i]);
          if (this.evpofeeid[i - 1] == 0) {
            chartopt.data.datasets[0].backgroundColor[i - 1] = bgcolor0;
          } else if (this.evpofeeid[i - 1] == 1) {
            chartopt.data.datasets[0].backgroundColor[i - 1] = bgcolor1;
          } else {
            chartopt.data.datasets[0].backgroundColor[i - 1] = bgcolor2;
          }
        }
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
                this.newendtm = tm(this.evpoints[this.workingdataid + 1]);
                chart.update();
              }
            }
          }
        };
        this.reloadopt();
        chart = new Chart(ctx2, chartopt);
      }
    }
  }
</script>
