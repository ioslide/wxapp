var app = getApp(), WxParse = require("../../../wxParse/wxParse.js"), count = 0;

Page({
    data: {
        article: {},
        copyright: "",
        id: 0,
        blist: {},
        tcolor: "",
        hide_time: "0",
        hide_title: "0",
        hide_tabbar: "0",
        isshow: 0,
        stars: [ 0, 1, 2, 3, 4 ],
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
        console.log(t.scene), this.setData({
            copyright: app.globalData.copyright
        });
        var a = t.id, e = this, i = app.siteInfo.uniacid;
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
                t.data.errno || (e.setTabBar(a), WxParse.wxParse("article1", "html", t.data.data.content, e, 10), 
                e.setData({
                    article: t.data.data,
                    hide_time: t.data.data.hide_time,
                    hide_title: t.data.data.hide_title,
                    cateSys: t.data.data.cateSys,
                    show_share: t.data.data.show_share
                }), wx.setNavigationBarTitle({
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
    startRating: function(t) {
        var e = this, a = app.siteInfo.uniacid, i = wx.getStorageSync("comment_sendtime");
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
        (a = wx.getStorageSync("voteArr")) ? -1 == a.indexOf(this.data.id) ? this.submitUpvote() : this.UpvoteNotice() : this.submitUpvote();
    },
    submitUpvote: function() {
        var i = this, t = app.siteInfo.uniacid;
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
            path: "/yyf_company/pages/video/video?id=" + this.data.id
        };
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
        var i = getCurrentPages(), o = i[i.length - 1], s = this.data.blist;
        o.options.id == t && (s.isCurrentPage = !0);
        var n = new Array(s.m1_path, s.m2_path, s.m3_path, s.m4_path), r = 0;
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
        var a = t.currentTarget.dataset.url, e = t.currentTarget.dataset.tab;
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
            var e = t.copy_appid, i = t.copy_ddress;
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
    shareaction: function() {
        var a = this, t = app.siteInfo.uniacid;
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
    },
    closeRoom: function() {
        this.setData({
            isShow: !1
        });
    }
});