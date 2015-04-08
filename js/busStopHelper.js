function BusStopHelper(){
	window.busStops = window.busStops || {};
	var searchDistance = 0.05;

	var addBus = function(bus){
		if(window.busStops && !window.busStops[busStop.id])
				window.busStops[bus]
	}

	var getBuses = function(rect){
		console.log('Getting buses');
	}

	var evalCord = function(rect){
		mapDistance = rect.getRight() - rect.getLeft(); 
		if(searchDistance >= mapDistance){
			getBuses(rect)
		}
	}

	return {
		add: function(rect){
			evalCord(rect);
		}
	}
}