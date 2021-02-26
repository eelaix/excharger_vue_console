<template>
  <b-container fluid="xs">
    <div class="text-center text-info h3">
      <span v-show="tp<3">{{$t('message.pow_th2')}}</span>
      <span v-show="tp>2">{{$t('message.pow_th3')}}</span>
      {{id}} 
      {{$t('message.pow_th4')}}</div>
    <div>
      <b-table-simple hover small caption-top responsive>
        <b-thead head-variant="light">
          <b-tr>
            <b-th>
              <b-icon icon="phone"></b-icon>{{$t('message.pow_th0')}}
            </b-th>
            <b-th>
              <b-icon icon="gem"></b-icon>{{$t('message.pow_th1')}}
            </b-th>
          </b-tr>
        </b-thead>
        <b-tbody v-for="(item, index) in items" :key="index">
          <b-tr>
            <b-td>{{item.theday}}</b-td>
            <b-td>{{item.power}}</b-td>
          </b-tr>
        </b-tbody>
      </b-table-simple>
    </div>
    <b-form inline class="mt-4 ml-4">
      <b-button-group class="mr-4 mb-4">
        <b-button variant="success" @click="fetchNext" :disabled="nomore">显示更多</b-button>
      </b-button-group>
    </b-form>
  </b-container>
</template>

<script>
  export default {
    name: 'power',
    mounted() {
      this.fetchData();
    },
    data() {
      return {
        nomore: true,
        nextday: 0,
        qrytimes: 0,
        tp: this.$route.params.tp,
        id: this.$route.params.id,
        sec: this.$route.params.sec,
        items: []
      };
    },
    methods: {
      fetchNext() {
        this.nomore = true;
        this.qrytimes = 0;
        this.fetchData();
      },
      fetchData() {
        let theapi = '/power?tm='+new Date().getTime()+'&tp='+this.tp+'&id='+this.id+'&sec='+this.sec+'&day='+this.nextday;
        this.axios.get(theapi).then(axresp => {
          if (axresp.status == 200) {
            let axdata = axresp.data;
            if (axdata.nextday) {
              this.nextday = axdata.nextday;
              this.items.push(axdata.Item);
              this.qrytimes++;
              if (this.$route.fullPath.indexOf('power')>0 && this.qrytimes<60) {
                this.fetchData();
              } else {
                this.nomore = false;
              }
            } else {
              this.nomore = true;
              this.nextday = 0;
            }
          } else {
            this.items = [];
          }
        });
      },
    }
  }
</script>
