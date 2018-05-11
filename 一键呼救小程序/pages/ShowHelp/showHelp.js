var app=getApp();
Page({
  onShareAppMessage: function () {
    return {
      title: "一键呼救",
      desc: "一键呼救小程序",
      path: "../startPage/startPage"
    }
  }
})