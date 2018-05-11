var t;
function getRescuerfun(that) {
  wx.request({
    url: 'https://www.xiaobenji.net/api/get-help',
    data: {
      "number": that.data.number,
      "latitude": that.data.latitude,
      "longitude": that.data.longitude,
      "sos": 1,
      "state": 0,//state表示c端在求救。 
    },
    header: {
      'content-type': 'application/x-www-form-urlencoded',// 表单
      "cookie": wx.getStorageSync("sessionid"),
    },
    method: "POST",
    success: function (res) {
      var markers = that.data.markers;
      var resData = res.data;
      var helpMessage=null;
      var preHelpMes = that.data.helpMessage;
      for (var tempRes in resData) {
        markers.push({
          iconPath: "../images/rescuer.png",
          id: 0,
          latitude: tempRes.latitude,
          longitude: tempRes.longitude,
          width: 40,
          height: 40
        });
        helpMessage += "\n救助者：" + tempRes.number + " " + tempRes.message;
      }
      helpMessage = helpMessage==null? preHelpMes:helpMessage;
      that.setData({
        helpMessage: helpMessage,
        markers: markers
      })
    }
  });
  console.log("timeout");
  t = setTimeout(getRescuerfun(that), 600000000);
}
function stopGetRescuer(){
  clearTimeout(t);
}
module.exports={
  getRescuerfun: getRescuerfun,
  stopGetRescuer:stopGetRescuer
}