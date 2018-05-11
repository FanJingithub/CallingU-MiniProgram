var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    autoCall: wx.getStorageSync("autoCall"),
    contact: {
      showNumber: wx.getStorageSync("contact"),
      focus: false,
      editContact: "编辑联系人",
    },
    message: {
      showMessage: wx.getStorageSync("message"),
      focus: false,
      editMessage: "编辑短信",
    },
    autoMessage: wx.getStorageSync("autoMessage"),
    messDisabled: (!wx.getStorageSync("autoMessage")),
  },
  
  /*是否自动拨打120或者自动发送短信*/
  sw120Change: function (e) {
    this.setData({
      autoCall: e.detail.value
    });
  },
  swmessageChange: function (e) {
    this.setData({
      autoMessage: e.detail.value,
      messDisabled: !e.detail.value,
    });
    wx.setStorageSync('autoMessage', this.data.autoMessage)
    if(!e.detail.value){
      this.setData({
        message: {
          showMessage: null,
          focus: false,
          editMessage: "编辑短信"
        },
        contact: {
          showNumber: null,
          focus: false,
          editContact: "编辑联系人"
        }
      })
    }
  },
  //监听联系人电话的输入
  contactInput: function (e) {
    this.setData({
      contact: {
        showNumber: e.detail.value,
        focus: true,
        editContact: "确定"
      }
    })
  },
  //监听联系人短信的输入
  messageTextarea: function (e) {
    this.setData({
      message: {
        showMessage: e.detail.value,
        focus: true,
        editMessage: "确定"
      }
    })
  },
  //编辑联系人信息
  editContact: function (e) {
    if (this.data.contact.focus && this.data.contact.editContact == "确定") {
      var contactNumber = this.data.contact.showNumber;
      var isNumberVaildfun = require('../../utils/isNumberVaild.js');
      if (isNumberVaildfun.isNumberVaild(contactNumber)) {
        this.setData({
          contact: {
            showNumber: this.data.contact.showNumber,
            focus: false,
            editContact: "编辑联系人"
          }
        });
        wx.setStorageSync('contact', this.data.contact.showNumber)
      }
    }
    else {
      this.setData({
        contact: {
          showNumber:this.data.contact.showNumber,
          focus: true,
          editContact: "确定"
        }
      })
    }
  },
  //编辑联系人短信
  editMessage: function (e) {
    if (this.data.message.focus && this.data.message.editMessage == "确定") {
      this.setData({
        message: {
          showMessage:this.data.message.showMessage,
          focus: false,
          editMessage: "编辑短信"
        }
      })
      wx.setStorageSync('message', this.data.message.showMessage)
    }
    else {
      this.setData({
        message: {
          showMessage: this.data.message.showMessage,
          focus: true,
          editMessage: "确定"
        }
      })
    }
  },
  //离开页面的时候向服务器传递信息
  onUnload: function (e) {
    wx.setStorageSync('message',this.data.message.showMessage);
    wx.setStorageSync('autoMessage',this.data.autoMessage);
    wx.setStorageSync('autoCall',this.data.autoCall);
    wx.setStorageSync('contact',this.data.contact.showNumber);
    if (this.data.autoMessage) {
      var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
      var trueNum = myreg.test(this.data.contact.showNumber);
      if (trueNum && this.data.message.showMessage) {
        wx.request({
          url: "https://www.xiaobenji.net/api/set-message",
          data: {
            number: this.data.contact.showNumber,
            message: this.data.contact.showMessage,
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded',// 表单
            "cookie": wx.getStorageSync("sessionid"),
          },
          method: "POST",
          success: function (res) {
            console.log("successful");
          }
        })
      }
      else if (!trueNum){
        wx.showModal({
          title: '提示',
          content: '请输入正确的联系人信息',
          showCancel:false
        })
        wx.navigateTo({
          url: '../Setting/setting',
        })
      } 
      else if(!this.data.message.showMessage){
        wx.showModal({
          title: '提示',
          content: '您已选择自动发送短信，请输入短信内容',
          showCancel:false
        });
        wx.navigateTo({
          url: '../Setting/setting',
        })
      }
    }
    
  },
  onShareAppMessage:function(){
    return {
      title: "一键呼救",
      desc: "一键呼救小程序",
      path: "../startPage/startPage"
    }
  }
})