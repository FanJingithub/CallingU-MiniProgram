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
  var numberValid = false;
  let number1 = that.data.number;
  if (number1 == undefined || number1.length == 0) {
    wx.showToast({
      title: '请输入手机号！',
      icon: 'warn',
      duration: 1500
    })
  }
  else if (number1.length != 11) {
    wx.showToast({
      title: '号码长度有误',
      icon: 'warn',
      duration: 1500
    })
  }
  else {
    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
    if (!myreg.test(number1)) {
      wx.showToast({
        title: '号码有误！',
        icon: 'warn',
        duration: 1500
      })
    }
    else
      numberValid = true;
  }
  if (numberValid) {
    wx.request({
      url: 'http://www.zhangchenhao.com/api/identify-code',
      data: {
        number:number1
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      method: 'POST',
      success: function (res) {
         countDown(that,60)
      }
    });
  }
}
module.exports.getCode = getCode;