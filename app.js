const utils = require('/voice/utils/util.js')

App({
  util: require("we7/resource/js/util.js"),
  globalData: {
    userInfo: null,
    clientId: '692bcb6df797635ad046', // 从 BaaS 后台获取 ClientID
    history: [],
  },
  data:{
    id: '-vXCCXIZH-JF_Y4QNmIE2z2Cj202b5jYVKus0I1S1yw'
  },
  onShow: function(options) {
    console.log("onShow msg" + options)

    wx.BaaS.reportTemplateMsgAnalytics(options)
    //小程序订阅消息
    // wx.BaaS.subscribeMessage(options)
    // wx.requestSubscribeMessage({
    //   tmplIds: [this.data.id],
    //   success: (res) => {
    //     let subscription = []
    //     if (res[this.data.id] === 'accept') {
    //       subscription.push({
    //         template_id: this.data.id,
    //         subscription_type: 'once',
    //       })
    //     }
    //     app.BaaS.subscribeMessage({ subscription }).then(res => {
    //       // success
    //     }, err => {
    //       // fail
    //     })
    //   },
    // })
    wx.BaaS.auth.loginWithWechat(null, {
      createUser: true
    }).then(user => {
      wx.BaaS.auth.getCurrentUser().then(user => {
        console.log('login success') //  ifanrx
        console.log(user) //  ifanrx
      })
    }, err => {
      console.log('login fail')
    })
  },

  onLaunch: function() {
    wx.BaaS = requirePlugin('sdkPlugin')
    //让插件帮助完成登录、支付等功能
    wx.BaaS.wxExtend(wx.login,
      wx.getUserInfo,
      wx.requestPayment)
    let clientId = this.globalData.clientId
    wx.BaaS.init(clientId, {
      autoLogin: true
    })
    wx.getStorage({
        key: 'history',
        success: (res) => {
          this.globalData.history = res.data
        },
        fail: (res) => {
          console.log("get storage failed")
          console.log(res)
          this.globalData.history = []
        }
      }),
      wx.cloud.init({
        env: 'cloudxhy-d0onj', // 环境 id
        traceUser: true
      });
    wx.getSystemInfo({
      success: e => {
        this.globalData.StatusBar = e.statusBarHeight;
        let custom = wx.getMenuButtonBoundingClientRect();
        this.globalData.Custom = custom;
        this.globalData.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
      }
    })
  },
  getRecordAuth: function() {
    wx.getSetting({
      success(res) {
        console.log("succ")
        console.log(res)
        if (!res.authSetting['scope.record']) {
          wx.authorize({
            scope: 'scope.record',
            success() {
              // 用户已经同意小程序使用录音功能，后续调用 wx.startRecord 接口不会弹窗询问
              console.log("succ auth")
            },
            fail() {
              console.log("fail auth")
            }
          })
        } else {
          console.log("record has been authed")
        }
      },
      fail(res) {
        console.log("fail")
        console.log(res)
      }
    })
  },
  onHide: function() {
    wx.stopBackgroundAudio()
  },
  tabBar: {
    color: "#123",
    selectedColor: "#1ba9ba",
    borderStyle: "#1ba9ba",
    backgroundColor: "#fff",
    list: [{
      pagePath: "/we7/pages/index/index",
      iconPath: "/we7/resource/icon/home.png",
      selectedIconPath: "/we7/resource/icon/homeselect.png",
      text: "首页"
    }, {
      pagePath: "/we7/pages/user/index/index",
      iconPath: "/we7/resource/icon/user.png",
      selectedIconPath: "/we7/resource/icon/userselect.png",
      text: "联系"
    }]
  },
  siteInfo: require("siteinfo.js")
});