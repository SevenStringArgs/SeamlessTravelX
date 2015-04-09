function NewMap(){
			var returnMap = {};

			function getLocation() {
		    //get the geolocation of the device

			}

			returnMap.platform = new H.service.Platform({
				'app_id': 'uC2PydFnCh7OcJnzAe0v',
				'app_code': 'fAa9dOJLtNXOf41kU2wYHQ'
			});

           // Obtain the default map types from the platform object
           var maptypes = returnMap.platform.createDefaultLayers();

           // Instantiate (and display) a map object:
           returnMap.map = new H.Map(
           	document.getElementById('mapContainer'),
           	maptypes.normal.transit,
           	{
           		zoom: 16,
           		center: { lng: 12.975197, lat: 55.616691 }
               //  center: { lng: 13.18801, lat: 55.70585 }
           });

           // Create the default UI:
           returnMap.ui = H.ui.UI.createDefault(returnMap.map, maptypes);
           
           // Enable the event system on the map instance:
           returnMap.mapEvents = new H.mapevents.MapEvents(returnMap.map);

           // Add event listeners:

           // Instantiate the default behavior, providing the mapEvents object:
           returnMap.behavior = new H.mapevents.Behavior(returnMap.mapEvents);

           // Create a marker icon from an image URL:
           returnMap['icon'] = new H.map.Icon('http://maps.google.com/mapfiles/kml/paddle/4.png');
           returnMap['busstop'] = new H.map.Icon('/images/skyltliten.png');
           returnMap['busicon'] = new H.map.Icon('/images/litenbussikon.png');
           returnMap['busstopRed'] = new H.map.Icon('/images/skyltliten.png');
           returnMap['busstopGreen'] = new H.map.Icon('/images/gronskylt_360.png');
           returnMap['busiconRed'] = new H.map.Icon('/images/rodbuss_360.png');
           returnMap['busiconGreen'] = new H.map.Icon('/images/gronbuss_360.png'); 
           returnMap['busiconRedEmpty'] = new H.map.Icon('/images/rodbuss1plutt.png');
           returnMap['busiconRedNormal'] = new H.map.Icon('/images/rodbuss2pluttar.png');
           returnMap['busiconRedFull'] = new H.map.Icon('/images/rodbuss3pluttar.png');
           // Create a marker using the previously instantiated icon:
           // var marker = new H.map.Marker({ lat: 52.5, lng: 13.4 }, { icon: icon });




           if (navigator.geolocation) {
		        navigator.geolocation.getCurrentPosition(function(pos){
		        	returnMap.map.setCenter({lat: pos.coords.latitude, lng: pos.coords.longitude});
		        	returnMap.map.addObject(new H.map.Marker({lng: pos.coords.longitude, lat: pos.coords.latitude}, {icon: returnMap.busstop}));

		        });
		    } else {
		        alert("Geolocation is not supported by this browser.");
		    }
           // Add the marker to the map:
           // map.addObject(marker);


           returnMap.addBusStop = function(busStop){
              var marker = new H.map.Marker({lng: busStop.longitude, lat: busStop.latitude}, {icon: returnMap.busstop});
              marker.stopId = busStop.id;
           		returnMap.map.addObject(marker);
           };

           returnMap.removeBusStop = function(busStop){
           		returnMap.map.getObjects().forEach(function (obj) {
                if (obj.stopId === busStop.id)
                  returnMap.map.removeObject(obj);
              });
           };


           return returnMap;
       }