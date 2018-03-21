var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    linkMan:null,
    autoCall:false,
    contact:{
      number: "请输入联系人电话",
      disabled:true,
      focus:false,
      editContact: "编辑联系人",
    },
    message: {
      showmessage: "请输入联系短信",
      disabled: true,
      focus: false,
      editMessage: "编辑短信"
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
  contactsubmit:function(e){
      if(this.data.contact.editContact=="编辑联系人"){
          this.setData({
            contact: {
              number: e.detail.value.contactTextarea,
              editContact: "确定",
              disabled: false,
              focus: true
            }
          });
      }
      else if (this.data.contact.editContact == "确定"){
             this.setData({
               contact:{
                  number:e.detail.value.contactTextarea,
                       editContact:"编辑联系人",
                      disabled:true,
                      focus:false
               }
             });
    wx.request({
      url: "http://118.89.111.214:6666/api/set-message",
      data: {
        number: "18701750073"
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      method: "POST",
      success: function(res){
        console.log("successful");
      }
    })
  }
},
  messagesubmit: function (e) {
    if (this.data.message.editMessage == "编辑短信") {
      this.setData({
        message: {
          showMessage: e.detail.value.messageTextarea,
          editMessage: "确定",
          disabled: false,
          focus: true
        }
      });
    }
    else if (this.data.message.editMessage == "确定") {
      this.setData({
        message: {
          showMessage: e.detail.value.messageTextarea,
          editMessage: "编辑短信",
          disabled: true,
          focus: false
        }
      });
      wx.request({
        url: "http://118.89.111.214:6666/api/set-message",
        data: {
          number: "18701750073"
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        method: "POST",
        success: function (res) {
          console.log("successful");
        }
      })
    }
  },
  onUnload:function(){
    wx.navigateBack({
      delta:1
    })
  },
})