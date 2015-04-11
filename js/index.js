$(document).ready(function(){
	var loops = [];
	var loop;
	var offers = OfferStore.get();
	var selectedLine = undefined;
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

	$('.bus-search-input').keypress(function(e){
		if(e.which === 13){
			alert(e);
			console.log(e);
			var busNr = $('.bus-search-input').val();
			console.log(busNr);
		}
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
            $('.bus-search-input').hide();
            $('#myModalScanned').modal('show');  
        }  
        else {
              $('#myModalExit').modal('show');
        };
        
	};


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

	BusHelper.onAddedBus(drawNewBus);
	BusHelper.addTravelListener(travelListener);
	BusHelper.start();

	clearInterval(loop);
	loop = setInterval(function () {
		BusHelper.get(selectedLine, function(err, data){
			if(err){
				console.log('error getting buses');
			} else {
				console.log('Got buses');
			}
		});
	}, 150);


	function findABus() {
    //busnumber = $("#busnumber").val();
    removeAllBuses();
    executeGetBus(busnumber);
}




});