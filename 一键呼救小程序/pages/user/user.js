var app=getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    open:false,
    username: app.appData.userinfo.username,
    number: app.appData.userinfo.number,
    longitude:0,
    latitude:0
  },
  tap_open: function (e) {
    if (!this.data.open) {
      this.setData({
        open: true
      });
    }
  },
tap_close:function(e){
  if(this.data.open){
    this.setData({
      open:false
    });
  }
},
 
  getHurt:function(){
    wx.navigateTo({
      url: '../getHelp/getHelp',
    })
  },
  setting:function(){
    wx.navigateTo({
      url: '../Setting/setting',
    })
  },
  showHelp:function(){
    wx.navigateTo({
      url: '../ShowHelp/showHelp',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (app.appData.userinfo.username==null){
      wx.navigateTo({
        url: '../StartPage/startPage'
      })
    }
     else {
      this.setData({ 
        username: app.appData.userinfo.username,
        number:app.appData.userinfo.number
         });
    }
  },
  logoff:function(){
    wx.showModal({
      title: "提示",
      content: '您真的确定退出吗？',
      showCancel: true,
      success:function(res){
        if(res.confirm){
          app.appData.userinfo = {
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
giveAdvice:function(){
  wx.navigateTo({
    url: '../giveAdvice/giveAdvice',
  })
},
onShow:function(){
    this.setData({
      open:false,
      username: app.appData.userinfo.username,
      number: app.appData.userinfo.number,
      longitude:0,
      latitude:0
    })
},

})