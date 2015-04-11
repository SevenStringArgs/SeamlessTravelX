
var BusHelper = (function(){

	var listeners = {};

	var getBuses = function(line, done){
		console.log('Getting buses');

		$.ajax({
			url: TravelX.url('/getBuses'),
			type: 'GET',
			headers: { Accept : "application/json; charset=utf-8"}, 
			data: {'id': line},
			success: function(data){
				console.log('Got bus data');
				done(null, data);
				
				$.each(data, function (n, bus) {
					$.each(listeners, function (n, listener) {
						listener(bus);
					};
				};
			},
			error: function(error){
				console.log('Got buses error');
				done(error, null)
			}
		});
	};

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

	onAddedBus : function(event){
		listeners.push(event);
	}
}
})();