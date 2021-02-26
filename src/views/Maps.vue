<template>
  <baidu-map class="bm-view" ak="qnVnrNzpNWBZxWvLwtL2jYhwe70WgCB1" :zoom="zoom" :center="center" @ready="bmready">
  </baidu-map>
</template>

<style>
  .bm-view{
    width:100vw;
    height:100vh;
  }
  .anchorBL {
    display: none;
  }
</style>
<script>
  let gmap = undefined;
  let gBMap = undefined;
  let swne = undefined;
  let convertor = undefined;
  import BaiduMap from 'vue-baidu-map/components/map/Map.vue';
  export default {
    name: 'maps',
    components: {
      BaiduMap
    },
    mounted() {
    },
    data() {
      return {
        zoom:15,
        center:{lng:0,lat:0},
        LastEvaluatedKey: undefined
      };
    },
    methods: {
      createMark(site, point) {
            let cnt = site.cnt;
            let src;
            if (cnt > 9) {
              src = 'images/markm.png';
            } else {
              src = 'images/mark' + cnt + '.png';
            }
            let ltitle = '';
            if (site.dc > 0) {
              ltitle = '2?siteid=' + site.siteid+'&aid='+site.aid;
            } else if (site.ac > 0) {
              ltitle = '1?siteid=' + site.siteid+'&aid='+site.aid;
            } else {
              ltitle = '0?siteid=' + site.siteid+'&aid='+site.aid;
            }
            let marker = new gBMap.Marker(point, {
              icon: new gBMap.Icon(src, new gBMap.Size(32, 47)), title: ltitle
            });
            marker.setAnimation('BMAP_ANIMATION_DROP');
            let infctx =
              '<div class="panel panel-warning"><div class="panel-heading">' +
              '<h3 class="panel-title">' + site.app + '</h3>' +
              '</div>' +
              '<div class="panel-body">' +
              site.sitename + '<span class="dc">直</span>' + site.dc + '<span class="ac">交</span>' + site.ac + '<span class="bk">单</span>' + site.bk + '<br/>(' +
              site.siteid + ')点击标记进入电桩列表' +
              '</div></div>';
            marker.addEventListener('mouseover', function () {
              this.openInfoWindow(new gBMap.InfoWindow(infctx, {enableMessage: true}));
            });
            marker.addEventListener('click', () => {
              let ltitle = marker.getTitle();
              let pos = ltitle.indexOf('&aid=');
              let appid = ltitle.substr(pos+5);
              let atitle = ltitle.substr(0,pos);
              let token = localStorage.getItem('token');
              let theapi = '/admappdft?tm='+new Date().getTime()+'&token='+token+'&id='+appid;
              this.axios.get(theapi).then((axresp) => {
                localStorage.setItem('dftapp',appid);
                let user = JSON.parse(localStorage.getItem('user'));
                user.appname = axresp.data.appname;
                localStorage.setItem('user',JSON.stringify(user));
                window.location.href = '/#/device' + atitle;
              });
            });
            gmap.addOverlay(marker);
      },
      bmready ({BMap, map}) {
        gmap = map;
        gBMap = BMap;
        let clat = localStorage.getItem('clat')||'30.62553';
        let clng = localStorage.getItem('clng')||'114.261526';
        let czom = localStorage.getItem('czom')||'6';
        clat = parseFloat(clat);
        clng = parseFloat(clng);
        czom = parseInt(czom);
        this.center.lat = clat;
        this.center.lng = clng;
        this.zoom = czom;
        let pointa = new BMap.Point(clng, clat);
        map.centerAndZoom(pointa, czom);
        map.setCurrentCity('西安');
        let myzoomCtrl = undefined;
        let ua = navigator.userAgent;
        if (ua && ua.indexOf('Tesla')>0){
          let ZoomControl = function(){
            this.defaultOffset = new BMap.Size(10, 10);
          };
          ZoomControl.prototype = new BMap.Control();
          ZoomControl.prototype.initialize = (mymap) => {
                let mydiv = document.createElement("div");
                let img_plus = document.createElement("img");
                img_plus.setAttribute("src", "images/mapscaleup.png");
                img_plus.onclick = function () {mymap.zoomTo(mymap.getZoom() + 1);};
                let img_minus = document.createElement("img");
                img_minus.setAttribute("src", "images/mapscaledn.png");
                img_minus.onclick = function () {mymap.zoomTo(mymap.getZoom() - 1);};
                let img_mvleft = document.createElement("img");
                img_mvleft.setAttribute("src", "images/mapmoveleft.png");
                img_mvleft.onclick = function () {mymap.panBy(-100, 0);};
                let img_mvright = document.createElement("img");
                img_mvright.setAttribute("src", "images/mapmoveright.png");
                img_mvright.onclick = function () {mymap.panBy(100, 0);};
                let img_mvup = document.createElement("img");
                img_mvup.setAttribute("src", "images/mapmoveup.png");
                img_mvup.onclick = function () {mymap.panBy(0, 100);};
                let img_mvdn = document.createElement("img");
                img_mvdn.setAttribute("src", "images/mapmovedn.png");
                img_mvdn.onclick = function () {mymap.panBy(0, -100);};
                mydiv.appendChild(img_plus);
                mydiv.appendChild(img_minus);
                mydiv.appendChild(document.createElement("br"));
                mydiv.appendChild(img_mvleft);
                mydiv.appendChild(img_mvright);
                mydiv.appendChild(document.createElement("br"));
                mydiv.appendChild(img_mvup);
                mydiv.appendChild(img_mvdn);
                mymap.getContainer().appendChild(mydiv);
                return mydiv;
          };
          myzoomCtrl = new ZoomControl();
        }else{
          myzoomCtrl = new BMap.NavigationControl({
                anchor: 'BMAP_ANCHOR_TOP_LEFT',
                type: 'BMAP_NAVIGATION_CONTROL_LARGE',
                enableGeolocation: false
          });
        }
        map.addControl(myzoomCtrl);
        let gbound = map.getBounds();
        convertor = new BMap.Convertor();
        swne = [gbound.getSouthWest(), gbound.getNorthEast()];
        map.addEventListener('dragend', () => {
              let center = map.getCenter();
              let zoomer = map.getZoom();
              localStorage.setItem('clat', ''+center.lat);
              localStorage.setItem('clng', ''+center.lng);
              localStorage.setItem('czom', ''+zoomer);
              let tbound = map.getBounds();
              swne = [tbound.getSouthWest(), tbound.getNorthEast()];
              this.LastEvaluatedKey = false;
              map.clearOverlays();
              this.dosearch();
          });
          map.addEventListener('zoomend', () => {
              let center = map.getCenter();
              let zoomer = map.getZoom();
              localStorage.setItem('clat', ''+center.lat);
              localStorage.setItem('clng', ''+center.lng);
              localStorage.setItem('czom', ''+zoomer);
              let tbound = map.getBounds();
              swne = [tbound.getSouthWest(), tbound.getNorthEast()];
              this.LastEvaluatedKey = false;
              map.clearOverlays();
              this.dosearch();
          });
        this.dosearch();
      },
      dosearch() {
        let token = localStorage.getItem('token');
        convertor.translate(swne, 5, 3, (datp) => {
          let theapi = '/wmaps?tm=' + new Date().getTime() + '&token='+token + '&leftlng=' + datp.points[0].lng + '&botlat=' + datp.points[0].lat + '&rightlng=' + datp.points[1].lng + '&toplat=' + datp.points[1].lat;
          if (this.LastEvaluatedKey) {
            theapi = theapi + '&last='+encodeURIComponent(JSON.stringify(this.LastEvaluatedKey));
          }
          this.axios.get(theapi).then( (axresp) => {
            if (axresp.status==200) {
              let axdata = axresp.data;
              this.LastEvaluatedKey = axdata.LastEvaluatedKey;
              if (axdata.Items.length > 0) {
                    let mysites = new Array();
                    let mypoints = new Array();
                    for (let i = 0; i < axdata.Items.length; i++) {
                      let onesite = axdata.Items[i];
                      let alat = onesite.lat;
                      let alng = onesite.lng;
                      let onepoint = new gBMap.Point(alng, alat);
                      delete onesite.lat;
                      delete onesite.lng;
                      mypoints.push(onepoint);
                      mysites.push(onesite);
                    }
                    convertor.translate(mypoints, 1, 5, (data) => {
                      for (let k = 0; k < data.points.length; k++) {
                        this.createMark(mysites[k], data.points[k]);
                      }
                      if (axdata.LastEvaluatedKey) {
                        this.dosearch();
                      }
                    });
              }
            }
          });
        });
      },
    },
  }
</script>
