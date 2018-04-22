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
    });
    wx.getSystemInfo({ // 系统API,获取系统信息，比如设备宽高
      success: (res) => {
        console.log("设置icon");
        this.setData({
          // 定义控件数组，可以在data对象初始化为[],也可以不初始化，取决于是否需要更好的阅读
          controls: [{
            id: 1, // 给控件定义唯一id
            iconPath: '../images/getHelp.png', // 控件图标
            position: { // 控件位置
              left: res.windowWidth/2 - 45, // 单位px
              top: res.windowHeight - 100, // 根据设备高度设置top值，可以做到在不同设备上效果一致
              width: 90, // 控件宽度/px
              height: 90 // 控件高度/px
            },
            clickable: true // 是否可点击，默认为true,可点击
          } ]
        })
         }
    })
  },
  // 页面显示
  onShow: function () {
    // 1.创建地图上下文，移动当前位置到地图中心
    this.mapCtx = wx.createMapContext("getHelpMap"); // getHelpMap是地图组件的id
    this.mapCtx.moveToLocation(); // 定位函数，移动位置到地图中心
  },
 callForHelp:function(e){
   switch(e.controlId){
     case 1:
       wx.request({
         url: "https://118.89.111.214:2333/api/get-help",
         header: {
           'content-type': 'application/x-www-form-urlencoded',// 表单
           "cookie": wx.getStorageSync("sessionid"),
         },
         data: {
           "number": this.data.number,
           "latitude": this.data.latitude,
           "longitude": this.data.longitude,
           "sos": 1,
           " state": 0//state表示c端在求救。 
         },
         method: "POST",
         success: function (res) {
           if (res.statusCode != "200" || res.data.wrong != 1) {

           } 
         }
       });
       break;
   }
 
 }
})