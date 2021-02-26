<template>
  <b-container fluid="xs">
    <div v-show="items.length">
    <b-table-simple hover small caption-top responsive="xs">
      <b-thead head-variant="light">
        <b-tr>
          <b-th>客户手机号</b-th>
          <b-th class="d-none d-md-table-cell">客户头像昵称</b-th>
          <b-th class="d-none d-md-table-cell">注册日期</b-th>
          <b-th>在哪个充电站</b-th>
          <b-th>类型</b-th>
          <b-th>已免</b-th>
          <b-th class="d-none d-sm-table-cell">添加日期</b-th>
          <b-th class="d-none d-md-table-cell">添加人</b-th>
        </b-tr>        
      </b-thead>
      <b-tbody v-for="(item, index) in items" :key="index">
        <b-tr>
          <b-td>{{item.mobile}}</b-td>
          <b-td class="d-none d-md-table-cell"><img :src="item.headimgurl" class="wxhead" @click="showbig(item.headimgurl)"/> {{item.nickname}}</b-td>
          <b-td class="d-none d-md-table-cell">{{item.regtime}}</b-td>
          <b-td>{{item.sitename}}</b-td>
          <b-td>{{freetypes[item.freetype]}}</b-td>
          <b-td>{{item.totalfee}}</b-td>
          <b-td class="d-none d-sm-table-cell">{{item.cretime}}</b-td>
          <b-td class="d-none d-md-table-cell">{{item.creatrealname}}</b-td>
        </b-tr>
        <b-tr>
          <b-td colspan="5" class="greyco d-table-cell d-md-none">
            <span class="mr-2">{{item.nickname}}
            </span>
            <span class="mr-4">{{item.cretime}}</span>
            {{item.creatrealname}}
          </b-td>
        </b-tr>
      </b-tbody>
    </b-table-simple>
    </div>
    <div v-show="items.length==0" class="pl-5 pr-5">
      <b-card class="xnshadow" header-tag="header" footer-tag="footer">
        <template v-slot:header>
          <h4 class="mb-0"><b-icon icon="gem"></b-icon> 免费充电客户</h4>
        </template>
        <b-card-text>
          <p>
            没有免费充电客户<br/><br/>
            请添加免费充电客户<br/>
            汽车充电可设置免费类型，单车全免<br/>
            <b-form inline class="mt-4"><b-alert :show="admnodft">{{$t('message.cfmdefault')}}</b-alert></b-form>
           </p>
        </b-card-text>
      </b-card>
    </div>
    <b-form inline class="mt-4 ml-4">
      <b-button-group class="mr-4 mb-4">
        <b-button variant="success" @click="fetchprev" :disabled="pageid==0">{{$t('message.btn_prevpage')}}</b-button>
        <b-button v-if="pageid>0" variant="outline-success" :disabled="true" >{{pageid+1}}</b-button>
        <b-button variant="success" @click="fetchNext" :disabled="pageid==newpagestart.length">{{$t('message.btn_nextpage')}}</b-button>
      </b-button-group>
    <b-input-group class="col-xs-10 col-sm-8 col-md-6 col-lg-5 col-xl-4 mb-4">
        <b-form-input placeholder="用户手机号" v-model="setmobile"></b-form-input>
        <template v-slot:append>
          <b-button variant="outline-success" @click="openmodalx(1)">充电站{{selectedsiteid}}</b-button>
          <b-button variant="outline-primary" @click="openmodalx(0)">{{freetypes[selectedfreetype]}}</b-button>
          <b-button variant="info" @click="generate">添加免费用户</b-button>
        </template>
    </b-input-group>
    </b-form>
    <b-modal v-model="modalshow" no-close-on-backdrop no-close-on-esc hide-header ok-only :ok-title="$t('message.btn_ok')">{{modalmsg}}</b-modal>
    <Selector v-bind="caller" @callback="callback" />
  </b-container>
</template>

<script>
  import Selector from '@/components/Selector.vue'
  export default {
    name: 'freeuser',
    components: {
      Selector
    },
    mounted() {
      this.fetchData();
    },
    data() {
      return {
        caller:{id:0,target:0},
        modalshow:false,
        modalmsg: '',
        admnodft:false,
        setmobile:'',
        freetypes:['不免','半免','全免','免费类型'],
        selectedfreetype:3,
        selectedsiteid:0,
        items: [],
        pageid:0,
        newpagestart:[]
      };
    },
    methods: {
      generate() {
        let lsetmobile = parseInt(this.setmobile);
        if (this.setmobile.length!=11 || isNaN(lsetmobile)) {
          this.modalmsg = '无效的手机号码，请填写手机号码！';
          this.modalshow = true;
        } else if (isNaN(this.selectedsiteid) || this.selectedsiteid<10000 || this.selectedsiteid>99999) {
          this.modalmsg = '无效的数字，请选择充电站！';
          this.modalshow = true;
        } else if (isNaN(this.selectedfreetype)) {
          this.modalmsg = '无效的数字，请选择免费类型！';
          this.modalshow = true;
        } else if (this.admnodft) {
          this.modalmsg = '请先设置默认应用。';
          this.modalshow = true;
        }else{
          let token = localStorage.getItem('token');
          let theapi = '/freeusave?tm='+new Date().getTime()+'&token='+token+'&mobile='+this.setmobile+'&siteid='+this.selectedsiteid+'&freetype='+this.selectedfreetype;
          this.axios.get(theapi).then(axresp => {
            if (axresp.status==200) {
              this.fetchData();
            } else {
              this.modalmsg = axresp.data;
              this.modalshow = true;
            }
          });
        }
      },
      openmodalx(theid) {
        this.caller.id = theid;
        if (theid==0) {
          this.caller.target = this.selectedfreetype;
        } else {
          this.caller.target = this.selectedsiteid;
        }
        this.$bvModal.show('mdSelector0');
      },
      callback(obj) {
        if (obj.typeid==0){
          this.selectedfreetype = obj.selected;
        } else {
          this.selectedsiteid = obj.selected;
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
        let theapi = '/freeusers?tm='+new Date().getTime()+'&token='+token+'&pagesize='+this.$pagesize;
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
    }
  }
</script>
