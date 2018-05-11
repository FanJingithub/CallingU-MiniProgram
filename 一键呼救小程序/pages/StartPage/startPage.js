var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    username: null,
    number: null,
    code: null,
    password: null,
    key: null,
    sendCode: "获取验证码",
    disabled: false,
    ciphertext: null
  },

  /*获取验证码*/
  getCode: function () {
    var getCodefun = require('../../utils/getCode.js');
    var isNumberVaildfun = require('../../utils/isNumberVaild.js');
    //获取验证码
    var isVaild = isNumberVaildfun.isNumberVaild(this.data.number);
    if (isVaild)
      getCodefun.getCode(this);
  },

  logIn: function () {
    if (this.data.username == null && this.data.number == null) {
      wx.showModal({
        title: "提示",
        content: '请输入姓名和手机号！',
        showCancel: false
      })
    }
    else if (this.data.number == null) {
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
    if (this.data.number != null && this.data.username != null) {
     wx.setStorageSync("number",this.data.number);
     wx.setStorageSync("username",this.data.username);
      wx.request({
        url: "https://www.xiaobenji.net/api/login",
        header: {
          'content-type': 'application/x-www-form-urlencoded' // 表单
        },
        method: "POST",
        data: {
          "number": this.data.number,
          "code": this.data.code,
        },
        success: function (res) {
          if (res.data.result == '1') {
            wx.setStorageSync("sessionid", res.header["Set-Cookie"])
            wx.redirectTo({ url: "../user/user" });
          }
          else {
            wx.showModal({
              title: "提示",
              content: '验证码错误！',
              showCancel: false,
            })
          }
        },
        fail: function () {
          console.log("login fail");
        }
      })
    }
  },
  usernameInput: function (event) {
    this.setData({ username: event.detail.value })
  },
  numberInput: function (event) {
    this.setData({ number: event.detail.value })
  },
  inputCode: function (e) {
    this.setData({
      code: e.detail.value
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