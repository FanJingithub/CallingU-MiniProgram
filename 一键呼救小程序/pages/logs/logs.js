//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    logs: []
  },
  onLoad: function () {
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(log => {
        return util.formatTime(new Date(log))
      })
    })
    wx.openDocument({
      filePath: '',
      fileType: '',
      success: '',
      fail: '',
      complete: '',
    })
  }
})
