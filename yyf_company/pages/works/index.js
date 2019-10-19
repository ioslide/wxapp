var app = getApp(),
  WxParse = require("../../../wxParse/wxParse.js");
import {
  html,
  renderSVG,
  To,
  cax
} from '../../../cax/cax'

Page({
  data: {
    isShow: false,
    scrollheight: "",
    scrollTop: 0,
    fixedTop: 0,
    footsss: 0,
    attentionAnim: '',
    cardCur: 0,
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    Custom: app.globalData.Custom,
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    TabCur: 1,
    scrollLeft: 0,
    slide: [],
    sysinfo: {},
    list: [],
    cats: [],
    copyright: "",
    blist: {},
    tcolor: "",
    horn: "",
    slide_close: "0",
    nav_close: "0",
    notice_close: "0",
    slide_height: "",
    adsense: {},
    nav_style: "0",
    title_style: "0",
    show_video: !1,
    hide_time: "0",
    hide_tabbar: "0",
    nav_height: "0",
    contentList: {},
    hide_search: 1,
    form: {},
    t1v: "",
    t2v: "",
    t3v: "",
    t4v: "",
    rv: "",
    cv: "",
    av: "",
    av1: "",
    head_color: "",
    fscreen: 0,
    adSlide: [],
    adNav: [],
    adNotice: [],
    version: 3302
  },
  tabNav: function (a) {
    var t = a.currentTarget.dataset.url,
      e = a.currentTarget.dataset.tab;
    if ("-1" != t.indexOf("https")) {
      wx.setStorageSync("navurl", t);
      t = "../webview/webview?op=" + e;
      wx.navigateTo({
        url: t
      });
    } else wx.redirectTo({
      url: t
    });
  },
  onLoad: function (a) {
    var a4 = wx.createAnimation({
      duration: 2000,
      timingFunction: 'ease-in-out',
      delay: 0,
    });
    a4.opacity(1).scale(0.5).step()
    this.setData({
      animateimage: a4.export()
    })
    var a5 = wx.createAnimation({
      duration: 2000,
      timingFunction: 'ease-in-out',
      delay: 0,
    });
    a5.opacity(1).scale(0.6).step()
    this.setData({
      animateimage1: a5.export()
    })
  },

  getScroll: function (e) {
    
    if (e.detail.deltaY < 0) {
      var footani = wx.createAnimation({
        duration: 500,
        timingFunction: 'ease-in-out',
        delay: 0,
      });
      footani.opacity(0).step()
      this.setData({
        footanima: footani.export()
      })
    }
    if (e.detail.deltaY > 0) {
      var footani = wx.createAnimation({
        duration: 500,
        timingFunction: 'ease-in-out',
        delay: 0,
      });
      footani.opacity(1).step()
      this.setData({
        footanima: footani.export()
      })

    }

    console.log(e.detail.scrollTop)
    console.log(e.detail.deltaY)
    var a4 = wx.createAnimation({
      duration: 2000,
      timingFunction: 'ease-in-out',
      delay: 0,
    });
    a4.opacity(1).translate(0, 70).scale(0.5).step()
    this.setData({
      animateimage: a4.export()
    })
    var a5 = wx.createAnimation({
      duration: 2000,
      timingFunction: 'ease-in-out',
      delay: 0,
    });
    a5.opacity(1).translate(0, 70).scale(0.6).step()
    this.setData({
      animateimage1: a5.export()
    })

    if (e.detail.scrollTop > 1) {
      if (e.detail.deltaY < 0) {
        var a1 = wx.createAnimation({
          duration: 3000,
          timingFunction: 'ease-in-out',
          delay: 0
        });
        var a2 = wx.createAnimation({
          duration: 3000,
          timingFunction: 'ease-in-out',
          delay: 0
        });
        var a3 = wx.createAnimation({
          duration: 3000,
          timingFunction: 'ease-in-out',
          delay: 0
        });
        a1.opacity(1).translate(300, 0).step()
        a2.opacity(1).translate(-300, 0).step()
        a3.opacity(1).translate(300, 0).step()
        this.setData({
          animatetext1: a1.export()
        })
        this.setData({
          animatetext2: a2.export()
        })
        this.setData({
          animatetext3: a3.export()
        })
      }
      if (e.detail.deltaY > 0) {
        var a1 = wx.createAnimation({
          duration: 3000,
          timingFunction: 'ease-in-out',
          delay: 0
        });
        var a2 = wx.createAnimation({
          duration: 3000,
          timingFunction: 'ease-in-out',
          delay: 0
        });
        var a3 = wx.createAnimation({
          duration: 3000,
          timingFunction: 'ease-in-out',
          delay: 0
        });

        a1.opacity(1).translate(-300, 0).step()
        a2.opacity(1).translate(300, 0).step()
        a3.opacity(1).translate(-300, 0).step()
        this.setData({
          animatetext1: a1.export()
        })
        this.setData({
          animatetext2: a2.export()
        })
        this.setData({
          animatetext3: a3.export()
        })
      }

    }
    if (e.detail.scrollTop > 100) {
      if (e.detail.deltaY < 0) {
        var a4 = wx.createAnimation({
          duration: 2000,
          timingFunction: 'ease-in-out',
          delay: 0,
        });
        a4.opacity(1).translate(0, -60).rotate(-90, 10).scale(0.5).step()
        this.setData({
          animateimage: a4.export()
        })
      }
      if (e.detail.deltaY > 0) {
        var a4 = wx.createAnimation({
          duration: 2000,
          timingFunction: 'ease-in-out',
          delay: 0
        });
        a4.opacity(1).translate(0, 100).scale(0.5).step()
        this.setData({
          animateimage: a4.export()
        })
      }
    }
    if (e.detail.scrollTop > 110) {
      if (e.detail.deltaY < 0) {
        var a5 = wx.createAnimation({
          duration: 2000,
          timingFunction: 'ease-in-out',
          delay: 0,
        });
        a5.opacity(1).translate(0, -100).scale(0.6).rotate(-90, 10).step()
        this.setData({
          animateimage1: a5.export()
        })
      }
      if (e.detail.deltaY > 0) {
        var a5 = wx.createAnimation({
          duration: 1200,
          timingFunction: 'ease-in-out',
          delay: 0
        });
        a5.opacity(1).translate(0, 100).scale(0.6).step()
        this.setData({
          animateimage1: a5.export()
        })
      }
    }

  },

});