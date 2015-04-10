var GraphicHelper = (function(){
	var stdSlick = {
		accessibility: true,
		daptiveHeight: true,
		arrows: true,
		dots: true,
		centerMode: true
	};

	return {
		getStdSlick: function(){
			return stdSlick;
		},
		registerStdSlick: function(slickId){
			$(slickId).slick(stdSlick);
		},
		setActiveNavbar: function(navbarId){
			$('.active').removeClass('active');
			$('#' + navbarId).addClass('active');
		},
		printMapPoint: function(point){
			console.log('Lng: ' + point.lng + 'Lat: ' + point.lat);
		},
		printRect: function(rect){
			console.log();
		}
	}
})();