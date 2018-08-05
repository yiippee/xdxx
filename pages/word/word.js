const util = require("../../utils/util.js");
//获取应用实例
var app = getApp()
var page = 1;//页码

Page({
  data: {
    list: [],
    maxtime: '',
    loadingHidden: false,
    userInfo: '',
    type: 29
  },
  onLoad: function (options) {
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
        //更新数据
        that.setData({
            userInfo: userInfo
        })
    })

    // 页面初始化 options为页面跳转所带来的参数
    //加载最新
    this.requestData('newlist');
    console.log("---", this.data.lzb)
  },

  /**
   * 上拉刷新
   */
  bindscrolltoupper: function () {
    //加载最新
    // this.requestData('newlist');
    console.log("---上拉刷新---")
  },

  /**
   * 加载更多
   */
  bindscrolltolower: function () {
    console.log('到底部')
    //加载更多
    this.requestData('list');
  },

  //加载更多操作
  loadMoreData: function () {
        console.log("加载更多");
        //加载提示框
        util.showLoading();

        var that = this;
        var parameters = 'a=list&c=data&type=' + this.type + "&page=" + (page + 1) + "&maxtime=" + this.getMaxtime();
        console.log("parameters = " + parameters);
        util.request(parameters, function (res) {
            page += 1;
            that.setMoreDataWithRes(res, that);
            // 需要设置刷新超时函数，超时后需要执行stopPullDownRefresh
            setTimeout(function () {
                util.hideToast();
                wx.stopPullDownRefresh();
            }, 1000);
        });
    },

  /**
   * 请求数据
   */
  requestData: function (a) {
    //加载提示框
    util.showLoading();

    var that = this;
    console.log(that.data.maxtime)
    console.log("---打印a--", a)

    wx.request({
      url: 'http://api.budejie.com/api/api_open.php',
      data: {
        a: a,
        c: 'data',
        maxtime: that.data.maxtime,
        type: '29',
      },
      method: 'GET',
      success: function (res) {
        console.log(res)
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
      },
    })
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
      console.log("---页面显示---")
  },
  onHide: function () {
    // 页面隐藏
      console.log("---页面隐藏---")
  },
  onUnload: function () {
    // 页面关闭
      console.log("---页面关闭---")
  },

    /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
    onPullDownRefresh: function () {
        console.log("---下拉刷新---");
        this.requestData('newlist');
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
        console.log("---触及底部刷新---")
        this.loadMoreData()
    },

    //点击赞按钮。图片上面添加catchtap事件就可以调用点击事件了。感觉所有的组件都有这个catchtap属性，不会上抛事件。
    zanEvent: function (e) {
        console.log("------赞-------");
        console.log(e);
        var item_id = e.currentTarget.id;//此处找到列表的id
        console.log(item_id);//列表id
        //this.zan(item_id);
    },
})