var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    scale:18,//缩放级别，默认为18，数值在0-18之间
    latitude:0,//默认值
    longitude:0//默认值
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getLocation({
      type:"gcj02",//坐标类型
      //获取经纬度成功回调
      success: (res)=>{
        this.setData({
          longitude:res.longitude,
          latitude:res.latitude
        });
        console.log(this.latitude);
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

})