<template>
  <b-container fluid="xs">
    <div v-show="items.length">
    <b-table-simple hover small caption-top responsive="xs">
      <b-thead head-variant="light">
        <b-tr>
          <b-th v-b-tooltip.hover :title="$t('message.yyma_hover0')" class="d-none d-md-table-cell">{{$t('message.yyma_th0')}}</b-th>
          <b-th v-b-tooltip.hover :title="$t('message.yyma_hover1')" class="d-none d-sm-table-cell">{{$t('message.yyma_th1')}}</b-th>
          <b-th v-b-tooltip.hover :title="$t('message.yyma_hover2')">{{$t('message.yyma_th2')}}</b-th>
          <b-th v-b-tooltip.hover :title="$t('message.yyma_hover3')" class="d-none d-sm-table-cell">{{$t('message.yyma_th3')}}</b-th>
          <b-th v-b-tooltip.hover :title="$t('message.yyma_hover4')" class="d-none d-md-table-cell">{{$t('message.yyma_th4')}}</b-th>
          <b-th v-b-tooltip.hover :title="$t('message.yyma_hover5')">{{$t('message.yyma_th5')}}</b-th>
          <b-th v-b-tooltip.hover :title="$t('message.yyma_hover6')">{{$t('message.yyma_th6')}}</b-th>
          <b-th v-b-tooltip.hover :title="$t('message.yyma_hover7')">{{$t('message.yyma_th7')}}</b-th>
        </b-tr>        
      </b-thead>
      <b-tbody v-for="(item, index) in items" :key="index">
        <b-tr>
          <b-td class="d-none d-md-table-cell">{{item.appname}}</b-td>
          <b-td class="d-none d-sm-table-cell"><img :src="item.headimgurl" class="wxhead" @click="showbig(item.headimgurl)"/> {{item.nickname}}</b-td>
          <b-td>{{item.mobile}} <b-icon :icon="item.yyloginpass?'check2-circle':'x'"></b-icon></b-td>
          <b-td class="d-none d-sm-table-cell">{{item.yyrealname}}</b-td>
          <b-td class="d-none d-md-table-cell">{{item.yyupdtime}}</b-td>
          <b-td v-show="item.yyappname">{{item.yyappname}} <b-icon variant="success" icon="x-circle-fill" @click="mgrdel(item)"></b-icon></b-td>
          <b-td v-show="!item.yyappname"><b-button size="sm" variant="outline-primary" @click="mgrset(item)">同意申请</b-button></b-td>
          <b-td><b-checkbox :key="index" v-model="item.yyaddfree" @change="saveaddfree($event,item)" switch></b-checkbox></b-td>
          <b-td v-show="rateid==index">
            <b-input-group>
              <b-form-input v-model="item.yyrate"></b-form-input>
              <b-input-group-append>
                <b-button variant="info" @click="mgrrate(item)">{{$t('message.btn_save')}}</b-button>
              </b-input-group-append>
            </b-input-group>
          </b-td>
          <b-td v-show="rateid!=index" @click="setme(index)">{{item.yyrate}}</b-td>
        </b-tr>
        <b-tr>
          <b-td colspan="4" class="greyco d-table-cell d-md-none">
            <span class="mr-2">{{item.nickname}}</span> <span class="mr-2">{{item.yyrealname}}</span> <span class="mr-2">{{item.yyupdtime}}</span>
          </b-td>
        </b-tr>
      </b-tbody>
    </b-table-simple>
    </div>
    <div v-show="items.length==0" class="pl-5 pr-5">
      <b-card class="xnshadow" header-tag="header">
        <template v-slot:header>
          <h4 class="mb-0"><b-icon icon="unlock"></b-icon> 授权管理</h4>
        </template>
        <b-card-text>
          <p>
            首先打开微信小程序，登陆小程序，绑定手机号码，成为正式充电客户<br/>
            1)微信小程序-&gt;充值-&gt;充电运营助手-&gt;申请后台账号<br/>
            2)本网页登陆界面-&gt;重置密码-&gt;重置成功<br/>
            以上两种方法申请的账号会出现在这里，超级管理员审核后可登陆。<br/>
            任何个人从子运营商采购充电设备，自行安装运营，随时通过运营助手结算充电收益。子运营商与个人协商分成比例。<br/>
            运营结算按该用户创建的充电站统计<br/>
            未结算收入=每日各站点消费额之和<br/>
            可提现金额=未结算收入*0.994*分成结算率<br/>            
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
    </b-form>
    <b-modal v-model="modalshow" no-close-on-backdrop no-close-on-esc hide-header ok-only :ok-title="$t('message.btn_ok')">{{modalmsg}}</b-modal>
  </b-container>
</template>

<script>
  export default {
    name: 'admmgr',
    mounted() {
      this.fetchData();
    },
    data() {
      return {
        modalshow:false,
        modalmsg: '',
        rateid:-1,
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
        let theapi = '/admmgrs?tm='+new Date().getTime()+'&token='+token+'&pagesize='+this.$pagesize;
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
      mgrset(itm) {
        let token = localStorage.getItem('token');
        let theapi = '/admgset?tm='+new Date().getTime()+'&token='+token+'&appid='+itm.appid+'&id='+itm.id;
        this.axios.get(theapi).then(axresp => {
          if (axresp.status==200) {
            this.fetchData();
          }
        });
      },
      mgrdel(itm) {
        let token = localStorage.getItem('token');
        let theapi = '/admgdel?tm='+new Date().getTime()+'&token='+token+'&appid='+itm.appid+'&id='+itm.id;
        this.axios.get(theapi).then(axresp => {
          if (axresp.status==200) {
            this.fetchData();
          }
        });
      },
      saveaddfree($event, itm) {
        let token = localStorage.getItem('token');
        let theapi = '/mgrfree?tm='+new Date().getTime()+'&token='+token+'&appid='+itm.appid+'&id='+itm.id+'&adf='+$event;
        this.axios.get(theapi).then(axresp => {
          if (axresp.status==200) {
            this.fetchData();
          }
        });
      },
      setme(index) {
        this.rateid = index;
      },
      mgrrate(itm) {
        let rate = itm.yyrate;
        if (rate.indexOf('%')>0){
          rate = rate.substr(0,rate.length-1);
          rate = Number((parseInt(rate)/100).toFixed(2));
        } else {
          rate = Number(rate);
          if (rate>1) {
            rate = Number((rate/100).toFixed(2));
          }
        }
        if (rate<0) {
          this.modalmsg = '结算率请填写80%这样的数字或者小于1的小数。';
          this.modalshow = true;
        } else if (rate>1){
          this.modalmsg = '结算率请填写80%这样的数字或者小于1的小数。';
          this.modalshow = true;
        } else {
          this.rateid = -1;
          let token = localStorage.getItem('token');
          let theapi = '/mgrrate?tm='+new Date().getTime()+'&token='+token+'&appid='+itm.appid+'&id='+itm.id+'&rate='+rate;
          this.axios.get(theapi).then(axresp => {
            if (axresp.status==200) {
              this.fetchData();
            }
          });
        }
      },
    }
  }
</script>
