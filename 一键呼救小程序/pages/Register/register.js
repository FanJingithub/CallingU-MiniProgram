Page({

  /**
   * 页面的初始数据
   */
  data: {
    username:null,
    number:"0",
    code:null,
    password:null,
    key:null,
    sendCode:"获取验证码",
    disabled:false
  },
  /*获取验证码*/ 
  getCode:function(){
    var getCodefun = require('../../utils/getCode.js');
    var that = this;
    getCodefun.getCode(that);
  },

  usernameInput: function (event) {
    this.setData({ username: event.detail.value })
  },
  numberInput: function (event) {
    this.setData({ number: event.detail.value })
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },
})