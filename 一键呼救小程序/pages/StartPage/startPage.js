var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    username:app.appData.userinfo.username,
    number: app.appData.userinfo.number,
    code: null,
    password: null,
    key: null,
    sendCode: "获取验证码",
    disabled: false
  },
  /*获取验证码*/
  getCode: function () {
    var getCodefun = require('../../utils/getCode.js');
    var that = this;
    //获取验证码
    getCodefun.getCode(that);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {

  },
  logIn:function(){
    app.appData.userinfo.username = this.data.username;
    app.appData.userinfo.number = this.data.number;
    app.appData.userinfo.key = this.data.key;
    wx.redirectTo({url:"../user/user"})
  },
  usernameInput: function(event){
   this.setData({username:event.detail.value})
  }, 
  numberInput:function(event){
   this.setData({number:event.detail.value})
  },
  onUnload: function () {
    wx.navigateBack({
      delta: 1
    })
  },
  register:function(){
    wx.redirectTo({
      url: '../Register/register',
    })
  },

})