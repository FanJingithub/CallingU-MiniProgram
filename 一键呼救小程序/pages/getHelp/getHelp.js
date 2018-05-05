var app=getApp();
const myAudio = wx.createInnerAudioContext();
/*var qqmapsdk;
var varMarkers=[];
var QQMapWX = require('../../utils/qqmap-wx-jssdk1.0/qqmap-wx-jssdk.min.js');*/
Page({
  /**
   * 页面的初始数据
   */
  data: {
    scale:18,//缩放级别，默认为18，数值在0-18之间
    latitude:0,//默认值
    longitude:0,//默认值
    helpType:"无",
    helpMessage:'\n暂时未发现救助人员',
    markers:[]
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (query) {
    var that = this;
    myAudio.src = "https://www.xiaobenji.net/static/music/notificationsound.mp3";
    myAudio.loop = true;
    myAudio.obeyMuteSwitch = true;
    myAudio.volume = 0.8;
    myAudio.onError((res) => {
      console.log("myAudio is error");
      console.log(res.errMsg);
      console.log(res.errCode);
    });
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
    var helptype = query.helpType =="syncope"? "突然晕厥":"严重外伤";
    this.setData({
      helpType:helptype
    });
    wx.request({
      url: "https://www.xiaobenji.net/api/get-help",
      header: {
        'content-type': 'application/x-www-form-urlencoded',// 表单
        "cookie": wx.getStorageSync("sessionid"),
      },
      data: {
        "number": this.data.number,
        "latitude": this.data.latitude,
        "longitude": this.data.longitude,
        "sos": 1,
        " state": 0,//state表示c端在求救。 
      },
      method: "POST",
      success: (res)=> {
        if (res.statusCode == "200") {
          wx.showModal({
            title: "提示",
            content: '求救信息已经发出，请等待救援!',
            showCancel: false,
          }); 
          /*markers.push({
            iconPath: "../images/rescuer.png",
            id: 0,
            latitude: res.data.latitude,
            longitude: res.data.longitude,
            width: 50,
            height: 50
          })*/
        }
      }
    }); 
    var getNearHospitalAndAED = require('../../utils/getNearHospitalAndAED.js');
   getNearHospitalAndAED.getNearHospitalAndAED(function(res){
      that.setData({
        markers: res
      })
      console.log(that.data.markers);
    });
   
 /*   var markers = getNearHospitalAndAED.getNearHospitalAndAED();
   
   that.setData({
      markers: markers
    })
   console.log(markers);
    console.log(that.data.markers);*/
  },
  // 页面显示
  onShow: function () {
    var that = this;
   
    myAudio.play();
    // 创建地图上下文，移动当前位置到地图中心
    that.mapCtx = wx.createMapContext("getHelpMap"); // getHelpMap是地图组件的id
    that.mapCtx.moveToLocation(); // 定位函数，移动位置到地图中心
  },
  cancel:function(){
    wx.request({
      url: 'https://www.xiaobenji.net/api/report-state-changed',
      header: {
        'content-type': 'application/x-www-form-urlencoded',// 表单
        "cookie": wx.getStorageSync("sessionid"),
      },
      data: {
        "number": this.data.number,
        "target": null,
        " state": -1,//state表示c端无求救。
        "phonestate": 0
      },
      method: "POST",
      success: function (res) {
        myAudio.stop();
        wx.showModal({
          title: "提示",
          content: '已成功取消救援!',
          showCancel: false,
        })
      }
    })
  }
})