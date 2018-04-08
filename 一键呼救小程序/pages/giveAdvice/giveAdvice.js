var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    adviceText:null,
  },
  textareaSubmit:function(e){
    this.setData({
      advice:e.detail.value.adviceTextarea,
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})