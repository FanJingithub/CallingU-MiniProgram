var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */

  /*//返回页面
  //这里是页面B的 onShow 方法
  onShow: function () {
    var that = this
    //如果 isBack 为 true，就返回上一页
    if (that.data.isBack) {
      wx.navigateBack()
    }
  },
  //这里是页面C的 onUnload 方法
  onUnload: function () {
    var that = this

    //判断页面栈里面的页面数是否大于2
    if (getCurrentPages().length > 2) {
      //获取页面栈
      let pages = getCurrentPages();
      //给上一个页面设置状态
      let curPage = pages[pages.length - 2];
      let data = curPage.data;
      curPage.setData({ 'isBack': true });
    }
  },*/
})