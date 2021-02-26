<template>
  <b-container fluid="xs">
    <div v-show="items.length">
    <b-table-simple hover small caption-top responsive="xs">
      <b-thead head-variant="light">
        <b-tr>
          <b-th class="d-none d-md-table-cell">{{$t('message.uop_th0')}}</b-th>
          <b-th>{{$t('message.uop_th1')}}</b-th>
          <b-th class="d-none d-md-table-cell">{{$t('message.uop_th2')}}</b-th>
          <b-th>{{$t('message.uop_th3')}}</b-th>
          <b-th class="d-none d-md-table-cell">{{$t('message.uop_th4')}}</b-th>
          <b-th>{{$t('message.uop_th5')}}</b-th>
          <b-th class="d-none d-lg-table-cell">{{$t('message.uop_th6')}}</b-th>
        </b-tr>
      </b-thead>
      <b-tbody v-for="(item, index) in items" :key="index">
        <b-tr>
          <b-td class="d-none d-md-table-cell">{{item.model}}/{{item.platform}}</b-td>
          <b-td v-b-tooltip.hover :title="item.happenfull">{{item.happenstr}}</b-td>
          <b-td class="d-none d-md-table-cell">{{item.networktype}}</b-td>
          <b-td>{{item.pageid | idFix}}</b-td>
          <b-td class="d-none d-md-table-cell" @click="getipcity(item)">{{item.remoteip}}</b-td>
          <b-td v-b-tooltip.hover :title="item.operfull">{{item.operid}}</b-td>
          <b-td class="d-none d-lg-table-cell"><img :src="item.headimgurl" class="wxhead" @click="showbig(item.headimgurl)"/> {{item.nickname}} {{item.mobile}}</b-td>
        </b-tr>
        <b-tr>
            <b-td colspan="5" class="greyco d-table-cell d-md-none">
              <span class="mr-2">{{item.mobile}}</span><span class="mr-2">{{item.nickname}}</span><span class="mr-2">{{item.model}}/{{item.platform}}</span>
            </b-td>
        </b-tr>
      </b-tbody>
    </b-table-simple>
    </div>
    <div v-show="items.length==0" class="pl-5 pr-5">
      <b-card class="xnshadow" header-tag="header" footer-tag="footer">
        <template v-slot:header>
          <h4 class="mb-0"><b-icon icon="people"></b-icon> 用户操作日志</h4>
        </template>
        <b-card-text>
          <p>
            没有用户操作记录<br/><br/>
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
      <b-button class="mr-4 mb-4" variant="info" @click="openmodalx">{{selectedlb}}</b-button>
      <b-input-group class="mb-4">
        <b-form-input placeholder="执行操作或来源IP" v-model="searchstr"></b-form-input>
        <b-input-group-append>
          <b-button variant="info" @click="search">{{$t('message.btn_search')}}</b-button>
        </b-input-group-append>
      </b-input-group>
    </b-form>
    <div v-show="maskenabled" class="fullmask" @click="closemask">
      <div class="imgshow xnshadow">
        <img :src="bigheadimgurl" class="w-100"/>
      </div>
    </div>
    <b-modal v-model="modalshow" no-close-on-backdrop no-close-on-esc hide-header ok-only :ok-title="$t('message.btn_ok')">{{modalmsg}}</b-modal>
    <Selector v-bind="caller" @callback="callback" />
  </b-container>
</template>

<script>
  let timer = undefined;
  let reloades = 0;
  import Selector from '@/components/Selector.vue'
  export default {
    name: 'useroper',
    components: {
      Selector
    },
    mounted() {
      this.fetchData();
    },
    data() {
      return {
        caller:{id:2,targot:'all'},
        modalshow:false,
        modalmsg: '',
        admnodft:false,
        maskenabled: false,
        bigheadimgurl:'',
        searchstr: '',
        selectedid:'all',
        selectedlb:'全部页面',
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
        if (timer) {
          clearTimeout(timer);
          timer = undefined;
        }
        this.pageid = this.pageid+1;
        this.fetchData();
      },
      search() {
        if (timer) {
          clearTimeout(timer);
          timer = undefined;
        }
        this.pageid = 0;
        this.newpagestart = [];
        this.fetchData();
      },
      openmodalx() {
        this.caller.id = 2;
        this.caller.targot = this.selectedid;
        this.$bvModal.show('mdSelector2');
      },
      callback(obj) {
        if (timer) {
          clearTimeout(timer);
          timer = undefined;
        }
        this.selectedid = obj.selected;
        this.selectedlb = obj.selectlb;
        this.pageid = 0;
        this.newpagestart = [];
        this.fetchData();
      },
      fetchData() {
        reloades++;
        let token = localStorage.getItem('token');
        let user = JSON.parse(localStorage.getItem('user'));
        let dftapp = localStorage.getItem('dftapp');
        if (user.isadmin && !dftapp) {
          this.admnodft = true;
        } else {
          this.admnodft = false;
        }
        let theapi = '/useroper?tm='+new Date().getTime()+'&token='+token+'&pagesize='+this.$pagesize;
        if (this.$route.query.openid) {
          theapi = theapi + '&openid='+this.$route.query.openid;
        }
        if (this.selectedid!='all') {
          theapi = theapi + '&pageid='+this.selectedid;
        }
        if (this.searchstr) {
          theapi = theapi + '&search='+encodeURIComponent(this.searchstr);
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
          if (this.pageid==0 && this.searchstr=='' && this.selectedid=='all' && this.$route.fullPath.indexOf('useroper')>0 && reloades<10000) {
            timer = setTimeout(this.fetchData, 10000);
          }
        });
      },
      getipcity(itm) {
        let ip = itm.remoteip;
        if ((/\d+\.\d+\.\d+\.\d+/).test(ip)) {
          let theapi = '/ipcity?tm='+new Date().getTime()+'&ip='+ip;
          this.axios.get(theapi).then(axresp => {
            if (axresp.status==200) {
              itm.remoteip = axresp.data;
            }
          });          
        }
      },
      showbig(url) {
        this.bigheadimgurl = url;
        this.maskenabled = true;
      },
      closemask() {
        this.maskenabled = false;
      },
    }
  }
</script>
