<template>
  <div class="container">
    <div class="mb-3 mt-4">
      <h3>充电平台
        <small>使用方法与说明</small>
      </h3>
    </div>
    <b-card class="xnshadow mb-5" header-tag="header" footer-tag="footer">
      <template v-slot:header>
              <h3 class="mb-0"><b-icon icon="layout-wtf"></b-icon> 充电平台系统组成</h3>
      </template>
      <b-card-text>
        <p><b>设备硬件：</b>由我公司研发、生产、销售的充电桩硬件设备，包括一拖十二电动单车充电桩，7KW汽车交流充电桩，80KW/120KW/160KW汽车直流充电桩。</p>
        <p><b>充电小程序：</b>这是一个微信小程序，是最终用户使用的充电APP程序，是微信的一部份，微信扫码打开，免下载，免安装，免注册，免登陆，不占手机内存，不拖慢手机系统，即扫即用，想用即在，不用不扰。本程序开放源代码，合作伙伴可以自行扩展。
        </p>
        <p><b>小程序管理后台：</b>这是一个网页应用程序，网址是：http://mp.weixin.qq.com/可以通过电脑来管理小程序，包括交年费，发布新版小程序等。</p>
        <p><b>充电运营助手：</b>充电小程序内置功能，通过手机管理、维护充电站，电桩等数据，免费提供给合作伙伴使用。</p>
        <p><b>充电运营管理后台：</b>这是一个网页应用程序，通过电脑查看充电运营状态，详细说明请参考下面的《关于运营后台》。</p>
        <p><b>微信支付商家助手：</b>这是一个微信小程序，腾讯公司开发，免费给合作伙伴使用，可以随时查看充值收入情况。</p>
        <p><b>微信支付管理后台：</b>这是一个网页应用程序，网址是：http://pay.weixin.qq.com/可以通过电脑查看充值收入情况。</p>
      </b-card-text>
    </b-card>
    <b-card class="xnshadow mb-5" header-tag="header" footer-tag="footer">
      <template v-slot:header>
              <h3 class="mb-0"><b-icon icon="card-checklist"></b-icon> 平台合作步骤</h3>
      </template>
      <b-card-text>
        <ul>
          <li>1. 认同合作模式，签订设备批量采购合同</li>
          <li>2. 提供营业执照，对公账户，法人身份证彩图</li>
          <li>3. 协助客户申请开通微信小程序(1~2工作日)</li>
          <li>4. 协助客户申请开通支付通道(2~3天)</li>
          <li>5. 帮助客户开发上线微信小程序(1~2小时)</li>
          <li>6. 学习使用运营助手，填写向导，创建电站</li>
          <li>7. 关注本公司微信公众号，申请后台账号</li>
          <li>8. 履行合同，设备发货，学习软件使用</li>
          <li>9. 收货，扫码添加电桩，分配到充电站</li>
          <li>10. 安装调试设备，上线运营，开始赚钱</li>
        </ul>
      </b-card-text>
    </b-card>
    <b-card class="xnshadow mb-5" header-tag="header" footer-tag="footer">
      <template v-slot:header>
              <h3 class="mb-0"><b-icon icon="building"></b-icon> 关于运营后台</h3>
      </template>
      <b-card-text>
        <p>运营管理后台是给充电运营商用的管理平台。合作伙伴可以免费安装使用。<br />
          运营管理后台免费提供给运营商使用，不接受合作伙伴定制。<br />
          运营管理后台程序版权归原研发公司所有，合作商不具备软件版权。<br />
        <p>运营管理后台进入方式：</p>
        <p>浏览器访问：https://a.mosf.cn/输入账号密码登陆</p>
        <p>运营管理后台账号申请：</p>
        <p>浏览器访问：https://a.mosf.cn/点击“申请加入”</p>
      </b-card-text>
    </b-card>
    <b-card class="xnshadow mb-5" header-tag="header" footer-tag="footer">
      <template v-slot:header>
              <h3 class="mb-0"><b-icon icon="star-half"></b-icon> 平台使用说明</h3>
      </template>
      <b-card-text>
        多数功能页的下面都有使用说明，请具体参考说明。<br />
        统计数据按日汇总保存，只保存最近两个月的日数据，两个月以前的数据只保留每月1日，其他的不再保留，如有需要，请下载保存。<br />
        统计数据项包括：<br />
        日充电人数，日充电次数，日消费金额，每日电表读数，日电表用量。<br />
        以上数据精度为电桩，可以精确到每一台电桩的数据，可按充电站日汇总。<br />
        主菜单 - 电桩管理 - 选中某个电桩 - 统计：这个电桩的所有按日统计报表。<br />
        主菜单 - 电站管理 - 选择某个充电站 - 统计：这个电站的所有按日统计汇总。<br />
        主菜单 - 更多业务 - 运营数据日统计：本运营商按日统计汇总。运营商日报表新增 充值金额，赠送金额，退款金额，注册人数 四项。<br />
        以上报表皆可下载。<br />
      </b-card-text>
    </b-card>
    <b-card class="xnshadow mb-5" header-tag="header" footer-tag="footer">
      <template v-slot:header>
              <h3 class="mb-0"><b-icon icon="tools"></b-icon> 充电运营助手</h3>
      </template>
      <b-card-text class="mb-0">
        <p>手机版业务管理工具。用来<span class="text-info">添加充电桩</span>，<span class="text-success">创建充电站</span>，<span class="text-danger">分配电桩到电站</span>，<span
            class="text-warning">查看本人管理的运营数据</span>。</p>
        <ul>
          <li>1. 首次打开运营助手需要登陆</li>
          <li>2. 新用户登陆后填写设置向导</li>
          <li>3. "我的电站"->扫码添加新电桩</li>
          <li>4. "运营助手"，"我的电站"，"我的电桩"，"查看收入"</li>
          <li>5. 请注意研究，学习软件使用方法</li>
        </ul>
      </b-card-text>
    </b-card>
    <b-card class="xnshadow mb-5" header-tag="header" footer-tag="footer">
      <template v-slot:header>
              <h3 class="mb-0"><b-icon icon="person-lines-fill"></b-icon> 关于个人运营商</h3>
      </template>
      <b-card-text>
        <p>拥有支付通道的合作伙伴将自家品牌充电桩设备卖给个人，个人买到设备安装好，用<span class="text-danger">充电运营助手</span>创建电站，添加电桩，设置价格，产生的充电消费收入可提现。</p>
        <p>买设备的人就是<span class="text-danger">个人运营商</span>。买设备，安装，用助手设置价格，提取收益。</p>
        <p>双方协商销售价格与分成比例。</p>
      </b-card-text>
    </b-card>
  </div>
</template>
