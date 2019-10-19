var app = getApp(),
  WxParse = require("../../../wxParse/wxParse.js"),
  count = 0;


const util = require('../../../voice/utils/util.js')

const plugin = requirePlugin("WechatSI")

import { language } from '../../../voice/utils/conf.js'
const manager = plugin.getRecordRecognitionManager()

Page({
  properties: {
    /*
    item 格式
    {
      create: '04/27 15:37',
      text: '一二三四五',
      translateText: '12345',
      voicePath: '',
      translateVoicePath: '',
      id: 0,
    },*/
    item: {
      type: Object,
      value: {},
      observer: function (newVal, oldVal) {

        // 翻译完成后，文字有改变触发重新翻译
        if (this.data.recordStatus == 2 && oldVal.text && oldVal.text != '' && newVal.text != oldVal.text) {
          this.triggerEvent('translate', {
            item: this.data.item,
            index: this.data.index,
          })
        }

        // 翻译内容改变触发播放
        if (newVal.autoPlay && newVal.translateVoicePath != oldVal.translateVoicePath) {
          this.autoPlayTranslateVoice()
        } else if (newVal.translateVoicePath == "") {
          this.playAnimationEnd()
        }

      }
    },
    editShow: {
      type: Boolean,
      value: false,
    },
    index: {
      type: Number,
    },

    currentTranslateVoice: {
      type: String,
      observer: function (newVal, oldVal) {
        if (newVal != '' && newVal != this.data.item.translateVoicePath) {
          this.playAnimationEnd()
        }
      },
    },

    recordStatus: {
      type: Number,
      value: 2, // 0：正在识别，1：正在翻译，2：翻译完成
    },
  },
  data: {
    dialogList: [
      // {
      //   // 当前语音输入内容
      //   create: '04/27 15:37',
      //   lfrom: 'zh_CN',
      //   lto: 'en_US',
      //   text: '这是测试这是测试这是测试这是测试',
      //   translateText: 'this is test.this is test.this is test.this is test.',
      //   voicePath: '',
      //   translateVoicePath: '',
      //   autoPlay: false, // 自动播放背景音乐
      //   id: 0,
      // },
    ],
    scroll_top: 10000, // 竖向滚动条位置

    bottomButtonDisabled: false, // 底部按钮disabled

    tips_language: language[0], // 目前只有中文

    initTranslate: {
      // 为空时的卡片内容
      create: '04/27 15:37',
      text: '等待说话',
    },

    currentTranslate: {
      // 当前语音输入内容
      create: '04/27 15:37',
      text: '等待说话',
    },
    recording: false,  // 正在录音
    recordStatus: 0,   // 状态： 0 - 录音中 1- 翻译中 2 - 翻译完成/二次翻译

    toView: 'fake',  // 滚动位置
    lastId: -1,    // dialogList 最后一个item的 id
    currentTranslateVoice: '', // 当前播放语音路径

    article: {},
    copyright: "",
    id: 0,
    blist: {},
    InputBottom: 0,
    tcolor: "",
    hide_time: "0",
    hide_title: "0",
    hide_tabbar: "0",
    isshow: 0,
    stars: [0, 1, 2, 3, 4],
    normalSrc: "../../resource/images/no-star.png",
    selectedSrc: "../../resource/images/full-star.png",
    halfSrc: "../../resource/images/half-star.png",
    key: 5,
    content: "",
    oid: "",
    commentList: {},
    voteArr: [],
    showVoteHoverImg: 0,
    cateSys: {},
    showModalStatus: !1,
    isShow: !1,
    code: "",
    show_share: 0
  },
  onLoad: function(t) {

    this.initRecord()


    this.setData({ toView: this.data.toView })


    app.getRecordAuth()
    this.setData({
      copyright: app.globalData.copyright
    });
    var a = t.id,
      e = this,
      i = app.siteInfo.uniacid;
    this.setData({
      id: a
    });

    var o = new Array();
    (o = wx.getStorageSync("voteArr")) && -1 != o.indexOf(a) && this.setData({
      showVoteHoverImg: 1
    }), app.util.request({
      url: "entry/wxapp/content",
      data: {
        m: "yyf_company",
        id: a,
        uniacid: i
      },
      cachetime: 0,
      success: function(t) {
        t.data.errno || (WxParse.wxParse("article1", "html", t.data.data.content, e, 10),
          e.setData({
            article: t.data.data,
            hide_time: t.data.data.hide_time,
            hide_title: t.data.data.hide_title,
            cateSys: t.data.data.cateSys,
            show_share: t.data.data.show_share
          }), e.setTabBar(a), wx.setNavigationBarTitle({
            title: t.data.data.title
          }));
      }
    }), app.util.request({
      url: "entry/wxapp/TabBar",
      data: {
        m: "yyf_company",
        uniacid: i
      },
      cachetime: 0,
      success: function(t) {
        if (!t.data.errno) {
          var a = wx.getStorageSync("barlist");
          "" != a && a.uptime == t.data.data.uptime || (wx.setStorageSync("barlist", t.data.data),
            e.setTabBar());
        }
      }
    }), app.util.request({
      url: "entry/wxapp/Comment",
      data: {
        m: "yyf_company",
        uniacid: i,
        aid: a,
        op: "list"
      },
      cachetime: 0,
      success: function(t) {
        t.data.errno || e.setData({
          commentList: t.data.data
        });
      }
    });
  },
  onHide: function () {
    this.setHistory()
  },
  bindfollow: function (e) {
    var animation = wx.createAnimation({
      duration: 800,
      timingFunction: 'linear',
    })

    this.animation = animation

    animation.opacity(1).step()

    this.setData({
      animationbuttom: animation.export()
    })

    setTimeout(function () {
      this.setData({
        hidden: true
      })
    }.bind(this), 1000)

  },
  // buttomstart: function () {
  //   var animation = wx.createAnimation({
  //     duration: 1000,
  //     timingFunction: 'ease-in-out',
  //     delay: 100
  //   });
  //   animation.opacity(1).translate(0, -150).step()
  //   this.setData({
  //     buttomani: animation.export()
  //   })
  // },
  /**
   * 按住按钮开始语音识别
   */

  streamRecord: function (e) {
    // console.log("streamrecord" ,e)
    let detail = e.detail || {}
    let buttonItem = detail.buttonItem || {}
    manager.start({
      lang: buttonItem.lang,
    })
    var animationvoice = wx.createAnimation({
      duration: 800,
      timingFunction: 'ease-in-out',
      delay: 100
    });
    animationvoice.opacity(1).translate(0, -30).step()
    this.setData({
      buttomani: animationvoice.export()
    })

    this.setData({
      recordStatus: 0,
      recording: true,
      currentTranslate: {
        // 当前语音输入内容
        create: util.recordTime(new Date()),
        text: '正在聆听中',
        lfrom: buttonItem.lang,
        lto: buttonItem.lto,
      },
    })
    this.scrollToNew();
  },


  /**
   * 松开按钮结束语音识别
   */
  streamRecordEnd: function (e) {

    // console.log("streamRecordEnd" ,e)
    let detail = e.detail || {}  // 自定义组件触发事件时提供的detail对象
    let buttonItem = detail.buttonItem || {}
    // 防止重复触发stop函数
    if (!this.data.recording || this.data.recordStatus != 0) {
      console.warn("has finished!")
      return
    }
    manager.stop()

    this.setData({
      bottomButtonDisabled: true,
    })
  },
  /**
   * 翻译
   */
  translateText: function (item, index) {
    let lfrom = item.lfrom || 'zh_CN'
    let lto = item.lto || 'en_US'

    plugin.translate({
      lfrom: lfrom,
      lto: lto,
      content: item.text,
      tts: true,
      success: (resTrans) => {

        let passRetcode = [
          0, // 翻译合成成功
          -10006, // 翻译成功，合成失败
          -10007, // 翻译成功，传入了不支持的语音合成语言
          -10008, // 翻译成功，语音合成达到频率限制
        ]

        if (passRetcode.indexOf(resTrans.retcode) >= 0) {
          let tmpDialogList = this.data.dialogList.slice(0)

          if (!isNaN(index)) {

            let tmpTranslate = Object.assign({}, item, {
              autoPlay: true, // 自动播放背景音乐
              translateText: resTrans.result,
              translateVoicePath: resTrans.filename || "",
              translateVoiceExpiredTime: resTrans.expired_time || 0
            })

            tmpDialogList[index] = tmpTranslate


            this.setData({
              dialogList: tmpDialogList,
              bottomButtonDisabled: false,
              recording: false,
            })

            this.scrollToNew();

          } else {
            console.error("index error", resTrans, item)
          }
        } else {
          console.warn("翻译失败", resTrans, item)
        }

      },
      fail: function (resTrans) {
        console.error("调用失败", resTrans, item)
        this.setData({
          bottomButtonDisabled: false,
          recording: false,
        })
      },
      complete: resTrans => {
        this.setData({
          recordStatus: 1,
        })
        wx.hideLoading()
      }
    })

  },


  /**
   * 修改文本信息之后触发翻译操作
   */
  translateTextAction: function (e) {
    // console.log("translateTextAction" ,e)
    let detail = e.detail  // 自定义组件触发事件时提供的detail对象
    let item = detail.item
    let index = detail.index

    this.translateText(item, index)



  },

  /**
   * 语音文件过期，重新合成语音文件
   */
  expiredAction: function (e) {
    let detail = e.detail || {}  // 自定义组件触发事件时提供的detail对象
    let item = detail.item || {}
    let index = detail.index

    if (isNaN(index) || index < 0) {
      return
    }

    let lto = item.lto || 'en_US'

    plugin.textToSpeech({
      lang: lto,
      content: item.translateText,
      success: resTrans => {
        if (resTrans.retcode == 0) {
          let tmpDialogList = this.data.dialogList.slice(0)

          let tmpTranslate = Object.assign({}, item, {
            autoPlay: true, // 自动播放背景音乐
            translateVoicePath: resTrans.filename,
            translateVoiceExpiredTime: resTrans.expired_time || 0
          })

          tmpDialogList[index] = tmpTranslate


          this.setData({
            dialogList: tmpDialogList,
          })

        } else {
          console.warn("语音合成失败", resTrans, item)
        }
      },
      fail: function (resTrans) {
        console.warn("语音合成失败", resTrans, item)
      }
    })
  },

  /**
   * 初始化为空时的卡片
   */
  initCard: function () {
    let initTranslateNew = Object.assign({}, this.data.initTranslate, {
      create: util.recordTime(new Date()),
    })
    this.setData({
      initTranslate: initTranslateNew
    })
  },


  /**
   * 删除卡片
   */
  deleteItem: function (e) {
    // console.log("deleteItem" ,e)
    let detail = e.detail
    let item = detail.item

    let tmpDialogList = this.data.dialogList.slice(0)
    let arrIndex = detail.index
    tmpDialogList.splice(arrIndex, 1)

    // 不使用setTImeout可能会触发 Error: Expect END descriptor with depth 0 but get another
    setTimeout(() => {
      this.setData({
        dialogList: tmpDialogList
      })
      if (tmpDialogList.length == 0) {
        this.initCard()
      }
    }, 0)

  },


  /**
   * 识别内容为空时的反馈
   */
  showRecordEmptyTip: function () {
    this.setData({
      recording: false,
      bottomButtonDisabled: false,
    })
    wx.showToast({
      title: this.data.tips_language.recognize_nothing,
      icon: 'success',
      image: '/image/no_voice.png',
      duration: 1000,
      success: function (res) {

      },
      fail: function (res) {
        console.log(res);
      }
    });
  },

  /**
   * 初始化语音识别回调
   * 绑定语音播放开始事件
   */
  initRecord: function () {
    //有新的识别内容返回，则会调用此事件
    manager.onRecognize = (res) => {
      let currentData = Object.assign({}, this.data.currentTranslate, {
        text: res.result,
      })
      this.setData({
        currentTranslate: currentData,
      })
      this.scrollToNew();
    }

    // 识别结束事件
    manager.onStop = (res) => {

      let text = res.result

      if (text == '') {
        this.showRecordEmptyTip()
        return
      }

      let lastId = this.data.lastId + 1

      let currentData = Object.assign({}, this.data.currentTranslate, {
        text: res.result,
        translateText: '正在翻译中',
        id: lastId,
        voicePath: res.tempFilePath
      })

      this.setData({
        currentTranslate: currentData,
        recordStatus: 1,
        lastId: lastId,
      })

      this.scrollToNew();

      this.translateText(currentData, this.data.dialogList.length)
      var animationinput = wx.createAnimation({
        duration: 1000,
        timingFunction: 'ease-in-out',
        delay: 100
      });
      animationinput.opacity(1).translate(0, 100).step()
      this.setData({
        buttomani: animationinput.export()
      })
      var e = this,
        a = app.siteInfo.uniacid,
        i = wx.getStorageSync("comment_sendtime");

      if ("" == i && (i = 0), "" == res.result) return e.notice("评论内容您还没有填写"), !1;
      app.util.request({
        url: "entry/wxapp/Comment",
        data: {
          m: "yyf_company",
          uniacid: a,
          score: e.data.key,
          content: res.result,
          op: "add",
          aid: e.data.id,
          sendtime: i
        },
        cachetime: 0,
        success: function (t) {
          if (!t.data.errno) {
            var a = Date.parse(new Date());
            a /= 1e3, wx.setStorageSync("comment_sendtime", a), "1" == t.data.data.check_comment ? (e.notice("提交成功，请等待管理员审核"),
              e.setData({
                isshow: 0
              })) : (e.setData({
                commentList: t.data.data.commentList
              }), wx.showModal({
                title: "提交成功",
                content: "",
                success: function (t) {
                  e.setData({
                    isshow: 0
                  });
                }
              }));
          }
        }
      });
    }

    // 识别错误事件
    manager.onError = (res) => {

      this.setData({
        recording: false,
        bottomButtonDisabled: false,
      })

    }

    // 语音播放开始事件
    wx.onBackgroundAudioPlay(res => {

      const backgroundAudioManager = wx.getBackgroundAudioManager()
      let src = backgroundAudioManager.src

      this.setData({
        currentTranslateVoice: src
      })

    })
  },

  /**
   * 设置语音识别历史记录
   */
  setHistory: function () {
    try {
      let dialogList = this.data.dialogList
      dialogList.forEach(item => {
        item.autoPlay = false
      })
      wx.setStorageSync('history', dialogList)

    } catch (e) {

      console.error("setStorageSync setHistory failed")
    }
  },

  /**
   * 得到历史记录
   */
  getHistory: function () {
    try {
      let history = wx.getStorageSync('history')
      if (history) {
        let len = history.length;
        let lastId = this.data.lastId
        if (len > 0) {
          lastId = history[len - 1].id || -1;
        }
        this.setData({
          dialogList: history,
          toView: this.data.toView,
          lastId: lastId,
        })
      }

    } catch (e) {
      // Do something when catch error
      this.setData({
        dialogList: []
      })
    }
  },

  /**
   * 重新滚动到底部
   */
  scrollToNew: function () {
    this.setData({
      toView: this.data.toView
    })
  },

  onShow: function () {
    this.scrollToNew();

    this.initCard()

    if (this.data.recordStatus == 2) {
      wx.showLoading({
        // title: '',
        mask: true,
      })
    }

  },
  InputFocus(e) {
    this.setData({
      InputBottom: e.detail.height
    })
  },
  InputBlur(e) {
    this.setData({
      InputBottom: 0
    })
  },
  startRating: function(t) {
    var e = this,
      a = app.siteInfo.uniacid,
      i = wx.getStorageSync("comment_sendtime");
    if ("" == i && (i = 0), "" == e.data.content) return e.notice("评论内容您还没有填写"), !1;
    app.util.request({
      url: "entry/wxapp/Comment",
      data: {
        m: "yyf_company",
        uniacid: a,
        score: e.data.key,
        content: e.data.content,
        op: "add",
        aid: e.data.id,
        sendtime: i
      },
      cachetime: 0,
      success: function(t) {
        if (!t.data.errno) {
          var a = Date.parse(new Date());
          a /= 1e3, wx.setStorageSync("comment_sendtime", a), "1" == t.data.data.check_comment ? (e.notice("提交成功，请等待管理员审核"),
            e.setData({
              isshow: 0
            })) : (e.setData({
            commentList: t.data.data.commentList
          }), wx.showModal({
            title: "提交成功",
            content: "",
            success: function(t) {
              e.setData({
                isshow: 0
              });
            }
          }));
        }
      }
    });
  },
  upvoteAction: function(t) {
    var a = new Array();
    (a = wx.getStorageSync("voteArr")) ? -1 == a.indexOf(this.data.id) ? this.submitUpvote() : this.UpvoteNotice(): this.submitUpvote();
  },
  submitUpvote: function() {
    var i = this,
      t = app.siteInfo.uniacid;
    app.util.request({
      url: "entry/wxapp/Upvote",
      data: {
        m: "yyf_company",
        uniacid: t,
        aid: i.data.id
      },
      cachetime: 0,
      success: function(t) {
        if (!t.data.errno) {
          var a = i.data.article;
          a.vote_num = t.data.data, i.setData({
            article: a,
            showVoteHoverImg: 1
          });
          var e = new Array();
          if (!(e = wx.getStorageSync("voteArr"))) e = new Array();
          e.push(i.data.id), wx.setStorageSync("voteArr", e);
        }
      }
    });
  },
  closeRoom: function() {
    this.setData({
      isShow: !1
    });
  },
  shareaction: function() {
    var a = this,
      t = app.siteInfo.uniacid;
    app.util.request({
      url: "entry/wxapp/CreatCode",
      data: {
        m: "yyf_company",
        uniacid: t,
        aid: a.data.id
      },
      cachetime: 0,
      success: function(t) {
        console.log(t), t.data.errno ? a.notice(t.message) : a.setData({
          isShow: !0,
          showModalStatus: !1,
          code: t.data.data
        });
      }
    });
  },
  UpvoteNotice: function() {
    wx.showToast({
      title: "您已经点赞过了哦！"
    });
  },
  notice: function(t) {
    wx.showModal({
      title: t,
      content: "",
      success: function(t) {}
    });
  },
  onShareAppMessage: function(t) {
    var a = this.data.article;
    return "1" == a.diyshare ? {
      title: a.sharetitle,
      imageUrl: a.shareimg,
      path: "/yyf_company/pages/content/content?id=" + this.data.id
    } : {
      title: this.data.article.title,
      path: "/yyf_company/pages/content/content?id=" + this.data.id
    };
  },
  saveImgAction: function() {
    var a = this;
    wx.getImageInfo({
      src: this.data.code,
      success: function(t) {
        wx.saveImageToPhotosAlbum({
          filePath: t.path,
          success: function(t) {
            a.notice("保存成功"), a.setData({
              isShow: !1
            });
          }
        });
      },
      fail: function(t) {
        a.notice("保存失败，请检查小程序官方后台配置");
      }
    });
  },
  setTabBar: function(t) {
    var a, e;
    if (!(s = wx.getStorageSync("barlist"))) return !1;
    this.setData({
        blist: s,
        tcolor: s.tcolor,
        hide_tabbar: s.hide_tabbar
      }), a = "" != s.font_color ? s.font_color : "#ffffff", e = "" != s.head_color ? s.head_color : s.tcolor,
      wx.setNavigationBarColor({
        frontColor: a,
        backgroundColor: e
      });
    var i = getCurrentPages(),
      o = i[i.length - 1],
      s = this.data.blist;
    o.options.id == t && (s.isCurrentPage = !0);
    var n = new Array(s.m1_path, s.m2_path, s.m3_path, s.m4_path),
      r = 0;
    for (var c in n) n[c] == "a" + t && (r = parseInt(c) + 1);
    s.currentNum = r, this.setData({
      blist: s
    });
  },
  tel: function() {
    var t = this.data.blist.phone;
    wx.makePhoneCall({
      phoneNumber: t
    });
  },
  driver: function() {
    wx.openLocation({
      latitude: Number(this.data.blist.jing),
      longitude: Number(this.data.blist.wei),
      address: this.data.blist.address
    });
  },
  tabNav: function(t) {
    var a = t.currentTarget.dataset.url,
      e = t.currentTarget.dataset.tab;
    if ("-1" != a.indexOf("https")) {
      wx.setStorageSync("navurl", a);
      a = "../webview/webview?op=" + e;
      wx.navigateTo({
        url: a
      });
    } else wx.redirectTo({
      url: a
    });
  },
  copy_action: function() {
    var t = this.data.blist.copyright;
    if ("1" == t.copy_kind) {
      var a = t.copy_phone;
      wx.makePhoneCall({
        phoneNumber: a
      });
    }
    if ("2" == t.copy_kind) {
      var e = t.copy_appid,
        i = t.copy_ddress;
      wx.navigateToMiniProgram({
        appId: e,
        path: i,
        success: function(t) {}
      });
    }
  },
  selectLeft: function(t) {
    var a = t.currentTarget.dataset.key;
    .5 == this.data.key && .5 == t.currentTarget.dataset.key && (a = 0), count = a,
      this.setData({
        key: a
      });
  },
  selectRight: function(t) {
    var a = t.currentTarget.dataset.key;
    count = a, this.setData({
      key: a
    });
  },
  hideComment: function() {
    this.setData({
      isshow: 0
    });
  },
  showComment: function() {
    this.setData({
      isshow: 1
    });
  },
  textareaBlur: function(t) {
    this.setData({
      content: t.detail.value
    });
  },
  powerDrawer: function(t) {
    var a = t.currentTarget.dataset.statu;
    this.util(a);
  },
  util: function(t) {
    var a = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    });
    (this.animation = a).translateY(240).step(), this.setData({
      animationData: a.export()
    }), setTimeout(function() {
      a.translateY(0).step(), this.setData({
        animationData: a
      }), "close" == t && this.setData({
        showModalStatus: !1
      });
    }.bind(this), 200), "open" == t && this.setData({
      showModalStatus: !0
    });
  }
});