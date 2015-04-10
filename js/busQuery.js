var BusQuery = (function(){
	var base = 'http://www.labs.skanetrafiken.se/v2.2/';

	var getRoute = function(){
		$.ajax({
			url: base + 'resultspage.asp?cmdaction=next&selPointFr=malm%F6%20C|80000|0&selPointTo=landskrona|82000|0&LastStart=2015-04-10%2016:38',

			success: function(data){
				console.log(data);
			},
			error: function(err){
				console.log(err);
			}
		});
	};

	return {
		getRoute: function(){
			getRoute();
		}
	}
})();