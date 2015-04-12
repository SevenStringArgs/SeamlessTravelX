var BusRouteHelper = (function(){

var busRoutes = [];

var getRoutes = function(line){
      for (var i = busRoutes.length - 1; i >= 0; i--) {
      if (busRoutes[i].number==line){
        return busRoutes[i];
      }
    };
};

busRoutes.push({
  "_id": "0c0ddb884cfea1b97614674e0433cf32",
  "_rev": "3-a22527d15206aa5374dddb4c2b523131",
  "number": 3,
  "coordinates": [
    {
      "longitude": 13.19813,
      "latitude": 55.69971
    },
    {
      "longitude": 13.19716,
      "latitude": 55.69981
    },
    {
      "longitude": 13.19557,
      "latitude": 55.69972
    },
    {
      "longitude": 13.19452,
      "latitude": 55.69956
    },
    {
      "longitude": 13.1933,
      "latitude": 55.69928
    },
    {
      "longitude": 13.19275,
      "latitude": 55.69928
    },
    {
      "longitude": 13.19107,
      "latitude": 55.6995
    },
    {
      "longitude": 13.19024,
      "latitude": 55.69833,
      "station": true
    },
    {
      "longitude": 13.18966,
      "latitude": 55.6973
    },
    {
      "longitude": 13.19171,
      "latitude": 55.69702
    },
    {
      "longitude": 13.19224,
      "latitude": 55.69655
    },
    {
      "longitude": 13.19433,
      "latitude": 55.69744,
      "station": true
    },
    {
      "longitude": 13.19629,
      "latitude": 55.69829
    },
    {
      "longitude": 13.19841,
      "latitude": 55.699
    },
    {
      "longitude": 13.19733,
      "latitude": 55.6986,
      "station": true
    }
  ]
});

busRoutes.push({
  "_id": "29e9e70d2b9ce64824295ca4dd4a6714",
  "_rev": "2-524f31a8c235051db98f05f43e938450",
  "number": 7,
  "coordinates": [
    {
      "longitude": 13.20223,
      "latitude": 55.71796
    },
    {
      "longitude": 13.20091,
      "latitude": 55.718
    },
    {
      "longitude": 13.20092,
      "latitude": 55.71765
    },
    {
      "longitude": 13.20123,
      "latitude": 55.71743
    },
    {
      "longitude": 13.20122,
      "latitude": 55.71687
    },
    {
      "longitude": 13.2004,
      "latitude": 55.71681
    },
    {
      "longitude": 13.20011,
      "latitude": 55.71679
    },
    {
      "longitude": 13.19961,
      "latitude": 55.71665
    },
    {
      "longitude": 13.19871,
      "latitude": 55.71663
    },
    {
      "longitude": 13.19886,
      "latitude": 55.71573
    },
    {
      "longitude": 13.19865,
      "latitude": 55.71553
    },
    {
      "longitude": 13.19882,
      "latitude": 55.71546,
      "station": true
    },
    {
      "longitude": 13.19942,
      "latitude": 55.71496
    },
    {
      "longitude": 13.19968,
      "latitude": 55.71485
    },
    {
      "longitude": 13.2014,
      "latitude": 55.71534,
      "station": true
    },
    {
      "longitude": 13.20255,
      "latitude": 55.71568
    },
    {
      "longitude": 13.20218,
      "latitude": 55.71617
    }
  ]
});

busRoutes.push({
  "_id": "3c5eb45860c8115379f9642c952a91e3",
  "_rev": "3-a08bfaccccfe9c51f9ade60c1b7603db",
  "number": 4,
  "coordinates": [
    {
      "longitude": 13.19282,
      "latitude": 55.70918
    },
    {
      "longitude": 13.19357,
      "latitude": 55.70909
    },
    {
      "longitude": 13.19413,
      "latitude": 55.70893
    },
    {
      "longitude": 13.19546,
      "latitude": 55.70836,
      "station": true
    },
    {
      "longitude": 13.19639,
      "latitude": 55.70794
    },
    {
      "longitude": 13.19643,
      "latitude": 55.70775
    },
    {
      "longitude": 13.19639,
      "latitude": 55.70763
    },
    {
      "longitude": 13.19653,
      "latitude": 55.70745
    },
    {
      "longitude": 13.19643,
      "latitude": 55.70714
    },
    {
      "longitude": 13.19568,
      "latitude": 55.70609
    },
    {
      "longitude": 13.19536,
      "latitude": 55.70613
    },
    {
      "longitude": 13.19261,
      "latitude": 55.70612
    },
    {
      "longitude": 13.19268,
      "latitude": 55.70697,
      "station": true
    },
    {
      "longitude": 13.19276,
      "latitude": 55.70777
    }
  ]
});

busRoutes.push({
  "_id": "5ffff6ed4f98c7bc8c00589e4fb91fff",
  "_rev": "1-5a31e04d21ba876d1a1c5882bba6e3dd",
  "number": 2,
  "coordinates": [
    {
      "longitude": 13.19276,
      "latitude": 55.70915
    },
    {
      "longitude": 13.19263,
      "latitude": 55.7068,
      "station": true
    },
    {
      "longitude": 13.19261,
      "latitude": 55.70617
    },
    {
      "longitude": 13.19265,
      "latitude": 55.70522
    },
    {
      "longitude": 13.19154,
      "latitude": 55.70499
    },
    {
      "longitude": 13.19066,
      "latitude": 55.70528
    },
    {
      "longitude": 13.18948,
      "latitude": 55.70528
    },
    {
      "longitude": 13.18918,
      "latitude": 55.70669
    },
    {
      "longitude": 13.18918,
      "latitude": 55.70762
    },
    {
      "longitude": 13.19105,
      "latitude": 55.70837,
      "station": true
    }
  ]
});

busRoutes.push({
  "_id": "78dca8f1f05fe9d40925c2085f417ffc",
  "_rev": "2-b2796bf4c19ff7c8ba2c078564edfc6c",
  "number": 6,
  "coordinates": [
    {
      "longitude": 13.19261,
      "latitude": 55.70691,
      "station": true
    },
    {
      "longitude": 13.19268,
      "latitude": 55.70494,
      "station": true
    }
  ]
});

busRoutes.push({
  "_id": "78dca8f1f05fe9d40925c2085fa9e658",
  "_rev": "3-1821983899f99c1e4aa2470fd12c3877",
  "number": 5,
  "coordinates": [
    {
      "longitude": 13.21714,
      "latitude": 55.7157,
      "station": true
    },
    {
      "longitude": 13.21667,
      "latitude": 55.71572
    },
    {
      "longitude": 13.2145,
      "latitude": 55.7156,
      "station": true
    },
    {
      "longitude": 13.21315,
      "latitude": 55.71553
    },
    {
      "longitude": 13.21332,
      "latitude": 55.71482
    },
    {
      "longitude": 13.21319,
      "latitude": 55.71328
    },
    {
      "longitude": 13.21306,
      "latitude": 55.7132
    },
    {
      "longitude": 13.21279,
      "latitude": 55.71318
    },
    {
      "longitude": 13.21263,
      "latitude": 55.71306
    },
    {
      "longitude": 13.21304,
      "latitude": 55.71285
    },
    {
      "longitude": 13.21363,
      "latitude": 55.71301
    },
    {
      "longitude": 13.21418,
      "latitude": 55.71305
    },
    {
      "longitude": 13.21418,
      "latitude": 55.71305,
      "station": true
    },
    {
      "longitude": 13.21613,
      "latitude": 55.71331
    },
    {
      "longitude": 13.21649,
      "latitude": 55.71326
    },
    {
      "longitude": 13.21702,
      "latitude": 55.71469
    }
  ]
});

busRoutes.push({
  "_id": "78dca8f1f05fe9d40925c2085fda632a",
  "_rev": "2-800272d002065c60058572260642290d",
  "number": 1,
  "coordinates": [
    {
      "longitude": 13.1819,
      "latitude": 55.70825
    },
    {
      "longitude": 13.17774,
      "latitude": 55.70721
    },
    {
      "longitude": 13.17723,
      "latitude": 55.70694
    },
    {
      "longitude": 13.17721,
      "latitude": 55.70681,
      "station": true
    },
    {
      "longitude": 13.18087,
      "latitude": 55.70459
    },
    {
      "longitude": 13.18255,
      "latitude": 55.70422,
      "station": true
    },
    {
      "longitude": 13.18351,
      "latitude": 55.70409
    },
    {
      "longitude": 13.18386,
      "latitude": 55.70409
    },
    {
      "longitude": 13.18375,
      "latitude": 55.70454,
      "station": true
    },
    {
      "longitude": 13.18353,
      "latitude": 55.70569
    },
    {
      "longitude": 13.18276,
      "latitude": 55.70704,
      "station": true
    },
    {
      "longitude": 13.18234,
      "latitude": 55.70775
    }
  ]
});

busRoutes.push({
  "_id": "a3c50d914c8b78bb8751805e3f16aaed",
  "_rev": "2-95b5fe5ed8576987aaf2c4faa9330b67",
  "number": 8,
  "coordinates": [
    {
      "longitude": 13.21249,
      "latitude": 55.71167
    },
    {
      "longitude": 13.21181,
      "latitude": 55.71173,
      "station": true
    },
    {
      "longitude": 13.21009,
      "latitude": 55.71184
    },
    {
      "longitude": 13.20811,
      "latitude": 55.71218,
      "station": true
    },
    {
      "longitude": 13.20747,
      "latitude": 55.71167
    },
    {
      "longitude": 13.20695,
      "latitude": 55.71149
    },
    {
      "longitude": 13.20568,
      "latitude": 55.71144
    },
    {
      "longitude": 13.2065,
      "latitude": 55.7094
    },
    {
      "longitude": 13.20702,
      "latitude": 55.70878,
      "station": true
    },
    {
      "longitude": 13.20844,
      "latitude": 55.70722
    },
    {
      "longitude": 13.20967,
      "latitude": 55.7076
    },
    {
      "longitude": 13.21012,
      "latitude": 55.7079,
      "station": true
    },
    {
      "longitude": 13.2105,
      "latitude": 55.70831
    },
    {
      "longitude": 13.21143,
      "latitude": 55.70871
    },
    {
      "longitude": 13.21203,
      "latitude": 55.70885
    },
    {
      "longitude": 13.21202,
      "latitude": 55.70939
    },
    {
      "longitude": 13.21218,
      "latitude": 55.70984
    }
  ]
});

busRoutes.push({
  "_id": "a3c50d914c8b78bb8751805e3f22dfa0",
  "_rev": "2-da47d8729066082fe1ead655fc9251d8",
  "number": 9,
  "coordinates": [
    {
      "longitude": 13.19519,
      "latitude": 55.72034
    },
    {
      "longitude": 13.1909,
      "latitude": 55.72064
    },
    {
      "longitude": 13.18952,
      "latitude": 55.71935,
      "station": true
    },
    {
      "longitude": 13.18903,
      "latitude": 55.71895
    },
    {
      "longitude": 13.18849,
      "latitude": 55.71724
    },
    {
      "longitude": 13.18948,
      "latitude": 55.7172,
      "station": true
    },
    {
      "longitude": 13.19186,
      "latitude": 55.71693
    },
    {
      "longitude": 13.19471,
      "latitude": 55.71694
    },
    {
      "longitude": 13.19479,
      "latitude": 55.71767,
      "station": true
    },
    {
      "longitude": 13.19512,
      "latitude": 55.71965,
      "station": true
    }
  ]
});

return{
  getRoute : function(line){
    return getRoutes(line);
  },
  getDestination : function(bus){

    var route = getRoutes(bus.line);
    var station;
    var current;
    var stationsPassed = 0;
    var stationFound = false;

    while(!stationFound){
    for (var i = route.coordinates.length - 1; i >= 0; i--) {
      var coordinate = route.coordinates[i];
      if (coordinate.longitude==bus.lon && coordinate.latitude==bus.lat){
          current = coordinate;
      }
      else if (current && coordinate.station){
          stationsPassed++;
          if(stationsPassed==2){
            station = coordinate;
            stationFound=true;
          }
      }
    }

    }
    return station;
  }
}

})();