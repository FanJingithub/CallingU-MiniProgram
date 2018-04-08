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
      }
    })
    wx.request({
      url: "https://118.89.111.214:2333/api/get-help",
      data: {
        "number": this.data.number,
       "latitude": this.data.latitude,
        "longitude": this.data.longitude,
        "sos": 1,
       " state": 0//state表示c端在求救。 
      },
      method: "POST",
      success: function (res) {
        if (res.data != "002" || res.data.wrong != 1) {

        }
      }
    })
  },
  // 页面显示
  onShow: function () {
    // 1.创建地图上下文，移动当前位置到地图中心
    this.mapCtx = wx.createMapContext("getHelpMap"); // getHelpMap是地图组件的id
    this.mapCtx.moveToLocation(); // 定位函数，移动位置到地图中心
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

})