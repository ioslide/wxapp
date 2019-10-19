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
    fscreen:0,
    adSlide: [],
    adNav: [],
    adNotice: [],
    version: 3302
  },
  onLoad: function(a) {
    const svg = renderSVG(html `
<svg  height="350" width="250" viewBox="0 0 389.052 300">
<path d="M150,450.8h150v-225H150V450.8z" style="fill:#f39ca5"/>
<path d="M0,450.8h150v-150H0V450.8z" style="fill:#4e76a4"/>
<path d="M0,225.8c0-41.4,33.6-75,75-75c0,0,0,0,0,0v150C33.6,300.8,0,267.3,0,225.8C0,225.8,0,225.8,0,225.8z" style="fill:#de5558"/>
<path transform="translate(0 150)" d="M150,150.8c0,41.4,33.6,75,75,75c41.4,0,75-33.6,75-75c0,0,0,0,0,0H150z" style="fill:#ffc854"/>

</svg>`, 'svg-c', this)

    const svgaaa = renderSVG(html `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 945.726 1418.586" height="400" width="300">
<path d="M1140.935,398.324c0,261.154-211.707,472.862-472.861,472.862V398.324Z" style="fill:#ffc854"/>
<path d="M668.073,1344.047h472.861V871.185H668.073Z" style="fill:#4e76a4"/>
<path d="M668.074,1816.907c-261.155,0-472.864-211.707-472.864-472.861S406.919,871.183,668.074,871.183Z" style="fill:#f5939d"/>
<path d="M904.505,1816.91c-130.577,0-236.431-105.854-236.431-236.432h472.862C1140.936,1711.056,1035.082,1816.91,904.505,1816.91Z" style="fill:#ffc854"/>
<path d="M786.288,1462.263A118.216,118.216,0,1,0,904.5,1344.048,118.216,118.216,0,0,0,786.288,1462.263Z" style="fill:#de5558"/></svg>`, 'svg-b', this)



    svg.scale = 0.8
    svg.stage.update()


    svgaaa.scale = 0.2
    svgaaa.stage.update()

    const info = wx.getSystemInfoSync()
    console.log(info)
    var sineInOut = To.easing.sinusoidalInOut
    var elasticInOutt = To.easing.elasticInOut
    const rect = svg.children[1]
    const rightfk = svg.children[0]
    const tophalf2 = svg.children[2]
    const tophalf3 = svg.children[3]

    const firerect = svgaaa.children[0]
    const firerect1 = svgaaa.children[1]
    const firerect2 = svgaaa.children[2]
    const firerect4 = svgaaa.children[4]

    To.get(rightfk)
      .to()
      .y(0, 2000, elasticInOutt)
      .to()
      .y(10, 2000, elasticInOutt)
      .cycle()
      .start()
    // To.get(tophalf2)
    //   .wait(10)
    //   .to()
    //   .y(-340, 2000, elasticInOutt)
    //   .to()
    //   .y(0, 2000, elasticInOutt)
    //   .cycle()
    //   .start()
    To.get(tophalf3)
      .to()
      .y(-140, 2000, elasticInOutt)
      .to()
      .y(0, 2000, elasticInOutt)
      .cycle()
      .start()

    setInterval(() => {
      svg.stage.update()
    }, 23)


    To.get(firerect)
      .wait(10)
      .to()
      .x(1440, 2000, elasticInOutt)
      .to()
      .x(0, 2000, elasticInOutt)
      .cycle()
      .start()

    To.get(firerect1)
      .wait(1010)
      .to()
      .x(1440, 2000, elasticInOutt)
      .to()
      .x(0, 2000, elasticInOutt)
      .cycle()
      .start()

    setInterval(() => {
      svg.stage.update()
      svgaaa.stage.update()
      // textbolck.stage.update()
    }, 23)

    var that = this;
    var obj = {
      fscreendis: function fscreendisFn() {   
        that.setData({
          fscreen: 1
        })
      }
    };

   
    //引导图
    setTimeout(obj.fscreendis.bind(obj), 3500);
    setTimeout(() => {
    obj.fscreendis();
      console.log(this.data.fscreen)
    }, 3550)
    setTimeout(() => {
      var footani = wx.createAnimation({
        duration: 500,
        timingFunction: 'ease-in-out',
        delay: 0,
      });
      footani.opacity(0).step()
      this.setData({
        fscreenani: footani.export()
      })
    }, 3050)



    this.towerSwiper('slide');
    var t = a.scene;
    "" != t && null != t && (-1 == t.indexOf("-") ? wx.navigateTo({
      url: "../content/content?id=" + t
    }) : (t = t.split("-"), wx.navigateTo({
      url: "../video/video?id=" + t[0]
    })));
    var r = this,
      e = app.siteInfo.uniacid;
    r.setTabBar(), app.util.request({
      url: "entry/wxapp/index",
      data: {
        m: "yyf_company",
        uniacid: e,
        version: r.data.version
      },
      cachetime: 0,
      success: function(a) {
        if (!a.data.errno) {
          for (var t = a.data.data.list, e = 0; e < t.length; e++)
            if (3 == t[e].type) {
              WxParse.wxParse("article1", "html", t[e].content, r, 10);
              var i = t[e].id,
                n = r.data.contentList;
              n[i] = r.data.article1, r.setData({
                contentList: n
              });
            }
          r.setData({
            slide: a.data.data.slide,
            sysinfo: a.data.data.sysinfo,
            list: a.data.data.list,
            cats: a.data.data.cats,
            horn: a.data.data.horn,
            notice_close: a.data.data.notice_close,
            slide_close: a.data.data.slide_close,
            nav_close: a.data.data.nav_close,
            slide_height: a.data.data.slide_height,
            nav_style: a.data.data.nav_style,
            title_style: a.data.data.title_style,
            hide_time: a.data.data.hide_time,
            nav_height: a.data.data.nav_height,
            hide_search: a.data.data.hide_search,
            head_color: a.data.data.head_color,
            adSlide: a.data.data.adslide,
            adNav: a.data.data.adnav,
            adNotice: a.data.data.adnotice
          }), wx.setNavigationBarTitle({
            title: a.data.data.sysinfo.title
          }), app.globalData.copyright = a.data.data.sysinfo.copyright;
        }
      }
    }), app.util.request({
      url: "entry/wxapp/Adsense",
      data: {
        m: "yyf_company",
        uniacid: e
      },
      cachetime: 0,
      success: function(a) {
        a.data.errno || r.setData({
          adsense: a.data.data
        });
      }
    }), app.util.request({
      url: "entry/wxapp/TabBar",
      data: {
        m: "yyf_company",
        uniacid: e
      },
      cachetime: 0,
      success: function(a) {
        if (!a.data.errno) {
          var t = wx.getStorageSync("barlist");
          "" != t && t.uptime == a.data.data.uptime || (wx.setStorageSync("barlist", a.data.data),
            r.setTabBar());
        }
      }
    }), app.util.request({
      url: "entry/wxapp/form",
      data: {
        m: "yyf_company",
        uniacid: e
      },
      cachetime: 0,
      success: function(a) {
        a.data.errno || (r.setTabBar(), r.setData({
          form: a.data.data
        }));
      }
    });
  },
  DotStyle: function(e) {
    this.setData({
      DotStyle: e.detail.value
    })
  },

  // cardSwiper
  cardSwiper: function(e) {
    this.setData({
      cardCur: e.detail.current
    })
  },
  // towerSwiper
  // 初始化towerSwiper
  towerSwiper: function(name) {
    let list = this.data[name];
    for (let i = 0; i < list.length; i++) {
      list[i].zIndex = parseInt(list.length / 2) + 1 - Math.abs(i - parseInt(list.length / 2))
      list[i].mLeft = i - parseInt(list.length / 2)
    }
    this.setData({
      slide: list
    })
  },
  // onShow:function(){
  //   var a1 = wx.createAnimation({
  //     duration: 3000,
  //     timingFunction: 'ease-in-out',
  //     delay: 0
  //   });
  //   var a2 = wx.createAnimation({
  //     duration: 3000,
  //     timingFunction: 'ease-in-out',
  //     delay: 0
  //   });
  //   var a3 = wx.createAnimation({
  //     duration: 3000,
  //     timingFunction: 'ease-in-out',
  //     delay: 0
  //   });
  //   var next = true;

  //   setInterval(function () {
  //     if (next) {
  //       a1.opacity(1).translate(300, 0).step()
  //       a2.opacity(1).translate(-300, 0).step()
  //       a3.opacity(1).translate(300, 0).step()
  //       next = !next;
  //     } else {
  //       a1.opacity(1).translate(-300, 0).step()
  //       a2.opacity(1).translate(300, 0).step()
  //       a3.opacity(1).translate(-300, 0).step()
  //       next = !next;
  //     }
  //     this.setData({
  //       animatetext1: a1.export()
  //     })
  //     this.setData({
  //       animatetext2: a2.export()
  //     })
  //     this.setData({
  //       animatetext3: a3.export()
  //     })
  //   }.bind(this), 4000)
  // },

  getScroll: function(e) {
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

    if (e.detail.scrollTop > 0) {
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
    if (e.detail.scrollTop > 2000) {
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
    if (e.detail.scrollTop > 2800) {
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
  // towerSwiper触摸开始
  towerStart: function(e) {
    this.setData({
      towerStart: e.touches[0].pageX
    })
  },
  // towerSwiper计算方向
  towerMove: function(e) {
    this.setData({
      direction: e.touches[0].pageX - this.data.towerStart > 0 ? 'right' : 'left'
    })
  },
  // towerSwiper计算滚动
  towerEnd: function(e) {
    let direction = this.data.direction;
    let list = this.data.slide;
    if (direction == 'right') {
      let mLeft = list[0].mLeft;
      let zIndex = list[0].zIndex;
      for (let i = 1; i < list.length; i++) {
        list[i - 1].mLeft = list[i].mLeft
        list[i - 1].zIndex = list[i].zIndex
      }
      list[list.length - 1].mLeft = mLeft;
      list[list.length - 1].zIndex = zIndex;
      this.setData({
        slide: list
      })
    } else {
      let mLeft = list[list.length - 1].mLeft;
      let zIndex = list[list.length - 1].zIndex;
      for (let i = list.length - 1; i > 0; i--) {
        list[i].mLeft = list[i - 1].mLeft
        list[i].zIndex = list[i - 1].zIndex
      }
      list[0].mLeft = mLeft;
      list[0].zIndex = zIndex;
      this.setData({
        slide: list
      })
    }
  },

  changePath: function() {
    this.pasitionElement.toggle()
  },

  tapHandler: function() {
    console.log(this)
  },

  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  showModal: function(e) {
    this.setData({
      modalName: e.currentTarget.dataset.target
    })
  },
  hideModal: function(e) {
    this.setData({
      modalName: null
    })
  },
  tabSelect: function(e) {
    console.log(e);
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id - 1) * 60
    })
  },
  slideAction: function(a) {
    var t = a.currentTarget.dataset.id,
      e = this.data.slide[t];
    "1" == e.kind && this.adCalling(e.phone), "2" == e.kind && ("driver" == e.url1 ? this.driver() : this.slideUrl(e.url1, e.id)),
      "3" == e.kind && this.adMini(e.appid, e.address);
  },
  adAction: function(a) {
    var t, e = a.currentTarget.dataset.id,
      i = a.currentTarget.dataset.position,
      n = a.currentTarget.dataset.adfloat;
    if ("slide" == i) t = this.data.adSlide[e];
    else if ("nav" == i) t = this.data.adNav[e];
    else if ("notice" == i) t = this.data.adNotice[e];
    else {
      var r = a.currentTarget.dataset.fid;
      t = this.data.list[r][e];
    }
    console.log(t), "0" != t.style && "left" != n || ("1" == t.kind && this.adCalling(t.phone),
      "2" == t.kind && ("driver" == t.url ? this.driver() : this.adUrl(t.url, t.style, n, t.id)),
      "3" == t.kind && this.adMini(t.appid, t.address)), "1" == t.style && "right" == n && ("1" == t.kind2 && this.adCalling(t.phone2),
      "2" == t.kind2 && ("driver" == t.url2 ? this.driver() : this.adUrl(t.url2, t.style, n, t.id)),
      "3" == t.kind2 && this.adMini(t.appid2, t.address2));
  },
  adCalling: function(a) {
    wx.makePhoneCall({
      phoneNumber: a
    });
  },
  adUrl: function(a, t, e, i) {
    if (wx.setStorageSync("navurl", a), "-1" != a.indexOf("https")) {
      a = "../webview/webview?op=zna&adfloat=" + e + "&adid=" + i;
      console.log(a);
    }
    wx.navigateTo({
      url: a
    });
  },
  slideUrl: function(a, t) {
    if (wx.setStorageSync("navurl", a), "-1" != a.indexOf("https")) {
      a = "../webview/webview?op=sli&slideid=" + t;
      console.log(a);
    }
    wx.navigateTo({
      url: a
    });
  },
  adMini: function(a, t) {
    wx.navigateToMiniProgram({
      appId: a,
      path: t,
      success: function(a) {}
    });
  },
  search: function(a) {
    app.siteInfo.uniacid;
    var t = a.detail.value;
    "" != t && wx.navigateTo({
      url: "../search/search?keyword=" + t
    });
  },
  onShareAppMessage: function(a) {
    return {
      title: this.data.sysinfo.name,
      path: "/yyf_company/pages/index/index"
    };
  },
  setTabBar: function() {
    var a, t;
    if (!(n = wx.getStorageSync("barlist"))) return !1;
    this.setData({
        blist: n,
        tcolor: n.tcolor,
        hide_tabbar: n.hide_tabbar
      }), a = "" != n.font_color && "0" != n.font_color ? n.font_color : "#ffffff", t = "" != n.font_color && "0" != n.font_color ? n.head_color : n.tcolor,
      wx.setNavigationBarColor({
        frontColor: a,
        backgroundColor: t
      });
    var e = getCurrentPages(),
      i = e[e.length - 1].route,
      n = this.data.blist,
      r = i.split("/");
    "index" == r[r.length - 1] && (n.isCurrentPage = !0);
    var s = new Array(n.m1_path, n.m2_path, n.m3_path, n.m4_path),
      d = 0;
    for (var o in s) "index" == s[o] && (d = parseInt(o) + 1);
    n.currentNum = d, this.setData({
      blist: n
    });
  },
  tel: function() {
    var a = this.data.blist.phone;
    wx.makePhoneCall({
      phoneNumber: a
    });
  },
  driver: function() {
    wx.openLocation({
      latitude: Number(this.data.blist.jing),
      longitude: Number(this.data.blist.wei),
      address: this.data.blist.address
    });
  },
  navigateMini: function(a) {
    var t = a.currentTarget.dataset.sid,
      e = a.currentTarget.dataset.fid,
      i = this.data.list[e].list[t].appid,
      n = this.data.list[e].list[t].pageaddress;
    wx.navigateToMiniProgram({
      appId: i,
      path: n,
      success: function(a) {}
    });
  },
  playVideo: function(a) {
    var t = a.currentTarget.dataset.fidx,
      e = a.currentTarget.dataset.sidx,
      i = this.data.list;
    i[t].list[e].show_video = !0, this.setData({
      list: i
    });
  },
  navto: function(a) {
    var t = a.currentTarget.dataset.nid,
      e = this.data.cats[t].url;
    if (wx.setStorageSync("navurl", e), "-1" != e.indexOf("https")) e = "../webview/webview?op=nav" + this.data.cats[t].id;
    wx.navigateTo({
      url: e
    });
  },
  ad1nav: function() {
    var a = this.data.adsense.a1urlnew;
    if (wx.setStorageSync("navurl", a), "-1" != a.indexOf("https")) a = "../webview/webview?op=ads1";
    wx.navigateTo({
      url: a
    });
  },
  ad2nav: function() {
    var a = this.data.adsense.a2urlnew;
    if (wx.setStorageSync("navurl", a), "-1" != a.indexOf("https")) a = "../webview/webview?op=ads2";
    wx.navigateTo({
      url: a
    });
  },
  ad3nav: function() {
    var a = this.data.adsense.a3urlnew;
    if (wx.setStorageSync("navurl", a), "-1" != a.indexOf("https")) a = "../webview/webview?op=ads3";
    wx.navigateTo({
      url: a
    });
  },
  tabNav: function(a) {
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
  copy_action: function() {
    var a = this.data.blist.copyright;
    if ("1" == a.copy_kind) {
      var t = a.copy_phone;
      wx.makePhoneCall({
        phoneNumber: t
      });
    }
    if ("2" == a.copy_kind) {
      var e = a.copy_appid,
        i = a.copy_ddress;
      wx.navigateToMiniProgram({
        appId: e,
        path: i,
        success: function(a) {}
      });
    }
  },
  imgError: function() {},
  notice: function(a) {
    wx.showModal({
      title: a,
      content: "",
      success: function(a) {}
    });
  },
  notice1: function(a) {
    wx.showModal({
      title: "",
      content: a,
      success: function(a) {}
    });
  },
  t1: function(a) {
    console.log(a.detail.value), this.setData({
      t1v: a.detail.value
    });
  },
  t2: function(a) {
    this.setData({
      t2v: a.detail.value
    });
  },
  t3: function(a) {
    this.setData({
      t3v: a.detail.value
    });
  },
  t4: function(a) {
    this.setData({
      t4v: a.detail.value
    });
  },
  radioChange: function(a) {
    this.setData({
      rv: a.detail.value
    });
  },
  checkChange: function(a) {
    this.setData({
      cv: a.detail.value
    });
  },
  textareaBlur: function(a) {
    this.setData({
      av: a.detail.value
    });
  },

  submitClick: function(a) {
    var t = !0,
      e = this.data;
    if ("" == e.t1v && "1" == e.form.t1full && "1" == e.form.t1show) return this.notice(e.form.t1name + "不能为空!"),
      t = !1;
    if ("" == e.t2v && "1" == e.form.t2full && "1" == e.form.t2show) return this.notice(e.form.t2name + "不能为空!"),
      t = !1;
    if ("" == e.t3v && "1" == e.form.t3full && "1" == e.form.t3show) return this.notice(e.form.t3name + "不能为空!"),
      t = !1;
    if ("" == e.t4v && "1" == e.form.t4full && "1" == e.form.t4show) return this.notice(e.form.t4name + "不能为空!"),
      t = !1;
    if ("" == e.rv && "1" == e.form.rfull && "1" == e.form.rshow) return this.notice(e.form.rname + "不能为空!"),
      t = !1;
    if ("" == e.cv && "1" == e.form.cfull && "1" == e.form.cshow) return this.notice(e.form.cname + "不能为空!"),
      t = !1;
    if ("" == e.av && "1" == e.form.afull && "1" == e.form.ashow) return this.notice(e.form.aname + "不能为空!"),
      t = !1;
    if (t) {
      var i = app.siteInfo.uniacid,
        n = this;
      app.util.footer(n);
      var r = wx.getStorageSync("sendtime");
      "" == r && (r = 0), app.util.request({
        url: "entry/wxapp/formadd",
        data: {
          m: "yyf_company",
          uniacid: i,
          t1v: n.data.t1v,
          t1name: n.data.form.t1name,
          t2v: n.data.t2v,
          t2name: n.data.form.t2name,
          t3v: n.data.t3v,
          t3name: n.data.form.t3name,
          t4v: n.data.t4v,
          t4name: n.data.form.t4name,
          rv: n.data.rv,
          rname: n.data.form.rname,
          cv: n.data.cv,
          cname: n.data.form.cname,
          av: n.data.av,
          aname: n.data.form.aname,
          sendtime: r
        },
        cachetime: 0,
        success: function(a) {
          if (!a.data.errno)
            if (1 == a.data.errno) n.notice(a.data.message);
            else {
              var t = Date.parse(new Date());
              t /= 1e3, wx.setStorageSync("sendtime", t), n.notice1(n.data.form.successtext);
            }
        }
      });
    }
  }
});