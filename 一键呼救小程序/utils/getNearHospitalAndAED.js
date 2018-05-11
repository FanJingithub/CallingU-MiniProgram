function getNearHospitalAndAED(callback) {
  var qqmapsdk;
  var QQMapWX = require('qqmap-wx-jssdk1.0/qqmap-wx-jssdk.min.js');
  var varMarkers = [];
  qqmapsdk = new QQMapWX({
    key: '2JYBZ-P2AWO-GHEWV-S6ILH-ACCF2-MCFWM'
  });
  qqmapsdk.search({
    keyword: '急救',
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

module.exports.getNearHospitalAndAED = getNearHospitalAndAED;