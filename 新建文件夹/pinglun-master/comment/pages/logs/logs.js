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
  // chooseImage: function (e) {
  //   var that = this;
  //   //console.log(that.data.files.length);
  //   if (!that.data.cactive){
  //     // 读取本地存储信息
  //     var session = wx.getStorageSync('session');
  //     wx.chooseImage({
  //       sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
  //       sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
  //       success: function (res) {
  //         // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
  //         that.setData({
  //           cactive: res.tempFilePaths[0]
  //         });
  //         wx.uploadFile({
  //           url: app.globalData.requestUrl + "/index/index/infoadd",
  //           filePath: res.tempFilePaths[0],
  //           name: 'cactive',
  //           method:"POST",
  //           formData: {
  //             pid: 0,
  //             openid: session.openid,
  //             username: app.globalData.userInfo.nickName,
  //             active: app.globalData.userInfo.avatarUrl
  //           },
  //           // header: {
  //           //   "Content-Type": "applciation/json"
  //           // },
  //           // header: { "Content-Type": "multipart/form-data" },
  //           header: {
  //             "Content-Type": "multipart/form-data",
  //             'accept': 'application/json',
  //           },
  //           success: function (result) {
  //             console.log(result);
  //             // var resultData = JSON.parse(result.data)
  //             // console.log(resultData.data.url);
  //           },
  //           fail: function (e) {
  //             console.log(e);
  //           }
  //         })
  //       }
  //     })
  //   }else{
  //     that.messshow("只能上传1张图片!");
  //   }
  // },
  formSubmit: function (e) {
    var that = this;
    // 读取本地存储信息
    var session = wx.getStorageSync('session');
    var formdata = e.detail.value;
    //console.log(formdata);
    //console.log(that.data.cactive);
    if (formdata.pinglun=="" &&that.data.cactive==""){
      that.messshow("请先添加评论内容！");
    }else{
      wx.request({
        url: app.globalData.requestUrl+"/index/index/infoadd",
        data: {
          pid:"pinglun",
          content: formdata.pinglun,
          openid: session.openid,
          // cactive: that.data.cactive[0],
          username: app.globalData.userInfo.nickName,
          active: app.globalData.userInfo.avatarUrl
        },
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        method: "POST",
        success: function (result) {
          console.log('request success', result);
          that.messshow();
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