$(document).ready(function(){
	// console.log('Ready');
	var loops = [];
	var loop;
	var offers = OfferStore.get();
	var selectedLine = undefined;
    var onBus = false;
    var traveler = undefined;
    var prevPoint = {};
    var onBus = false;
    var count = 0;
    var storage = $.localStorage;
    $('.information-bar').hide();
	// console.log(offers);

	$.each(offers, function(key, offer){
		var template = GraphicHelper.getTemplate('notificationItem', offer)
		// console.log(template);
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

	// console.log('Ready');
	var map = new Map();
	var drawOnMap = { start: undefined, end: undefined };
	var bookmarker = new Bookmarker();
	var drawCachedBusStops = function(busStops){
		for(key in busStops){
			drawNewBusStop(busStops[key]);
		}
	};

	var showNotificationSymbol = function(){
		$('#notificationToggle').append('<div class="notified"></div>');
	}

	var getOn = function(){
		count = 0;
		onBus = true;
		map.setTravelObj({busId:'bus6-1'});
		console.log('GET ON!');
		$('.bus-search-input').hide();
        $('#myModalScanned').modal('show');
        timerFunction(38);
	    $('.information-bar').show();
  		map.showBusRoute(6);
	}

	var getOff = function(){
        
		count = 0;
		onBus = false;
		map.setTravelObj({});
		console.log('GET OFF!');
        var currentCash = storage.get('cash');
        var newCash = parseInt(currentCash) - 53;
        storage.set('cash',parseInt(newCash));
		  $('.information-bar').hide();
          $('.bus-search-input').hide();
          $('.current-saldo').html(storage.get('cash'));
          $('#myModalScanned').modal('hide');
          $('#myModalExit').modal('show');
          map.removeLastRoute();
          map.showBusRoute(6);
          // drawCachedBusStops(BusStopStorage.getAll());
          showNotificationSymbol();
	}

	var busAdded = function(bus){
		if(bus.id === 'bus6-1'){
			if(traveler && traveler.busId){
				if(prevPoint.lat === bus.lat && prevPoint.lon === bus.lon && !onBus){

					count++
					console.log('Get on count' + count);
					console.log(prevPoint.lat + " : " + bus.lat);
					console.log(prevPoint.lon + " : " + bus.lon);
					console.log();
					if(count === 3){
						getOn();
					}
				} else{
					count = 0;
					prevPoint.lat = bus.lat;
					prevPoint.lon = bus.lon;
				}
			} else {
				if(prevPoint.lat === bus.lat && prevPoint.lng === bus.lng && onBus){
					count++
					console.log('Get off count' + count);
					if(count === 3){
						getOff();
					}
				} else {
					count = 0;
					prevPoint.lat = bus.lat;
					prevPoint.lon = bus.lon;
				}
			}
		}
	}

	var travelListener = function(travelObj){

		traveler = travelObj;
		console.log('Traveler');
		console.log(traveler);

		// console.log('****** Travel Changed *****')
		// console.log(travelObj);
		// map.setTravelObj(travelObj);
  //       if(travelObj.busId != undefined){
  //           onBus = true;
  //           $('.bus-search-input').hide();
  //           $('#myModalScanned').modal('show');
  //           $('.information-bar').show();
  //           map.showBusRoute(6);
  //           timerFunction(200);
  //       }  
  //       else {
  //           onBus = false;
  //           $('.information-bar').hide();
  //           $('.bus-search-input').hide();  
  //           $('#myModalExit').modal('show');
  //           map.removeLastRoute();
  //           drawCachedBusStops(BusStopStorage.getAll());
  //           showNotificationSymbol();
  //       };
        
	};
    $("#button-accept").click(function(){
        $('.bus-search-input').show();   
    })
    $("#button-exit-accept").click(function(){
        $('.bus-search-input').show();   
    })
    
    $("#button-exit-accept-2").click(function(){
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
			// console.log(evt.target)
			BusStopHelper.get(evt.target, function(err, data){
				if(err){
					// console.log('error getting busstops');
				} else {
					// console.log('Got buses');
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
			// console.log(drawOnMap);
			// console.log(evt.originalEvent);
		});
	};
    $('.information-bar').click(function(){
        $('.bus-search-input').hide();
        $('#myModalTrip').modal('show');
        
        
    });
    
	$('.bus-search-input').keypress(function(e){
		if(e.which === 13){
			// alert(e);
			// console.log(e);
			var busNr = $('.bus-search-input').val();
			// console.log(busNr);

			map.removeLastRoute();

			if(isNaN(busNr) || !busNr){
				map.filter = '';
				BusHelper.setRoute(undefined);
				drawCachedBusStops(BusStopStorage.getAll());
			} else {
				if(!map.getTravelObject().busId){
					map.filter = busNr;
					BusHelper.setRoute(busNr);	
					map.removeAllBuses();
					map.showBusRoute(busNr);
					setTimeout(function(buses) {
					 	// console.log("Agiain");
					 	map.removeAllBuses();
					 }, 500);
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
		// console.log(template);
		var ul = $(document).find('#notificationDropDown');
		$('#notificationDropDown').append(template);
		var theLi = $('#notificationDropDown').find('#offerId-' + offer.id);
		theLi.find('strong').text(offer.company);
		theLi.find('.offerTag').text(offer.offer);
	});

	BusHelper.onAddedBus(drawNewBus);
	BusHelper.onAddedBus(busAdded);
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
				// console.log('error getting buses');
			} else {
				// console.log('Got buses');
			}
		});
	}, 1000);
    
    function timerFunction(secondsToDestination) {
    var seconds = secondsToDestination;
        console.log(seconds.toString.length);
    var refreshIntervalId = setInterval(function(){
        var minutes =seconds/60
        var timestring ='';
        if (minutes >5){
            timestring = parseInt(minutes);
        }
        else if(minutes > 1){
            timestring =parseInt(minutes) + ':' + seconds%60;
        }
        elsetimestring = seconds;
        $('.information-bar').html(timestring);
        $('.timer').html(timestring);
        seconds -= 1;
        if(!onBus){
            clearInterval(refreshIntervalId);  
        }
    }, 1000);
    }

	// console.log(offers);
});