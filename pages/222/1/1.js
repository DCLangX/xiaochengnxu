// pages/组件和数据绑定和事件/1/1.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    ttt:{
      type:String
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    dianji:function(){
      this.triggerEvent('like', {
        id: this.properties.ttt,
        cd: 'ww'
      }, {})
    }
  }
})
