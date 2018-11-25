//app.js
App({
  onLaunch: function () {
    var that = this;

    that.getUserSessionKey();
    wx.checkSession({
      success: function () {
        //session 未过期，并且在本生命周期一直有效
        console.log("未过期");
      },
      fail: function () {
        //登录态过期,重新获取数据
        console.log("登录态过期");
        that.getUserSessionKey();
      }
    })
    that.getUserInfo();
  },
  getUserInfo:function() {
    var that = this;
    // 获取用户信息
    if (that.globalData.userInfo) {
      that.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          that.globalData.userInfo = res.userInfo
        }
      })
    }
  },
  getUserSessionKey:function(){
    var that = this;
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        console.log(res);
        wx.request({
          url: that.globalData.requestUrl + "/index/index/doadd",
          data: {
            code: res.code
          },
          header: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          method: "POST",
          success: function (result) {
            console.log('success', result);
            //初始化数据
            var content = result.data.content;
            // 展示本地存储能力
            wx.setStorageSync('session', content);
            that.globalData.userInfo['session_key'] = content.session_key;
            that.globalData.userInfo['openid'] = content.openid;
          },
          fail: function ({ errMsg }) {
            console.log('fail', errMsg)
          }
        })
      }
    })
  },
  globalData: {
    userInfo: null,
    requestUrl:"https://www.sdfunuo.top"
  }
})