if (typeof(Array.prototype.contains) === "undefined") {
  Array.prototype.contains = function(obj) {
    var i = this.length;
    while (i--) {
      if (this[i] === obj) {
        return true;
      }
    }
    return false;
  };
}

if (typeof(Date.prototype.format) === "undefined") {
  Date.prototype.format = function(fmt) {
    var o = {
      'M+': this.getMonth() + 1,
      'd+': this.getDate(),
      'h+': this.getHours(),
      'm+': this.getMinutes(),
      's+': this.getSeconds()
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
    for (var k in o)
      if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (('00' +
        o[k]).substr(('' + o[k]).length)));
    return fmt;
  };
}

export const isMobile = function() {
  if(window.navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)) {
    return true; // 移动端
   }else{
    return false; // PC端
   }
};

export const PAGESIZE = 12;
export const MOBILEX = /^1[3456789]{1}[0-9]{9}$/;
export const PARKSTATE = ['无车', '有车', '故障'];
export const PARKCLASS = ['panel-success', 'panel-warning', 'panel-danger'];
export const SWITCHSTA = ['断电', '接通', '通电', '无枪', '回应', '接通', '握手', '握手', '充电', '断开', '断开', '停止', '保护'];
export const FREETYPES = [{
    id: 0,
    name: '#0-不免费'
  },
  {
    id: 1,
    name: '#1-只免服务费'
  },
  {
    id: 2,
    name: '#2-免服务费和电费'
  },
  {
    id: 3,
    name: '#3-全部免费(含4)'
  },
  {
    id: 4,
    name: '#4-免超时占位费'
  }
];
export const FREETYPEA = ['#0-不免费', '#1-只免服务费', '#2免电/服务费', '#3-全部免费', '#4-免超时占位'];
export const SWITCHBIK = ['已通', '已断', '', '', '停用'];

export const PAGEIDS = {
        '_evcar': '汽车电桩页',
        '_evfail': '汽车错误',
        '_histac': '汽车记录',
        '_bkfail': '单车错误',
        '_biker': '单车电桩页',
        '_histbk': '单车历史',
        '_dccar': '直流快充页',
        '_dcfail': '直流错误',
        '_feecard': '空中充值页',
        '_bindphone': '绑手机页',
        '_idcard': '充电卡页',
        '_login': '登陆按钮',
        '_rebalance': '充值记录',
        '_recharge': '充值页',
        '_returnfee': '退款页',
        '_appidx': '应用首页',
        '_userfee': '资金流水',
        '_myfee': '访问流水页',
        '_gunc': '插拔充电枪',
        'zswebhoutai': '_后台管理',
        'zsacntreq': '_运营申请',
        'zschargers': '_电桩管理',
        'zsindex': '_助手首页',
        'zsmoney': '_收入首页',
        'zssessions': '_充电记录',
        'zssfee': '_计费标准',
        'zssinfo': '_站点编辑',
        'zssites': '_资源首页',
        'zswizard': '_设置向导',
};
