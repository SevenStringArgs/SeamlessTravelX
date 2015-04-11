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
		'<li class="message-preview" id="offerId-' + offer.id +'" >' +
			'<a href="#">' + 
				'<div class="media">' +
					'<span class="pull-left">' +
						'<img class="media-object" src="" alt="">' +
					'</span>' +
					'<div class="media-body">' +
						'<h5 class="media-heading"><strong class="companyName"></strong></h5>' +
						'<p class="small text-muted"><i class="fa fa-clock-o">Yesterday at 4:32 PM</i></p>' +
						'<p class="offerTag"></p>' +
					'</div>' +
				'</div>' +
			'</a>' +
		'</li>';

		return $.parseHTML(template);
	}
    	templates.cardItem = function(card){

		var cardtemplate = 
           '<div class="card" id="cardId-' + card.id + '">' + 
                '<div class="card-items-wrapper">' +
                    '<div class="slider">' +
                        '<img src="#" alt="">' +
                            '<img src="#" class="right" alt="">' + 
                    '</div>' +
                            '<div class="card-items">' +
                                '<span class="card-type-text">'; 
                                    if(card.type=='cash'){                                    
                                    cardtemplate+='Remaining Amount: ' + card.value;    
                                    }
                                    else{
                                    cardtemplate +='Remaining Time: ' + card.value + ' Days';    
                                    }
                                cardtemplate +=    
                                '</span>' +
                                '<br>' +
                                '<span class="card-info">' +
                                '</span>' +
                                '<div class="refill-button right" data-toggle="modal" data-target="#myModal">' +
                                     'Re-fill' +
                                '</div>' + 
                           '</div>' +
                    '</div>' +
               '</div>';

		return $.parseHTML(cardtemplate);
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
		},
        getCardTemplate: function(cardtemplate, obj){
			return templates[cardtemplate](obj);
		}
	}
})();