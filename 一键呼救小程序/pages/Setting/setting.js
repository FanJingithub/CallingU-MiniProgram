var app=getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    autoCall:app.appData.userinfo.autoCall,
    contact:{
      showNumber: (app.appData.userinfo.contact ?app.appData.userinfo.contact : "请编辑联系人"),
      focus:false,
      editContact: "编辑联系人",
    },
    message: {
      showMessage: (app.appData.userinfo.message ? app.appData.userinfo.message : "请编辑短信"),
      focus: false,
      editMessage: "编辑短信",
    },
    autoMessage: app.appData.userinfo.autoMessage,
    messDisabled: (!app.appData.userinfo.autoMessage),
  },
  /*是否自动拨打120或者自动发送短信*/
  sw120Change:function(e){ 
   this.setData({
     autoCall:e.detail.value
   }); 
   app.appData.userinfo.autoCall = e.detail.value;
  },
  swmessageChange:function(e){
    this.setData({
      autoMessage: e.detail.value,
      messDisabled: !e.detail.value,
    });
    app.appData.userinfo.autoMessage = e.detail.value;
  },
//监听联系人电话的输入
  contactInput: function (e) {
    this.setData({
      contact:{
         showNumber:e.detail.value,
         focus:true,
         editContact:"确定"
      }})
  },
  //监听联系人短信的输入
  messageTextarea:function(e){
    this.setData({
      message:{
        showMessage:e.detail.value,
        focus:true,
        editMessage:"确定"
      }
    })
  },
//编辑联系人信息
editContact: function(e){
 if (this.data.contact.focus && this.data.contact.editContact == "确定") {
   var contactNumber = this.data.contact.showNumber;
   var isNumberVaildfun = require('../../utils/isNumberVaild.js');
   if (isNumberVaildfun.isNumberVaild(contactNumber)) {
     app.appData.userinfo.contact = contactNumber; 
     this.setData({
     contact: {
       showNumber: contactNumber,
       focus:false,
       editContact:"编辑联系人"
     }
   })
   }
  }
  else{
   this.setData({
     contact: {
       showNumber: app.appData.userinfo.contact,
       focus: true,
       editContact: "确定"
     }
   })
  }
},
//编辑联系人短信
  editMessage:function(e){
    if (this.data.message.focus && this.data.message.editMessage == "确定") {
      app.appData.userinfo.message = this.data.message.showMessage;
      this.setData({
        message:{
          showMessage: app.appData.userinfo.message,
          focus:false,
          editMessage:"编辑短信"
        }
      })
    }
    else{
      this.setData({
        message: {
          showMessage: app.appData.userinfo.message,
          focus: true,
          editMessage: "确定"
        }
      })
    }
  },
  onShow:function(){
     this.setData({
       autoCall: app.appData.userinfo.autoCall,
       contact: {
         showNumber: (app.appData.userinfo.contact ? app.appData.userinfo.contact : "请编辑联系人"),
         focus: false,
         editContact: "编辑联系人",
       },
       message: {
         showMessage: (app.appData.userinfo.message ? app.appData.userinfo.message : "请编辑短信"),
         focus: false,
         editMessage: "编辑短信",
       },
       autoMessage: app.appData.userinfo.autoMessage,
       messDisabled: (!app.appData.userinfo.autoMessage),
     })
  },
  //离开页面的时候向服务器传递信息
  onUnload:function(e){
    if (this.data.messDisabled){
      var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
      if(myreg.test(this.data.contact.showContact)){
        wx.request({
          url: "https://www.xiaobenji.net/api/set-message",
          data: {
            number: this.data.contact.showContact,
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
    }
  }
})