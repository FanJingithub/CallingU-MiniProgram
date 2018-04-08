function countDown(that,currentTime){
  if (currentTime <= 0) {
    that.setData({
      sendCode: "重新获取",
      disabled: false
    });
    return ;
  }
  that.setData({
    sendCode: currentTime + '秒后重新获取',
    disabled: true,
  });
  var timeout = setTimeout(function () {
    currentTime--;
  countDown(that,currentTime);
  }, 1000)
}

function getCode(that) {
  console.log(that.data.number);
    wx.request({
        url: 'http://118.89.111.214:2333/api/identify-code',
        data: {
         "number":that.data.number
        },
       header: {
         'content-type': ' application/x-www-form-urlencoded' // 默认值
       },
      method: 'POST',
      success: function (res) {
        if(res.data=='001')
           countDown(that, 60);
        else{
          console.log("错误信息："+res.data);
          wx.showModal({
            title: "提示",
            content: '服务器出现未知错误！',
            showCancel: false,
          })
          that.setData({
            sendCode: "重新获取",
            disabled: false
          });
        }

      }
    });
}

module.exports.getCode = getCode;