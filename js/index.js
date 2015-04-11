$(document).ready(function(){
	console.log('Ready');
	var loops = [];
	var loop;
	var offers = OfferStore.get();
	var selectedLine = undefined;
    var onBus = false;
	console.log(offers);

	$.each(offers, function(key, offer){
		var template = GraphicHelper.getTemplate('notificationItem', offer)
		console.log(template);
		var ul = $(document).find('#notificationDropDown');
		$('#notificationDropDown').append(template);
		var theLi = $('#notificationDropDown').find('#offerId-' + offer.id);
		theLi.find('strong').text(offer.company);
		theLi.find('.offerTag').text(offer.offer);
	});

	$('#testNotification').on('click', function(){
		$('#dropDownImg').removeClass('glyphicon-bell');
		$('#dropDownImg').addClass('glyphicon-info-sign');
	});

	$('#menu-toggle').click(function(e) {
		e.preventDefault();
		$("#wrapper").toggleClass("toggled");
	});
    
	$('#notificationToggle').on('click', function(){
		$('#dropDownImg').addClass('glyphicon-bell');
		$('#dropDownImg').removeClass('glyphicon-info-sign');

		if($('.bus-search-input').css('display') === 'none')
			$('.bus-search-input').fadeIn();
		else 
			$('.bus-search-input').fadeOut();

	});

	$('#notificationToggle').focusout(function(){
		$('.bus-search-input').fadeIn();
	});  

	console.log('Ready');
	var map = new Map();
	var drawOnMap = { start: undefined, end: undefined };
	var bookmarker = new Bookmarker();
	var drawCachedBusStops = function(busStops){
		for(key in busStops){
			drawNewBusStop(busStops[key]);
		}
	};

	var travelListener = function(travelObj){
		console.log('****** Travel Changed *****')
		console.log(travelObj);
		map.setTravelObj(travelObj);
        if(travelObj.busId != undefined){
            onBus = true;
            $('.bus-search-input').hide();
            $('#myModalScanned').modal('show');
            $('.information-bar').show();
            timerFunction(200);
        }  
        else {
            onBus = false;
            $('.information-bar').hide();
            $('.bus-search-input').hide();  
            $('#myModalExit').modal('show');
                
        };
        
	};
    $("#button-accept").click(function(){
        $('.bus-search-input').show();   
    })
    
    $("#button-exit-accept").click(function(){
        $('.bus-search-input').show();   
    })
    
	var removeBusStop = function(busStop){
		map.removeBusStop(busStop);
	};

	var drawNewBusStop = function(busStop){
		map.addBusStop(busStop);
	};

	var drawNewBus = function(bus){
		map.addBus(bus);
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

	$('.bus-search-input').keypress(function(e){
		if(e.which === 13){
			// alert(e);
			console.log(e);
			var busNr = $('.bus-search-input').val();
			console.log(busNr);

			map.removeLastRoute();

			if(isNaN(busNr) || !busNr){
				BusHelper.setRoute(undefined);
				drawCachedBusStops(BusStopStorage.getAll());
			} else {
				if(!map.getTravelObject().busId){
					map.filter = busNr;
					BusHelper.setRoute(busNr);	
					map.removeAllBuses();
					map.showBusRoute(busNr);
					setTimeout(function(buses) {
					 	console.log("Agiain");
					 	map.removeAllBuses();
					 }, 00);
				}
			}
		}
	});	

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

	$('#port-nr').val(TravelX.getConfig().port);

	$('#testApi').on('click', function(){
		BusQuery.getRoute();
	});

	if(!TravelX.getConfig().local && $('#global').hasClass('notCurrent')){
		$('.toggle-endPoint').toggleClass('notCurrent');
	}

	$.each(offers, function(key, offer){
		var template = GraphicHelper.getTemplate('notificationItem', offer)
		console.log(template);
		var ul = $(document).find('#notificationDropDown');
		$('#notificationDropDown').append(template);
		var theLi = $('#notificationDropDown').find('#offerId-' + offer.id);
		theLi.find('strong').text(offer.company);
		theLi.find('.offerTag').text(offer.offer);
	});

	BusHelper.onAddedBus(drawNewBus);
	BusHelper.addTravelListener(travelListener);
	BusStopStorage.subscribeBusStopAdded(drawNewBusStop);
	BusStopStorage.subscribeBusStopRemoved(removeBusStop);
	drawCachedBusStops(BusStopStorage.getAll());
	registerMapEvents(map);
	BusHelper.start();

	// clearInterval(loop);

	loop = setInterval(function () {
		BusHelper.get(function(err, data){
			if(err){
				console.log('error getting buses');
			} else {
				console.log('Got buses');
			}
		});
	}, 1000);
    
    function timerFunction(secondsToDestination) {
    var seconds = secondsToDestination;
    var refreshIntervalId = setInterval(function(){
        var minutes =seconds/60
        var timestring ='';
        if (minutes >5){
            timestring = 'Min: ' + parseInt(minutes);
        }
        else if(minutes > 1){
            timestring = 'Min: ' + parseInt(minutes) + ' Sec: ' + seconds%60;
        }
        else timestring = 'Sec: ' + seconds;
        $('.information-bar').html(timestring);
        seconds -= 1;
        if(!onBus){
            clearInterval(refreshIntervalId);  
        }
    }, 1000);
    }

	console.log(offers);
});