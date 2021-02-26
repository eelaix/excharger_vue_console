<template>
  <div class="container">
    <div class="mb-3 mt-4">
      <h3>Charger platform
        <small>usage and explain</small>
      </h3>
    </div>
    <b-card class="xnshadow mb-5" header-tag="header" footer-tag="footer">
      <template v-slot:header>
              <h3 class="mb-0"><b-icon icon="layout-wtf"></b-icon> charger platform component</h3>
      </template>
      <b-card-text>
        <p><b>hardware device: </b>include 12 ports ebike charger, 2 ports ac ev charger and max to 4 ports 240KW dc ev charger.</p>
        <p><b>mini program: </b>a wechat mini porgram, for charger user, scan to open, downloadless, installless, registerless, easy to use, open source.
        </p>
        <p><b>wechat console: </b>this is a web application, see http://mp.weixin.qq.com/</p>
        <p><b>charge assist: </b>a charger manage tool for charger owner.</p>
        <p><b>web console: </b>a web application, device, user, manager, money management tools, see "Operator web conslle"</p>
        <p><b>wepay assist: </b>a mini program, by tencent, freeuse, money management.</p>
        <p><b>wepay consle: </b>a web application, see http://pay.weixin.qq.com/</p>
      </b-card-text>
    </b-card>
    <b-card class="xnshadow mb-5" header-tag="header" footer-tag="footer">
      <template v-slot:header>
              <h3 class="mb-0"><b-icon icon="card-checklist"></b-icon> Cooperation step</h3>
      </template>
      <b-card-text>
        <ul>
          <li>1. Agree with our cooperation rule, Sign a contract</li>
          <li>2. Prepare some needed document, such as idcard image, business license etc</li>
          <li>3. Get a wechat mini APP from tencent (1 or 2 working day)</li>
          <li>4. Get wechat pay channel from pay.weixin.qq.com (2 or 3 days)</li>
          <li>5. Develop custom wechat miniprogram (2 or 3 hours)</li>
          <li>6. Learn how to use assist APP, how to create a EV charge site</li>
          <li>7. Lean how to get a web managment console account</li>
          <li>8. Comply with an agreement, wait for recieve the commodity</li>
          <li>9. Scan QR code on recieved charger device, assign to sites</li>
          <li>10.Assemble and Commissioning device, starting for gain money</li>
        </ul>
      </b-card-text>
    </b-card>
    <b-card class="xnshadow mb-5" header-tag="header" footer-tag="footer">
      <template v-slot:header>
              <h3 class="mb-0"><b-icon icon="building"></b-icon> About web managment console</h3>
      </template>
      <b-card-text>
        <p>A management web site, FREE USE for cooperations.<br />
        <p>How to visit:</p>
        <p>Web Browser: https://a.mosf.cn/ then enter account and password.</p>
        <p>How to get account:</p>
        <p>https://a.mosf.cn/ then click "Join"</p>
      </b-card-text>
    </b-card>
    <b-card class="xnshadow mb-5" header-tag="header" footer-tag="footer">
      <template v-slot:header>
              <h3 class="mb-0"><b-icon icon="tools"></b-icon> About operation assist</h3>
      </template>
      <b-card-text class="mb-0">
        <p>This is a management tool runing on wechat, used for <span class="text-info">Add Charger Device by QR scan</span>,<span class="text-success">Create charger sites</span>,<span class="text-danger">apportion added devices to sites</span>,<span
            class="text-warning">checking and monitor datas from customers</span>.</p>
        <ul>
          <li>1. login needed for first execute</li>
          <li>2. fill personal info at first use</li>
          <li>3. "Sites"->QRScan for added new device to your account</li>
          <li>4. "Assist"，"Sites"，"Chargers"，"Money"</li>
          <li>5. Learn how to use carefully</li>
        </ul>
      </b-card-text>
    </b-card>
    <b-card class="xnshadow mb-5" header-tag="header" footer-tag="footer">
      <template v-slot:header>
              <h3 class="mb-0"><b-icon icon="person-lines-fill"></b-icon> About personal cooperations</h3>
      </template>
      <b-card-text>
        <p>If you are company cooperation, you can sale your device to personal user, who can install and management it, and use <span class="text-danger">Assist miniAPP</span> to create sites, setup prize, and gain money.</p>
        <p>This personal user is named <span class="text-danger">Personal Cooperation</span>, who can buy, install, managent, and gain money FROM you.</p>
        <p>The gain rate shoud be decided.</p>
      </b-card-text>
    </b-card>
  </div>
</template>
