<template>
  <div id="h5app">
    <MainMenu v-show="$route.meta.requiresAuth" />
    <router-view></router-view>
  </div>
</template>
<script>
  import MainMenu from '@/components/MainMenu.vue'
  export default {
    components: {
      MainMenu
    },
    data() {
      return {};
    },
    methods: {}
  }
</script>
<style>
  .loginmsg {
    margin: 10px;
    color: red;
    font-size: 1.2em;
  }

  .xnpanel {
    margin-top: 4%;
    border-radius: 15px;
    border: 1px solid #B3B3B3;
    box-shadow: 10px 20px 10px rgba(0, 0, 0, .8);
    z-index: 1000;
  }

  .xnshadow {
    box-shadow: 10px 10px 20px rgba(51, 51, 51, .4);
  }

  .wxhead {
    width: 24px;
    height: 24px;
  }

  .fullmask {
    position: fixed;
    height: 100%;
    width: 100%;
    z-index: 9994;
    left: 0;
    top: 0;
    background: rgba(0, 0, 0, 0.6);
  }

  .imgshow {
    display: inline-block;
    margin: 0 auto;
    background: #fff;
    z-index: 9995;
  }

  @media only screen and (orientation: portrait) {
    .mapshow {
      display: inline-block;
      margin: 0 auto;
      background: #fff;
      z-index: 9995;
      margin-top: 0px;
    }
    .bm-view {
      z-index: 9996;
      width: 100vw;
      height: 60vh;
    }
  }

  @media only screen and (orientation: landscape) {
    .mapshow {
      display: inline-block;
      margin: 0 auto;
      background: #fff;
      z-index: 9995;
      margin-top: 50px;
    }
    .bm-view {
      z-index: 9996;
      width: 60vw;
      height: 60vh;
    }
  }

  .anchorBL {
    display: none;
  }

  .midline {
    text-decoration: line-through;
  }

  .invalid {
    color: rgba(51, 51, 51, 0.2);
  }

  .greyco {
    color: rgba(102, 102, 102, 0.5);
  }

  a.disabled {
    pointer-events: none;
    color: rgba(51, 51, 51, 0.3);
  }
</style>
