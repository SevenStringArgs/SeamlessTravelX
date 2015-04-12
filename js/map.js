function Map(){
			var hMap = {};
      var travelObj = { busId: undefined };
      hMap.filter = undefined;
      var lastRouteNr = undefined;

			function getLocation() {
		    //get the geolocation of the device

			}

			hMap.platform = new H.service.Platform({
				'app_id': 'uC2PydFnCh7OcJnzAe0v',
				'app_code': 'fAa9dOJLtNXOf41kU2wYHQ'
			});

           // Obtain the default map types from the platform object
           var maptypes = hMap.platform.createDefaultLayers();

           // Instantiate (and display) a map object:
           hMap.map = new H.Map(
           	document.getElementById('mapContainer'),
           	maptypes.normal.transit,
           	{
           		zoom: 6,
           		center: { lng: 12.975197, lat: 55.616691 }
               //  center: { lng: 13.18801, lat: 55.70585 }
           });

           // Create the default UI:
           hMap.ui = H.ui.UI.createDefault(hMap.map, maptypes);
           
           // Enable the event system on the map instance:
           hMap.mapEvents = new H.mapevents.MapEvents(hMap.map);

           // Instantiate the default behavior, providing the mapEvents object:
           hMap.behavior = new H.mapevents.Behavior(hMap.mapEvents);

           // Create a marker icon from an image URL:
           hMap['icon'] = new H.map.Icon('http://maps.google.com/mapfiles/kml/paddle/4.png');
           hMap['pin'] = new H.map.Icon('/images/pin.png');
           hMap['busstop'] = new H.map.Icon('/images/skyltliten.png');
           hMap['busicon'] = new H.map.Icon('/images/litenbussikon.png');
           hMap['busstopRed'] = new H.map.Icon('/images/skyltliten.png');
           hMap['busstopGreen'] = new H.map.Icon('/images/gronskylt_360.png');
           hMap['busiconRed'] = new H.map.Icon('/images/rodbuss_360.png');
           hMap['busiconGreen'] = new H.map.Icon('/images/gronbuss_360.png'); 
           hMap['busiconRedEmpty'] = new H.map.Icon('/images/rodbuss1plutt.png');
           hMap['busiconRedNormal'] = new H.map.Icon('/images/rodbuss2pluttar.png');
           hMap['busiconRedFull'] = new H.map.Icon('/images/rodbuss3pluttar.png');
           // Create a marker using the previously instantiated icon:
           // var marker = new H.map.Marker({ lat: 52.5, lng: 13.4 }, { icon: icon });

           if (navigator.geolocation) {
		        navigator.geolocation.getCurrentPosition(function(pos){
              hMap.map.setZoom(15, true);
		        	hMap.map.setCenter({lat: pos.coords.latitude, lng: pos.coords.longitude});
		        	hMap.map.addObject(new H.map.Marker({lng: pos.coords.longitude, lat: pos.coords.latitude}, {icon: hMap.pin}));

		        });
		    } else {
		        alert("Geolocation is not supported by this browser.");
            hMap.map.setZoom(15, true);
            hMap.map.setCenter({lat: pos.coords.latitude, lng: pos.coords.longitude});
            hMap.map.addObject(new H.map.Marker({lng: 13.225035199999999, lat: 55.7165656}, {icon: hMap.pin}));
		    }
           // Add the marker to the map:
           // map.addObject(marker);


           hMap.addBusStop = function(busStop){
              if(!travelObj.busId){
                var marker = new H.map.Marker({lng: busStop.longitude, lat: busStop.latitude}, {icon: hMap.busstop});
                marker.stopId = busStop.id;
                hMap.map.addObject(marker);

                var bubble = new H.ui.InfoBubble({
                            lng: busStop.longitude,
                            lat: busStop.latitude + 0.0004
                        }, {
                            content: '<span class="bus-tooltip">'
                            + busStop.name + '</span>' 
                        });
                        marker.addEventListener("tap", function (evt) {
                            hMap.ui.addBubble(bubble);
                        });
                }
           };

           hMap.removeBusStop = function(busStop){
           		hMap.map.getObjects().forEach(function (obj) {
                if (obj.stopId === busStop.id)
                  hMap.map.removeObject(obj);
              });
           };


           var includeBus = function(bus){
              if(this.filter){
                return bus.id === 'bus' + this.filter + '-1' || 'bus' + this.filter + '-2';
              }
              return true;
           }

           hMap.addBus = function(bus){
              this.removeBus(bus);

              if(!includeBus(bus)){
                this.removeBus(bus);
                return;
              }

              if(!travelObj.busId || travelObj.busId === bus.id){

                var busicon = travelObj.busId ? hMap.busiconGreen : hMap.busiconRed;

                var marker = new H.map.Marker({lng: bus.lon, lat: bus.lat}, {icon: busicon});

                marker.busId = bus.id;
                hMap.map.addObject(marker);
             }     
           };

           hMap.removeBus = function(bus){
              hMap.map.getObjects().forEach(function (obj) {
              if (obj.busId === bus.id)
                  hMap.map.removeObject(obj);
              });
           };

           hMap.showBusRoute = function(line){
            lastRouteNr = 0;
            var busRoute = BusRouteHelper.getRoute(line);
            var coord = busRoute.coordinates;
            hMap.map.setCenter({lat: coord[0].latitude, lng: coord[0].longitude});
            hMap.map.getObjects().forEach(function(obj){
              if(obj.stopId){
                lastRouteNr++;
                hMap.map.removeObject(obj);
              }
            });

            for(var i = 0; i < coord.length; i++){
              var stop = coord[i];
              if(stop.station){
                var marker = new H.map.Marker({lng: stop.longitude, lat: stop.latitude}, {icon: hMap.busstop });
                marker.stopId = i;
                 hMap.map.addObject(marker);
              }
            }
           };

           hMap.removeLastRoute = function(){
                hMap.map.getObjects().forEach(function(obj){
                  if(obj.stopId){
                    hMap.map.removeObject(obj);
                  }
                });
           };

           hMap.setTravelObj = function(obj){
              travelObj = obj;
              if(travelObj.busId){
                hMap.map.getObjects().forEach(function(obj){
                  if(obj.stopId){
                    hMap.map.removeObject(obj);
                  }
              });
            } else {
              var busStops =BusStopStorage.getAll();
              for(var key in busStops){
                this.addBusStop(busStops[key]);
              }
            }
          };

          hMap.getTravelObject = function(){
            return travelObj;
          }

          hMap.removeAllBuses = function(){
            var buses = $.map(hMap.map.getObjects(), function(obj){
              if(obj.busId){
                return obj;
              }
            });

            $.each(buses, function(key, bus){
              hMap.map.removeObject(bus);
            });
          };
                
      
     
           
           return hMap;
       }