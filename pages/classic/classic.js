// pages/classic/classic.js
import {HTTP} from '../../utils/http.js'
import {LikeModel} from '../../models/classic/like.js'
let likeModel = new LikeModel()
let http = new HTTP();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    http.request({
      url:'classic/latest',
      success:(res)=>{
        this.setData({
          classicData:res
        })
      }
    })
  },
  onlike: function(e){
    let behavior = e.detail.behavior;
    likeModel.like(behavior, this.data.classicData.id, this.data.classicData.type)
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})