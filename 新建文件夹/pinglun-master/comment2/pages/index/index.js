//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    hasPinglun: false,
    showall: false,
    showPinglun: false,
    comments: [],
    huifuid:"",
    huifucid:"",
    newcon:""
  },
  onLoad: function () {
    var that = this;
    if (app.globalData.userInfo) {
      var userInfo = this.data.userInfo;
      that.setData({
        userInfo: app.globalData.userInfo,
      });
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
        }
      })
    }
    this.ajaxComts();
  },
  onShow: function () {
    this.onLoad();
  },

  hflz: function () {
    
  },
  toComment: function () {
    var that = this;
    var showPinglun = that.data.showPinglun;
    that.setData({
      showPinglun: !showPinglun,
    });
  },
  hiddenHflz: function (e) {
    var that = this;
    var id = e.currentTarget.dataset.id;
    var comments = that.data.comments;
    comments[id].hflz = !comments[id].hflz;
    that.setData({
      comments: comments
    });
  },
  hiddenHfcz: function (e) {
    var that =this;
    var pid = e.currentTarget.dataset.pid;
    var id = e.currentTarget.dataset.id;
    var comments = that.data.comments;
    comments[pid].children[id].hflz = !comments[pid].children[id].hflz;
    that.setData({
      comments: comments
    });
  },
  //文本域失去焦点时 事件处理
  textAreaBlur: function (e) {
    //获取此时文本域值
    console.log(e.detail.value)
    this.setData({
      newcon: e.detail.value
    })
  },
  send: function (e) {
    var that = this;
    var comments = that.data.comments;
    var active = that.data.userInfo;
    console.log(active);
    console.log(that.data.newcon);
    读取本地存储信息
    var session = wx.getStorageSync('session');
    setTimeout(function () {
      if (that.data.newcon.trim().length > 0) {
        wx.request({
          url: app.globalData.requestUrl + "/index/index/infoadd",
          data: {
            cid: that.data.huifucid,
            openid: session.openid,
            content: that.data.newcon,
            username: app.globalData.userInfo.nickName,
            active: app.globalData.userInfo.avatarUrl
          },
          header: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          method: "POST",
          success: function (result) {
            console.log('request success', result);
            wx.showModal({
              title: '提示',
              content: "回复成功！",
              duration: 2000,
              showCancel: false,
              confirmColor: '#4A90E2',
              success: function () {
                that.onLoad();
              }
            });
          },
          fail: function ({ errMsg }) {
            console.log('request fail', errMsg)
          }
        })
        that.setData({
          showPinglun: false,
          newcon: "",
          huifuid: "",
          huifucid: ""
        })
      } else {
        that.setData({
          showPinglun: false,
          newcon: "",
          huifuid: "",
          huifucid: ""
        })
      }
    }, 100)
  },
  quxiao:function(){
    this.setData({
      showPinglun: false,
      newcon: "",
      huifuid: "",
      huifucid: ""
    })
  },
  toAdd: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  ajaxComts: function (e) {
    var that = this;
    wx.request({
      url: app.globalData.requestUrl,
      data: {},
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      success: function (result) {
        console.log('request success', result);
        console.log(result.data);
        if (result.data) {
          result.data.map((item)=>{
            item.hflz=true;
            item.children.map((index)=>{
              index.hflz=true;
            })
          })
          that.setData({
            comments: result.data,
            hasPinglun: true
          })
        } else {
          that.setData({
            hasPinglun: false
          })
        }
      },
      fail: function ({ errMsg }) {
        console.log('request fail', errMsg)
      }
    })
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
