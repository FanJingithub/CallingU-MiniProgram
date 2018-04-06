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
  syncope:function(){
    wx.getLocation({
      type: "gcj02",//坐标类型
      //获取经纬度成功回调
      success: (res) => {
        this.setData({
          longitude: res.longitude,
          latitude: res.latitude
        });
        wx.request({
          url: "https://118.89.111.214:6666/api/get-help",
          data: {
            number: this.data.number,
            latitude: this.data.latitude,
            longitude: this.data.longitude,
            sos: 1,
            state: 0//state表示c端在求救。 
          },
          method: "POST",
          success: function (res) {
            if (res.data != "002" || res.data.wrong != 1) {

            }
          }
        })
      }
    })
  },
  getHurt:function(){
    wx.getLocation({
      type: "gcj02",//坐标类型
      //获取经纬度成功回调
      success: (res) => {
        this.setData({
          longitude: res.longitude,
          latitude: res.latitude
        });
        wx.request({
          url: "https://118.89.111.214:6666/api/get-help",
          data: {
            number: this.data.number,
            latitude: this.data.latitude,
            longitude: this.data.longitude,
            sos: 1,
            state: 0//state表示c端在求救。 
          },
          method: "POST",
          success: function (res) {
            if (res.data != "002" || res.data.wrong != 1) {
              
            }
          }
        })
      }
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
    app.appData.userinfo = {
      username: null,
      number: 0,
      key: null,
      sos: -1,
      message: null,
    }
    wx.navigateTo({
      url: '../StartPage/startPage',
    })
  },

onShow:function(){
    this.setData({
      username: app.appData.userinfo.username,
      number: app.appData.userinfo.number,
      longitude:0,
      latitude:0
    })
},

})