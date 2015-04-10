var BusStopStorage = (function(){
	var store = $.localStorage;
	var nsBusStopCache = 'busStopCache';
	var eventPub = {};


	var listeners = {};
	
	var addBusStopListeners = [];
	var removeBustStopListeners = [];
	store.isEmpty(nsBusStopCache) && store.set(nsBusStopCache, {count: 0});
	var searchDistance = 0.05;



	var removedBusStop = function(busStop){
		$.each(removeBustStopListeners, function(key, listener){
			listener(busStop);
		});
	};

	var busStopAdded = function(busStop){
		$.each(addBusStopListeners, function(key, busStopListener){
			busStopListener(busStop);
		});
	};

	var addBusStop = function(busStop){
		var busStops = store.get(nsBusStopCache);
		if(!busStops[busStop.id]){
			busStop['marker'] = new H.map.Marker({lng: busStop.longitude, lat: busStop.latitude}, {icon: new H.map.Icon('/images/skyltliten.png')});
			busStop['marker'].stopId = busStop.id;
			busStops[busStop.id] = busStop;
			busStops.count++;
			store.set(nsBusStopCache, busStops);
			busStopAdded(busStop);
			console.log('Add busStop');
		}
		console.log('Has busStop');
	};

	var getBusStopsForPoint = function(point, done){
		getBusStops(point.lat, point.lng, function(err, data){
			if(err){
				done(err, null);
			} else {
				done(null, data);
			}
		});
	};

	var getBusStops = function(lat, lng, done){
		console.log('Getting busStops');

		$.ajax({
			url: TravelX.url('/showStops'),
			type: 'GET',
			headers: { Accept : "application/json; charset=utf-8"}, 
			data: {'lat': lat, 'lng': lng},
			success: function(data){
				console.log('Got busstop data');
				done(null, data);
			},
			error: function(error){
				console.log('Got busstop error');
				done(error, null)
			}
		});
	};

	var evalCord = function(rect){
		console.log('Right: ' + rect.getRight());
		console.log('Left: ' + rect.getLeft());
		mapDistance = rect.getRight() - rect.getLeft(); 
		console.log(mapDistance);
		return searchDistance >= mapDistance;
	};


	return {
		add: function(point, done){
			getBusStopsForPoint(point, function(err, data){
				if(err){
					done(err, null);
				} else {
					$.each(data.busStops, function(key, value){
						addBusStop(value);
					});
					console.log(store.get(nsBusStopCache));
					done(null, data);
				}
			});
		},
		addListener: function(e, func){
			listeners[e] && listeners[e].push(func);
		},
		addListener: function(e, func){

		},
		subscribeBusStopAdded: function(addFn){
			addBusStopListeners.push(addFn);
		},
		subscribeBusStopRemoved: function(addFn){
			removeBustStopListeners.push(addFn);
		},
		getAll: function(){
			var busStops = {};
			var cache = store.get(nsBusStopCache);
			for(key in cache){
				if(!isNaN(key)){
					busStops[key] = cache[key];
				}
			}
			return busStops;
		},
		clearStorage: function(){
			var cache = store.get(nsBusStopCache);
			for(key in cache){
				if(!isNaN(key)){
					removedBusStop(cache[key]);
					delete cache[key];
				}
			}
			cache.count = 0;
			store.set(nsBusStopCache, cache);
		}
	}
})();


var BusStopHelper = (function(target){
	var nsBusStopHelper = 'busStopHelperCache';

	var newConfig = function(){
		return {
			target: target,
			searchDistance: 0.1
		};
	};

	var config = newConfig();
	SH.set(nsBusStopHelper, config);

	var getBusStopsOnMap = function(hMap, done){
		var rect = hMap.getViewBounds();
		var topLeft = rect.getTopLeft();
		var bottomRight = rect.getBottomRight();
		BusStopStorage.add(rect.getCenter(), done);
		for(var lng = Math.abs(topLeft.lng); lng < Math.abs(bottomRight.lng); lng += 0.02){
			for(var lat = Math.abs(bottomRight.lat); lat < Math.abs(topLeft.lat); lat += 0.01){
				var point = new H.geo.Point(lat, lng);
				BusStopStorage.add(point, done);
			}
		}

	};

	var evalCord = function(rect){
		console.log('Right: ' + rect.getRight());
		console.log('Left: ' + rect.getLeft());
		mapDistance = rect.getRight() - rect.getLeft(); 
		console.log(mapDistance);
		return config.searchDistance >= mapDistance;
	};

	

	return {
		setConfig: function(newConf){
			config = newConf;
			SH.set(nsBusStopHelper, newConf);
		},
		getConfig: function(){
			return config;
		},
		newConfig: function(){
			return newConfig();
		},
		get: function(hMap, done){
			if(!evalCord(hMap.getViewBounds())){
				done('Bounds to wide', null);
				return;
			}

			getBusStopsOnMap(hMap, function(err, data){
				if(err){
					done(err, data);
				} else {
					done(err, data);
				}
			});
		}
	}
})();