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

	var getBusStopsForRect = function(rect, done){
		getBusStops(rect.lat, rect.lng, function(err, data){
			if(err){
				console.log('Error getting busstops');
				console.log(err);
				done(err, null);
			} else {
				console.log('Data getting busstops');
				console.log(data);
				done(null, data);
			}
		});
	};

	var getBusStops = function(lat, lng, done){
		console.log('Getting busStops');

		$.ajax({
			url: 'http://stx-api.mybluemix.net/api/showStops',
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
		add: function(map){
			var valid = evalCord(map.getViewBounds());

			if(!valid){
				return;
			}

			getBusStopsForRect(map.getCenter(), function(err, data){
				if(!err){
					$.each(data.busStops, function(key, value){
						addBusStop(value);
					});
					console.log(store.get(nsBusStopCache));
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


var BusStopHelper = function(target){
	this.config = {
		target: target,
		searchDistance: 0.05
	};

	return {
		addAtCoordinate: function(Hmap){
			var valid = evalCord(map.getViewBounds());


			if(!valid){
				return;
			}

			getBusStopsForRect(map.getCenter(), function(err, data){
				if(!err){
					$.each(data.busStops, function(key, value){
						addBusStop(value);
					});
					console.log(store.get(nsBusStopCache));
				}
			});
		}
	}
}