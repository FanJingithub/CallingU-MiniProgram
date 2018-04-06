//判断手机号码是否有效
function isNumberVaild(number) {
  if(number == undefined || number.length == 0 || number==null) {
    wx.showModal({
      title: "提示",
      content: '请输入手机号！',
      showCancel: false,
    })
    return false;
  }
  else if (number.length != 11) {
    wx.showModal({
      title: "提示",
      content: '您的手机号输入错误！',
      showCancel: false,
    })
    return false;
  }
  else {
    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
    if (!myreg.test(number)) {
      wx.showModal({
        title: "提示",
        content: '您的手机号输入错误！',
        showCancel: false,
      })
      return false;
    }
    else{
      return true;
    }
  }

}
module.exports.isNumberVaild =isNumberVaild;