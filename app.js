//app.js
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
  getUserInfo:function(cb){
    var that = this;
    console.log("----globalData:", this.globalData.userInfo)
    if(this.globalData.userInfo){
      console.log("---null");
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      console.log("//调用登录接口");
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              console.log("---res---:", res)
              that.globalData.userInfo = res.userInfo;
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      });
    }
  },
  // 定义了全局的数据，微信登录者的用户信息
  globalData:{
    userInfo:null
  }
})



