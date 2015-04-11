function Map(){
			var hMap = {};

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
           		zoom: 2,
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
              hMap.map.setZoom(14, true);
		        	hMap.map.setCenter({lat: pos.coords.latitude, lng: pos.coords.longitude});
		        	hMap.map.addObject(new H.map.Marker({lng: pos.coords.longitude, lat: pos.coords.latitude}, {icon: hMap.busstop}));

		        });
		    } else {
		        alert("Geolocation is not supported by this browser.");
		    }
           // Add the marker to the map:
           // map.addObject(marker);


           hMap.addBusStop = function(busStop){
              var marker = new H.map.Marker({lng: busStop.longitude, lat: busStop.latitude}, {icon: hMap.busstop});
              marker.stopId = busStop.id;
           		hMap.map.addObject(marker);
           };

           hMap.removeBusStop = function(busStop){
           		hMap.map.getObjects().forEach(function (obj) {
                if (obj.stopId === busStop.id)
                  hMap.map.removeObject(obj);
              });
           };

           hMap.addBus = function(bus){
              this.removeBus(bus);
              var marker = new H.map.Marker({lng: bus.lon, lat: bus.lat}, {icon: hMap.busiconRed});

              marker.busId = bus.id;
              hMap.map.addObject(marker);
           };

           hMap.removeBus = function(bus){
              hMap.map.getObjects().forEach(function (obj) {
              if (obj.busId === bus.id)
                  hMap.map.removeObject(obj);
              });
           };
           
           return hMap;
       }