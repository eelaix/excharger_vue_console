<template>
  <b-container fluid="xs">
    <b-table-simple hover small caption-top responsive="xs">
      <b-thead head-variant="light">
        <b-tr>
          <b-th v-b-tooltip.hover :title="$t('message.app_hover0')">{{$t('message.app_appname')}}</b-th>
          <b-th v-b-tooltip.hover :title="$t('message.app_hover1')" class="d-none d-lg-table-cell">{{$t('message.app_version')}}</b-th>
          <b-th v-b-tooltip.hover :title="$t('message.app_hover2')" class="d-none d-sm-table-cell">{{$t('message.app_charge')}}</b-th>
          <b-th v-b-tooltip.hover :title="$t('message.app_hover3')" class="d-none d-md-table-cell">{{$t('message.app_coopmoney')}}</b-th>
          <b-th v-b-tooltip.hover :title="$t('message.app_refunmsg')">{{$t('message.app_refund')}}</b-th>
          <b-th v-b-tooltip.hover :title="$t('message.app_hover4')" class="d-none d-sm-table-cell">{{$t('message.app_totaluser')}}</b-th>
          <b-th v-b-tooltip.hover :title="$t('message.app_hover5')">{{$t('message.app_chargeuser')}}</b-th>
          <b-th v-b-tooltip.hover :title="$t('message.app_hover6')" @click="dosort(0)">{{$t('message.app_today')}}<b-icon icon="sort-down" :variant="sorts==0?'danger':'primary'"></b-icon></b-th>
          <b-th v-b-tooltip.hover :title="$t('message.app_hover7')">{{$t('message.app_month')}}</b-th>
          <b-th v-b-tooltip.hover :title="$t('message.app_hover8')" class="d-none d-md-table-cell" @click="dosort(1)">{{$t('message.app_premonth')}}<b-icon icon="sort-down" :variant="sorts==1?'danger':'primary'"></b-icon></b-th>
          <b-th v-b-tooltip.hover class="d-none d-lg-table-cell">{{$t('message.app_sumpow')}}</b-th>
          <b-th v-b-tooltip.hover :title="$t('message.app_hover9')" v-show="dftappid"><b-link href="#" @click="cleandft">{{$t('message.app_defapp3')}}<span class="d-none d-sm-inline-block">{{$t('message.app_defapp0')}}</span></b-link></b-th>
          <b-th v-b-tooltip.hover :title="$t('message.app_hovera')" v-show="!dftappid">{{$t('message.app_defapp0')}}<span class="d-none d-sm-inline-block">{{$t('message.app_defapp1')}}</span></b-th>
        </b-tr>
      </b-thead>
      <b-tbody>
        <b-tr v-for="(item, index) in items" :key="item.id">
          <b-td @click="appnameclick(index)">{{item.appname}}</b-td>
            <b-td colspan="10" v-show="modindex==index">
              <b-input-group :prepend="$t('message.app_mod0')" class="mt-3">
                  <b-form-input type="text" :value="item.id" readonly maxlength="12"></b-form-input>
              </b-input-group>
              <b-input-group :prepend="$t('message.app_mod1')" class="mt-3">
                  <b-form-input type="text" :placeholder="$t('message.app_mod4')" v-model="mappsecret" maxlength="64"></b-form-input>
              </b-input-group>
              <b-input-group :prepend="$t('message.app_modg')" class="mt-3">
                  <b-form-input type="text" :placeholder="$t('message.app_mod4')" v-model="mwxapikey" maxlength="64"></b-form-input>
              </b-input-group>
              <b-input-group :prepend="$t('message.app_mod2')" class="mt-3">
                  <b-form-input type="text" :placeholder="$t('message.app_mod5')" v-model="mappname" maxlength="12"></b-form-input>
              </b-input-group>
              <b-input-group :prepend="$t('message.app_mod3')" class="mt-3">
                  <b-form-input type="text" :placeholder="$t('message.app_mod6')" v-model="mch_id" maxlength="10"></b-form-input>
              </b-input-group>
              <b-input-group :prepend="$t('message.app_moda')" class="mt-3">
                  <b-form-input type="text" :placeholder="$t('message.app_modb')" v-model="idstartbk" maxlength="256"></b-form-input>
              </b-input-group>
              <b-input-group :prepend="$t('message.app_modc')" class="mt-3">
                  <b-form-input type="text" :placeholder="$t('message.app_modd')" v-model="idstartac" maxlength="256"></b-form-input>
              </b-input-group>
              <b-input-group :prepend="$t('message.app_mode')" class="mt-3">
                  <b-form-input type="text" :placeholder="$t('message.app_modf')" v-model="idstartdc" maxlength="256"></b-form-input>
              </b-input-group>
              <b-form-group class="mt-3">
                <b-button block variant="primary" @click="saveapp(index)">{{$t('message.app_mod7')}}</b-button>
              </b-form-group>
          </b-td>
          <template v-if="modindex!=index">
          <b-td class="d-none d-lg-table-cell">{{item.pluginver}}</b-td>
          <b-td class="d-none d-sm-table-cell"><b-checkbox :key="index" v-model="item.isvalid" @change="savevld($event,index)" switch></b-checkbox></b-td>
          <b-td class="d-none d-md-table-cell">{{item.cashgets}}</b-td>
          <b-td><b-icon :icon="item.returnfee?'check2-circle':'x'"></b-icon></b-td>
          <b-td class="d-none d-sm-table-cell">{{item.regusercnt}}</b-td>
          <b-td>{{item.chgusercnt}}</b-td>
          <b-td>{{item.todaymoney}}</b-td>
          <b-td>{{item.monthmoney}}</b-td>
          <b-td class="d-none d-md-table-cell">{{item.premonthmn}}</b-td>
          <b-td class="d-none d-lg-table-cell">{{item.powused}}</b-td>
          <b-td v-show="item.isdft"><span class="d-none d-sm-inline-block">{{$t('message.app_defapp4')}}</span>{{$t('message.app_defapp0')}}</b-td>
          <b-td v-show="!item.isdft"><b-button size="sm" variant="outline-primary" @click="setdft(index)"><span class="d-none d-sm-inline-block">{{$t('message.app_defapp2')}}</span>{{$t('message.app_defapp0')}}</b-button></b-td>
          </template>
        </b-tr>
      </b-tbody>
    </b-table-simple>
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
    name: 'admapp',
    mounted() {
      this.fetchData();
    },
    data() {
      return {
        modalshow:false,
        modalmsg: '',
        mappname:'',
        mappsecret:'',
        mwxapikey:'',
        mch_id:'',
        sorts:0,
        idstartbk:'',
        idstartac:'',
        idstartdc:'',
        dftappid:'',
        modindex:-1,
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
      dosort(id) {
        if (this.sorts!=id) {
          this.sorts = id;
          this.pageid = 0;
          this.newpagestart = [];
          this.fetchData();
        }
      },
      fetchData() {
        let token = localStorage.getItem('token');
        this.dftappid = localStorage.getItem('dftapp');
        let theapi = '/admapps?tm='+new Date().getTime()+'&token='+token+'&pagesize='+this.$pagesize+'&order='+this.sorts;
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
            for (let i=0;i<this.items.length;i++) {
              if (this.items[i].id==this.dftappid) {
                this.items[i].isdft = true;
              } else {
                this.items[i].isdft = false;
              }
            }
          } else {
            this.items = [];
          }
        });
      },
      appnameclick(idx) {
        if (this.modindex==-1) {
          this.modindex = idx;
          this.mappname = this.items[idx].appname;
          this.mch_id = this.items[idx].sub_mch_id;
          this.idstartbk = this.items[idx].idstartbk.join(',');
          this.idstartac = this.items[idx].idstartac.join(',');
          this.idstartdc = this.items[idx].idstartdc.join(',');
        } else {
          this.modindex = -1;
        }
      },
      saveapp(idx) {
        let appid = this.items[idx].id;
        if (this.mappname.length<3 || this.mappname.length>15) {
          this.modalmsg = '小程序的名字应该在3~12个字之间。';
          this.modalshow = true;
        } else if (this.mch_id.length<8 || this.mch_id.length>12) {
          this.modalmsg = '请填写正确的微信支付商户号';
          this.modalshow = true;
        } else {
          this.modindex=-1;
          let token = localStorage.getItem('token');
          let theapi = '/admappmod?tm='+new Date().getTime()+'&token='+token+'&id='+appid+
            '&name='+this.mappname+'&secret='+this.mappsecret+'&mch='+this.mch_id+
            '&idstartbk='+this.idstartbk+'&idstartac='+this.idstartac+'&idstartdc='+this.idstartdc+
            '&wxapikey='+this.mwxapikey;
          this.axios.get(theapi).then(() => {
            this.fetchData();
          }); 
        }        
      },
      savevld($event, idx) {
        let appid = this.items[idx].id;
        let token = localStorage.getItem('token');
        let theapi = '/admappvld?tm='+new Date().getTime()+'&token='+token+'&id='+appid+'&vld='+$event;
        this.axios.get(theapi).then(() => {
          this.fetchData();
        }); 
      },
      cleandft() {
        let token = localStorage.getItem('token');
        let theapi = '/admappcln?tm='+new Date().getTime()+'&token='+token;
        this.axios.get(theapi).then(() => {
          localStorage.removeItem('dftapp');
          let user = JSON.parse(localStorage.getItem('user'));
          if (user.isadmin) user.appname = 'superadmin';
          localStorage.setItem('user',JSON.stringify(user));
          window.location.reload();
        }); 
      },
      setdft(idx) {
        let appid = this.items[idx].id;
        let token = localStorage.getItem('token');
        let theapi = '/admappdft?tm='+new Date().getTime()+'&token='+token+'&id='+appid;
        this.axios.get(theapi).then((axresp) => {
          localStorage.setItem('dftapp',appid);
          let user = JSON.parse(localStorage.getItem('user'));
          user.appname = axresp.data.appname;
          localStorage.setItem('user',JSON.stringify(user));
          window.location.reload();
        }); 
      },
    }
  }
</script>
