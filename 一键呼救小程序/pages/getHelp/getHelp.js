var app = getApp();
const myAudio = wx.createInnerAudioContext();
var interval;
var getAllLocation = require('../../utils/getAllLocation.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    scale: 16,//缩放级别，默认为18，数值在0-18之间
    latitude: 0,//默认值
    longitude: 0,//默认值
    helpType: "无",
    helpMessage: '\n暂时未发现救助人员',
    markers: [],
    circles: [],
    number: app.data.userinfo.number
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
    var helptype = query.helpType == "syncope" ? "突然晕厥" : "严重外伤";
    that.setData({
      helpType: helptype
    });
  },
  // 页面显示
  onShow: function () {
    myAudio.play();
    // 创建地图上下文，移动当前位置到地图中心
    this.mapCtx = wx.createMapContext("getHelpMap"); // getHelpMap是地图组件的id
    this.mapCtx.moveToLocation(); // 定位函数，移动位置到地图中心 
  },
  onReady:function(){
    var that = this;
     interval= setInterval(function(){
        getAllLocation.getAllLocation(that);
      },10000);
  },
  cancel: function () {
    var that = this;
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
        wx.showModal({
          title: "提示",
          content: '已成功取消救援!',
          showCancel: false,
        });
        myAudio.stop();
        clearInterval(interval);
      }
    })
  },
  onShareAppMessage: function () {
    return {
      title: "一键呼救",
      desc: "一键呼救小程序",
      path: "../startPage/startPage",
      imageUrl: "../images/log.png"
    }
  }
})