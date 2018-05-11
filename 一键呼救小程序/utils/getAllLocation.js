function getAllLocation(that){
    wx.getLocation({
      type: "gcj02",//坐标类型
      //获取经纬度成功回调
      success: (res) => {
        that.setData({
          longitude: res.longitude,
          latitude: res.latitude,
          circles: [{
            latitude: res.latitude,
            longitude: res.longitude,
            color: '#FF0000DD',
            fillColor: '#7cb5ec88',
            radius: 300,
            strokeWidth: 1
          }]
        });
        getNearHospitalAndAED(function (res) {
          that.setData({
            markers: res
          })
        });
        getRescuerfun(that);
      }
    });
    console.log("timeout");
}
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
      var helpMessage = null;
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
      helpMessage = helpMessage == null ? preHelpMes : helpMessage;
      that.setData({
        helpMessage: helpMessage,
        markers: markers
      })
    }
  });
}
function getNearHospitalAndAED(callback) {
  var qqmapsdk;
  var QQMapWX = require('qqmap-wx-jssdk1.0/qqmap-wx-jssdk.min.js');
  var varMarkers = [];
  qqmapsdk = new QQMapWX({
    key: '2JYBZ-P2AWO-GHEWV-S6ILH-ACCF2-MCFWM'
  });
  qqmapsdk.search({
    keyword: '医院',
    page_size: 20,
    success: function (res) {
      var resData = res.data;
      for (var i = 0; i < resData.length; i++) {
        varMarkers.push({
          iconPath: '../../pages/images/hospital.png',
          latitude: resData[i].location.lat,
          longitude: resData[i].location.lng,
          width: 40,
          height: 40
        })
      };
      (callback && typeof (callback) === "function") && callback(varMarkers);
      qqmapsdk.search({
        keyword: 'AED',
        page_size: 20,
        success: function (res) {
          var resData = res.data;
          for (var i = 0; i < resData.length; i++) {
            varMarkers.push({
              iconPath: '../../pages/images/AED.png',
              latitude: resData[i].location.lat,
              longitude: resData[i].location.lng,
              width: 40,
              height: 40
            })
          }
          (callback && typeof (callback) === "function") && callback(varMarkers);
        }
      })
    },
    fail: function (res) {
      console.log(res.message);
      console.log(res.status);
    }
  });

}
module.exports = {
  getAllLocation:getAllLocation,
}