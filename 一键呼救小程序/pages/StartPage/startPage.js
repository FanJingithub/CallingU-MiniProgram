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
    disabled: false,
    islogIn:false
  },

  /*获取验证码*/
  getCode: function () {
    var getCodefun = require('../../utils/getCode.js');
    var isNumberVaildfun = require('../../utils/isNumberVaild.js');
     //获取验证码
     var isVaild =isNumberVaildfun. isNumberVaild(this.data.number);
     if(isVaild)
        getCodefun.getCode(this);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    if(this.data.islogIn){
      wx.redirectTo({
        url: '../user/user',
      })
    }
  },

  logIn:function(){
     if (this.data.username == null && this.data.number == null){    
      wx.showModal({
        title: "提示",
        content: '请输入姓名和手机号！',
        showCancel:false
      })
      }
     else  if(this.data.number == null){
      wx.showModal({
        title: "提示",
        content: '请输入手机号！',
        showCancel: false
      })
      }
    else if (this.data.username == null) {
      wx.showModal({
        title: "提示",
        content: '请输入姓名！',
        showCancel: false
      })
    }
      if(this.data.number!=null && this.data.username!=null){
        app.appData.userinfo.username = this.data.username;
        app.appData.userinfo.number = this.data.number;
        app.appData.userinfo.key = this.data.key;
        var timestamp = Math.round(new Date().getTime() / 1000);
        wx.request({
          url: "https://118.89.111.214:2333/api/login",
          data: {
            "number": this.data.number,
          "timestamp":timestamp,
           "ciphertext": " ",
            
          },
          method: "POST",
          success: function (res) {
            if (res.data == "001") {
              this.setData({islogIn:true})
            }
            else if(res.data=="004"){
              wx.showModal({
                title: "提示",
                content: '手机号或密码错误！',
                showCancel: false,
              })
            }
          }
        })
        wx.redirectTo({ url: "../user/user" });
       }
  },
  usernameInput: function(event){
   this.setData({username:event.detail.value})
  }, 
  numberInput:function(event){
   this.setData({number:event.detail.value})
  },

  register: function () {
    wx.navigateTo({
      url:  '../Register/register',
    })
  },
  
})