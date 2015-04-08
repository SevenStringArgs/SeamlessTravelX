function BusStopHelper(){
	var nsBusCache = 'busCache';
	var storage = $.localStorage;
	storage.isEmpty(nsBusCache) && storage.set(nsBusCache, {});

	var searchDistance = 0.05;

	var addBus = function(bus){
		console.log('Add bus');
	}

	var getBusesForRect = function(rect, done){
		getBuses(rect.lat, rect.lng, function(err, data){
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
	}

	var getBuses = function(lat, lng, done){
		console.log('Getting buses');

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
	}

	var evalCord = function(rect){
		console.log('Right: ' + rect.getRight());
		console.log('Left: ' + rect.getLeft());
		mapDistance = rect.getRight() - rect.getLeft(); 
		return searchDistance >= mapDistance;
	}


	return {
		add: function(map){
			var valid = evalCord(map.getViewBounds());

			if(!valid){
				return;
			}

			getBusesForRect(map.getCenter(), function(err, data){
				if(!err){
					$.each(data, function(key, value){
						addBus(value);
					});
				}
			});
		}
	}
}