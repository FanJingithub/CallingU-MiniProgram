var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    adviceText:null,
    clicked:false
  },
  textareaSubmit:function(e){
    this.setData({
      adviceText:e.detail.value.adviceTextarea,
      clicked:true
    })
    wx.request({
      url: "https://www.xiaobenji.net/api/feedback",
      data: {
        "number": app.appData.userinfo.number,
        "plaintext":this.data.adviceText,
      },
      method: "POST",
      success: function (res) {
        if (res.statusCode == "200") {
          wx.showModal({
            title: "感谢",
            content: '您的建议对我们非常重要！',
            showCancel: false
          })
        }
      }
    });
    this.setData({
      clicked: false
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})