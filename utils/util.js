function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds();


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

//loading提示
function showLoading(title = "请稍后", duration = 1000) {
    wx.showToast({
        title: title,
        icon: 'loading',
        duration: (duration <= 0) ? 5000 : duration
    });
}

//隐藏提示框
function hideToast() {
    wx.hideToast();
}

//网络请求
function request(parameters = "", success, method = "GET", header = {}) {
    wx.request({
        url: config.BaseURL + (method == "GET" ? "?" : "") + parameters,
        data: {},
        method: method, // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        header: header ? header : "application/json", // 设置请求的 header
        success: function (res) {
            console.log(res);
            success(res);
        },
        fail: function () {
            // fail
        },
        complete: function () {
            // complete
        }
    })
}

// 导出该包中提供给外部使用的函数
module.exports = {
  formatTime: formatTime,
  showLoading: showLoading,
    request: request,
    hideToast: hideToast,
}
