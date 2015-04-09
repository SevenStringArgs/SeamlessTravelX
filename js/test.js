$(document).ready(function(){
	console.log('Ready');
	var map = new NewMap();
	
	var bookmarker = new Bookmarker();

	var drawCachedBusStops = function(busStops){
		for(key in busStops){
			drawNewBusStop(busStops[key]);
		}
	};

	var removeBusStop = function(busStop){
		map.removeBusStop(busStop);
	};

	var drawNewBusStop = function(busStop){
		map.addBusStop(busStop);
	};

	var registerMapEvents = function(map){
		map.map.addEventListener('tap', function (evt) {
			var coord = map.map.screenToGeo(evt.currentPointer.viewportX, evt.currentPointer.viewportY);
			console.log('Clicked at ' + Math.abs(coord.lat.toFixed(7)) + ' ' + Math.abs(coord.lng.toFixed(7)));
		});

		map.map.addEventListener('mapviewchangeend', function(evt){
			console.log(evt.target)
			BusStopStorage.add(evt.target);
		});

		map.map.addEventListener('longpress', function(evt){
			var coord = map.map.screenToGeo(evt.currentPointer.viewportX, evt.currentPointer.viewportY);
			console.log('Clicked at ' + Math.abs(coord.lat.toFixed(7)) + ' ' + Math.abs(coord.lng.toFixed(7)));
		});
	};

	$('#clearLocalStorage').on('click' ,function(){
		BusStopStorage.clearStorage();
	});

	$('.toggle-endPoint').on('click', function(){
		TravelX.toggleLocal();
		$('.toggle-endPoint').toggleClass('notCurrent');
	});

	$( '#port-nr').on('change', function() {
  		var newConf = TravelX.getConfig();
  		newConf.port = $(this).val();
  		TravelX.setConfig(newConf);
	});

	if(!TravelX.getConfig().local && $('#global').hasClass('notCurrent')){
		$('.toggle-endPoint').toggleClass('notCurrent');
	}

	$('#port-nr').val(TravelX.getConfig().port);

	BusStopStorage.subscribeBusStopAdded(drawNewBusStop);
	BusStopStorage.subscribeBusStopRemoved(removeBusStop);
	drawCachedBusStops(BusStopStorage.getAll());
	registerMapEvents(map);

});