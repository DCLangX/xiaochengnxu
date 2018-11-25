//获取应用实例
const app = getApp()

Page({
  data: {
    cactive: "",
    loading:true
  },
  onLoad:function(e){
    if (app.globalData.userInfo) {
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
        }
      })
    }
  },
  formSubmit: function (e) {
    var that = this;
    // 读取本地存储信息
    var session = wx.getStorageSync('session');
    var formdata = e.detail.value;
    //console.log(formdata);
    //console.log(that.data.cactive);
    if (formdata.pinglun==""){
      that.messshow("请先添加评论内容！");
    }else{
      wx.request({
        url: app.globalData.requestUrl+"/index/index/infoadd",
        data: {
          pid:"pinglun",
          content: formdata.pinglun,
          openid: session.openid,
          username: app.globalData.userInfo.nickName,
          active: app.globalData.userInfo.avatarUrl
        },
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        method: "POST",
        success: function (result) {
          console.log('评论success', result);
          wx.showModal({
            title: '提示',
            content: "发表成功,点击确定返回上一页！",
            duration: 2000,
            showCancel: false,
            confirmColor: '#4A90E2',
            success:function(){
              setTimeout(function () {
                wx.navigateBack({
                  url: '../index/index'
                })
              },200);
            }
          });
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
      confirmColor: '#4A90E2',
      
    });
  }
});