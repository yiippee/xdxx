//index.js
//获取应用实例
var app = getApp()
Page({
    data:
        {
            motto1: '点击进入小道消息', // 入口标题
            userInfo: {}
        },
    onLoad: function () {
        var that = this
        //调用应用实例的方法获取全局数据
        app.getUserInfo(function (userInfo) {
            console.log("--userinfo:", userInfo)
            //更新数据
            that.setData({
                userInfo: userInfo
            })
        })
        //console.log("---login userinfo:", userInfo)
        that.locationWb();
    },

    // 点击进入登录日志
    bindLogs: function () {
        wx.navigateTo({
            url: '../logs/logs'
        })
    },

    // 点击进入微博友圈
    locationWb1: function () {
        var that = this
        var Interval = setInterval(function () {
            that.bindLoding()
            if (app.userId != null) {
                clearInterval(Interval)
                that.locationWb()
            }
        }, 1000)
    },
    locationWb: function () {
        var userId = app.userId
        console.debug(userId)
        wx.switchTab({
            url: "../hot/hot" // 跳转到热点
        })
        //wx.navigateTo({
            //url: '../main/main?state=0' + '&userId=' + userId
            //url: "../index/index"
        //})
    },
    bindLoding: function () { // LOADING加载
        wx.showToast({
            title: '跳转中',
            icon: 'loading'
        })
    },

    // 绑定获取用户信息函数
    bindGetUserInfo: function (e) {
        console.log("--event:", e)
        var that = this;
        if (e.detail.userInfo) {
            // 发送 res.code 到后台换取 openId, sessionKey, unionId
            wx.login({
                success: res => {
                    console.log(res.code, e.detail.iv, e.detail.encryptedData)
                    wx.switchTab({
                        url: "../word/word"
                    })
                }
            })
        } else {
            console.log(333, '执行到这里，说明拒绝了授权')
            wx.showToast({
                title: "为了您更好的体验,请先同意授权",
                icon: 'none',
                duration: 2000
            });
        }
    },

    // 本地缓存token
    token: function() {
        const code = wx.login();
        if (code) {//code存在
            //从小程序的本地中获取toten
            const token = wx.getStorageSync('xxxxxtoken')
            if (token) {//小程序本地存有token,无需弹出授权界面
                //直接传入code字段，调用应用服务器的验证token的方法,如果校验成功，需要返回用户信息。
                const userinfo = wx.request("http:");
                if (userinfo) {
                    //说明登录成功,直接进入小程序的主界面。
                }
            }
            else {
                //说明小程序本地没有token,这个时候需要弹出授权界面，让微信用户决定是否访问小程序，如果用户选择是的话。
                const weixinuserinfo = wx.getUserInfo();//会弹出授权界面,微信提供的
                if (weixinuserinfo) {
                    //生成或者验证token
                    const userinfo = wx.request("http://xxxxxValidateToken(code )");

                    const token = userinfo.getToken();
                    //将token存储到小程序本地
                    wx.setStorageSync('xxxxxtoken', token)
                }
            }
        }
    }
})
