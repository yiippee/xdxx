const util = require("../../utils/util.js");
//获取应用实例
var app = getApp()

Page({
    data: {
        list: [],
        maxtime: '',
        loadingHidden: false
    },
    onLoad: function (options) {
        var that = this
        //调用应用实例的方法获取全局数据
        app.getUserInfo(function (userInfo) {
            //更新数据
            that.setData({
                userInfo: userInfo // 更新此页面的用户信息
            })
            console.log("user info:", app.globalData.userInfo)
        })
        // 页面初始化 options为页面跳转所带来的参数
        this.requestData('newlist');
    },

    /**
     * 视频格式出错
     */
    error: function (e) {
        console.log("---video error---")
        console.log(e.detail);
    },

    /**
   * 滚动到底部时加载下一页
   */
    bindscrolltolower: function () {
        console.log('到底部')
        this.requestData('list');
    },

    /**
     * 加载数据
     */
    requestData: function (a) {
		//加载提示框
		util.showLoading();
	
        var that = this;
        wx.request({
            url: 'http://api.budejie.com/api/api_open.php',
            data: {
                a: a,
                c: 'data',
                // 上一页的maxtime作为加载下一页的条件，
                maxtime: this.data.maxtime,
                type: '41',
            },
            method: 'GET',
            success: function (res) {
                console.log('---get res---:', res)
                console.log('上一页', that.data.list)
                that.setData({
                    // 拼接数组
                    list: that.data.list.concat(res.data.list),
                    loadingHidden: true,
                    maxtime: res.data.info.maxtime
                });
				// 需要设置刷新超时函数，超时后需要执行stopPullDownRefresh
				setTimeout(function () {
					util.hideToast();
					wx.stopPullDownRefresh();
				}, 1000);
            }
        })
    },

    //视频结束播放
    videoEndPlay: function (obj) {
        this.videoContext.seek(0);
    },
    // 点击视频
    tapVideo: function (obj) {
        console.log("---tapVideo:", obj)
    },
    onReady: function () {
        // 页面渲染完成
    },
    onShow: function () {
        // 页面显示
    },
    onHide: function () {
        // 页面隐藏
    },
    onUnload: function () {
        // 页面关闭
    },
	/**
   * 页面相关事件处理函数--监听用户下拉动作
   */
    onPullDownRefresh: function () {
        console.log("---下拉刷新---");
        this.requestData('newlist');
    },
})