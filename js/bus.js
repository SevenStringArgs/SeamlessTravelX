
var BusHelper = (function(){
	var travelBus = { busId: undefined };
	var listeners = [];
	var travelListeners = [];

	var getBuses = function(line, done){
		console.log('Getting buses');

		$.ajax({
			url: TravelX.url('/getAllBuses'),
			type: 'GET',
			headers: { Accept : "application/json; charset=utf-8"}, 
			data: {'id': line},
			success: function(data){
				console.log('Got bus data');
				
				$.each(data, function (n, bus) {
					if(!travelBus.busId && bus.onBus){
						travelBus.busId = bus.id;
						$.each(travelListeners, function(key, listener) { listener(travelBus); });
					} else if(travelBus.busId === bus.id && !bus.onBus){
						travelBus.busId = undefined;
						$.each(travelListeners, function(key, listener) { listener(travelBus); });
					}

					$.each(listeners, function (n, listener) {
						listener(bus);
					});
				});

				done(null, data);
			},
			error: function(error){
				console.log('Got buses error');
				done(error, null)	
			}
		});
	};


	// var getBusRoutes = function(){
	// 	$.ajax({
	// 		url:
	// 	})
	// };

	var startBusService = function(){
			$.ajax({
			url: TravelX.url('/map/start'),
			type: 'GET',
			headers: { Accept : "application/json; charset=utf-8"}, 
			success: function(data){
				console.log(data);
				//done(null, data);
			},
			error: function(error){
				console.log('Start bus service error');
				//done(error, null)
			}
		});
	}

return {
	start : function(){
		startBusService();
	},

	addBus : function(){

	},

	get : function(line, done){
		getBuses(line, done);
	},

	onAddedBus : function(e){
		listeners.push(e);
	},

	addTravelListener: function(e){
		travelListeners.push(e);
	}
}
})();