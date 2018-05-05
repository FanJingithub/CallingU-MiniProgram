function getNearHosptalAndAED(callback) {

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
          iconPath: '../images/hospital.png',
          latitude: resData[i].location.lat,
          longitude: resData[i].location.lng,
          width: 50,
          height: 50
        })
      }
      /* if (varMarkers != null && varMarkers.length != 0) {
         (callback && typeof (callback) === "function") && callback(varMarkers);
       }*/
    },
    fail: function (res) {
      console.log(res.message);
      console.log(res.status);
    }
  });
  qqmapsdk.search({
    keyword: 'AED',
    success: function (res) {
      var resData = res.data;
      for (var i = 0; i < resData.length; i++) {
        varMarkers.push({
          iconPath: '../images/AED.png',
          latitude: resData[i].location.lat,
          longitude: resData[i].location.lng,
          width: 50,
          height: 50
        })
      }
    }
  })
  if (varMarkers != undefined) {
    console.log(varMarkers);
    (callback && typeof (callback) === "function") && callback(varMarkers);
  }

 //if(varMarkers.length!=0){
  //return varMarkers;
//}


}

module.exports.getNearHospitalAndAED = getNearHosptalAndAED;