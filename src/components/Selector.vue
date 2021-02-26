<template>
  <b-modal v-if="id==0" id="mdSelector0" scrollable size="xl" no-close-on-backdrop no-close-on-esc hide-header hide-footer>
    <b-row class="p-4" cols="1">
      <div class="mb-3 pr-3" v-for="dat in data0" :key="dat.id">
      <b-button block :variant="target==dat.id?'primary':'outline-primary'" @click="selectme(dat.id)">{{dat.label}}</b-button>
      </div>
    </b-row>
  </b-modal>
  <b-modal v-else-if="id==1" id="mdSelector0" scrollable size="xl" no-close-on-backdrop no-close-on-esc hide-header hide-footer>
    <b-row class="p-4" cols="1" cols-sm="2" cols-md="3" cols-lg="4">
      <div class="mb-3 pr-3" v-for="dat in data1" :key="dat.id">
        <b-button block :variant="target==dat.id?'success':'outline-success'" @click="selectme(dat.id)">{{dat.label}}</b-button>
      </div>
    </b-row>
    <b-form inline class="mt-4 ml-4" v-show="newpagestart.length>0">
      <b-button-group class="mr-4 mb-4">
        <b-button variant="success" @click="fetchprev" :disabled="pageid==0">{{$t('message.btn_prevpage')}}</b-button>
        <b-button v-if="pageid>0" variant="outline-success" :disabled="true" >{{pageid+1}}</b-button>
        <b-button variant="success" @click="fetchNext" :disabled="pageid==newpagestart.length">{{$t('message.btn_nextpage')}}</b-button>
      </b-button-group>
    </b-form>
  </b-modal>
  <b-modal v-else-if="id==2" id="mdSelector2" scrollable size="xl" no-close-on-backdrop no-close-on-esc hide-header hide-footer>
    <b-row class="p-4" cols="2" cols-sm="2" cols-md="4" cols-lg="6">
      <div class="mb-3 pr-3" v-for="dat in Object.keys(data2)" :key="dat">
        <b-button block :variant="targot==dat?'info':'outline-info'" @click="selectme(dat)">{{data2[dat]}}</b-button>
      </div>
    </b-row>
  </b-modal>
</template>

<script>
  import { PAGEIDS } from '@/consv'
  export default {
    name: 'Selector',
    props: {
      id: Number,
      targot: String,
      target: Number,
    },
    data() {
      return {
        data0: [],
        data1: [],
        data2: [],
        pageid:0,
        newpagestart:[]
      };
    },
    mounted() {
      this.fetchData();
      this.data0 = [{
        id: 0,
        label: '0-不免费,以前免费记录不清空'
      }, {
        id: 1,
        label: '1-汽车充电免服务费,单车全免'
      }, {
        id: 2,
        label: '2-汽车充电全免,单车充电全免'
      }];
      PAGEIDS['all'] = '全部页面';
      this.data2 = PAGEIDS;
    },
    methods: {
      selectme(id) {
        let obj;
        if (this.id<2) {
          obj = {
            typeid: this.id,
            selected: id
          };
        } else if (this.id==2) {
          obj = {
            typeid: this.id,
            selected: id,
            selectlb: this.data2[id]
          };
        } else {
          obj = {
            typeid: this.id,
            selected: id
          };
        }
        this.$emit('callback', obj);
        if (this.id==0) {
          this.$bvModal.hide('mdSelector0');
        } else if (this.id==1) {
          this.$bvModal.hide('mdSelector0');
        } else if (this.id==2) {
          this.$bvModal.hide('mdSelector2');
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
        let token = localStorage.getItem('token');
        let theapi = '/siteidonly?tm=' + new Date().getTime() + '&token=' + token;
        if (this.pageid>0 && this.newpagestart[this.pageid-1]) {
          theapi = theapi + '&last='+encodeURIComponent(JSON.stringify(this.newpagestart[this.pageid-1]));
        }
        this.axios.get(theapi).then(axresp => {
          if (axresp.status == 200) {
            let axdata = axresp.data;
            for (let i=0;i<axdata.Items.length;i++){
              this.data1.push(axdata.Items[i]);
            }
            if (axdata.LastEvaluatedKey) {
              if (this.newpagestart.length<=this.pageid) {
                this.newpagestart.push(axdata.LastEvaluatedKey);
              } else {
                this.newpagestart[this.pageid] = axdata.LastEvaluatedKey;
              }
            }
          } else {
            this.data1.length=0;
          }
        });
      },
    }
  }
</script>
