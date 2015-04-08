function GraphicHelper(){
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
		}
	}
}