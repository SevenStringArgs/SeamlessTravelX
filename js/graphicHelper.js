var GraphicHelper = (function(){
	var stdSlick = {
		accessibility: true,
		daptiveHeight: true,
		arrows: true,
		dots: true,
		centerMode: true
	};


	var templates = {};

	templates.notificationItem = function(offer){

		var template = 
		'<li class="message-preview">' +
			'<a href="#">' + 
				'<div class="media">' +
					'<span class="pull-left">' +
						'<img class="media-object" src="" alt="">' +
					'</span>' +
					'<div class="media-body">' +
						'<h5 class="media-heading"><strong class="companyName"></strong></h5>' +
						'<p class="small text-muted"><i class="fa fa-clock-o">Yesterday at 4:32 PM</i></p>' +
						'<p></p>' +
					'</div>' +
				'</div>' +
			'</a>' +
		'</li>';

		$(template).find('.companyName').html(offer.company);


		return $.parseHTML(template);
	}
	


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
		},
		getTemplate: function(template, obj){
			return templates[template](obj);
		}
	}
})();