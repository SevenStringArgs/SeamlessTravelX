var loops = [];
var loop;

$(document).ready(function(){
	console.log('Ready');
	var map = new Map();

	var drawOnMap = { start: undefined, end: undefined };
	
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
			var rect = map.map.getViewBounds();
			
		});

		map.map.addEventListener('mapviewchangeend', function(evt){
			console.log(evt.target)
			BusStopHelper.get(evt.target, function(err, data){
				if(err){
					console.log('error getting busstops');
				} else {
					console.log('Got buses');
				}
			});
		});

		map.map.addEventListener('longpress', function(evt){
			if(drawOnMap.start && drawOnMap.end){
				drawOnMap.start = drawOnMap.end = undefined;
			} else if(drawOnMap.start){
				// drawOnMap.end =
				drawOnMap.draw(); 
			} else {
				// drawOnMap.start = 
			}
			console.log(drawOnMap);
			console.log(evt.originalEvent);
		});
	};

	$('#clearLocalStorage').on('click' ,function(){
		BusStopStorage.clearStorage();
	});

	$('.toggle-endPoint').on('click', function(){
		TravelX.toggleLocal();
		$('.toggle-endPoint').toggleClass('notCurrent');
	});


	$('#port-nr').on('change', function() {

  		var newConf = TravelX.getConfig();
  		newConf.port = $(this).val();
  		TravelX.setConfig(newConf);
	});

	$('#testApi').on('click', function(){
		BusQuery.getRoute();
	});

	if(!TravelX.getConfig().local && $('#global').hasClass('notCurrent')){
		$('.toggle-endPoint').toggleClass('notCurrent');
	}

	$('#port-nr').val(TravelX.getConfig().port);

	BusStopStorage.subscribeBusStopAdded(drawNewBusStop);
	BusStopStorage.subscribeBusStopRemoved(removeBusStop);
	drawCachedBusStops(BusStopStorage.getAll());
	registerMapEvents(map);

    BusHelper.start();

    clearInterval(loop);
    loop = setInterval(function () {
        BusHelper.get(3, function(err, data){
		if(err){
				console.log('error getting buses');
			} else {
				console.log('Got buses');

			}
	});
    }, 150);
});


function findABus() {
    //busnumber = $("#busnumber").val();
    removeAllBuses();
    executeGetBus(busnumber);
}

