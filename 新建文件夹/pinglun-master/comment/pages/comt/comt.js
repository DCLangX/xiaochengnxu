//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    id:null,
    loading:false
  },
  onLoad: function (e) {
    //console.log(e);
    var that = this;
    that.setData({
      id:e.id
    })
    console.log(that.data.id);

    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  toAdd: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  formSubmit: function (e) {
    var that = this;
    var formdata = e.detail.value;
    console.log(formdata);
    if (!formdata.reply) {
      that.messshow("请先添加回复内容！");
    } else {
      wx.request({
        url: app.globalData.requestUrl,
        data: {
          pinglun: formdata
        },
        success: function (result) {
          wx.showToast({
            title: '发表成功',
            icon: 'success',
            mask: true,
            duration: duration
          })
          that.setData({
            loading: false
          })
          console.log('request success', result)
        },
        fail: function ({ errMsg }) {
          console.log('request fail', errMsg)
          that.setData({
            loading: false
          })
        }
      })
    }
  },
  messshow: function (msg) {
    wx.showModal({
      title: '提示',
      content: msg,
      duration: 2000,
      showCancel: false,
      confirmColor: '#4A90E2'
    });
  }
})
