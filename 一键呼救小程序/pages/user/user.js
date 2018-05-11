var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    open: false,
    username: app.data.userinfo.username,
    number: app.data.userinfo.number,
  },
  tap_open: function (e) {
    if (!this.data.open) {
      this.setData({
        open: true
      });
    }
  },
  tap_close: function (e) {
    if (this.data.open) {
      this.setData({
        open: false
      });
    }
  },
  syncope: function () {
    wx.navigateTo({
      url: '../getHelp/getHelp?helpType=syncope',
    })
  },
  seriousInjury: function () {
    wx.navigateTo({
      url: '../getHelp/getHelp?helpType=seriousInjury',
    })
  },
  setting: function () {
    wx.navigateTo({
      url: '../Setting/setting',
    })
  },
  showHelp: function () {
    wx.navigateTo({
      url: '../ShowHelp/showHelp',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (app.data.userinfo.username == null || app.data.userinfo.number == null) {
      wx.navigateTo({
        url: '../StartPage/startPage'
      })
    }
    else {
      this.setData({
        username: app.data.userinfo.username,
        number: app.data.userinfo.number
      });
    }
  },
  logoff: function () {
    wx.showModal({
      title: "提示",
      content: '您真的确定退出吗？',
      showCancel: true,
      success: function (res) {
        if (res.confirm) {
          app.data.userinfo = {
            username: null,
            number: 0,
            key: null,
            sos: -1,
            message: null,
          }
          wx.redirectTo({
            url: '../StartPage/startPage',
          })
        }
      },
    })
  },
  giveAdvice: function () {
    wx.navigateTo({
      url: '../giveAdvice/giveAdvice',
    })
  },
  onUnload:function(){
    this.setData({
      open:false
    })
  },
  onHide:function(){
    this.setData({
      open: false
    })
  },
  onShareAppMessage: function () {
    return {
      title: "一键呼救",
      desc: "一键呼救小程序",
      path: "../startPage/startPage"
    }
  }
})