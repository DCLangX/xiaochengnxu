//获取应用实例
const app = getApp()

Page({
  data: {
    files: [],
    loading:true,
    requestUrl:""
  },
  chooseImage: function (e) {
    var that = this;
    //console.log(that.data.files.length);
    if (that.data.files.length<9){
      wx.chooseImage({
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function (res) {
          // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
          that.setData({
            files: that.data.files.concat(res.tempFilePaths)
          });
        }
      })
    }else{
      that.messshow("最多只能上传9张图片!");
    }
  },
  previewImage: function (e) {
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: this.data.files // 需要预览的图片http链接列表
    })
  },
  formSubmit: function (e) {
    var that = this;
    var formdata = e.detail.value;
    console.log(formdata);
    console.log(that.data.files);
    if (!formdata.pinglun || that.data.files){
      that.messshow("请先添加评论内容！");
    }else{
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
});