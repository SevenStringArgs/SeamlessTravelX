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
           '<div class="card" id="cardId-' + card.id + '"><img class="jojo-card" src="../images/jojo.png" alt="" width="270" height="110" />' + 
                '<div class="card-items-wrapper">' +
                    '<div class="slider">' +
                    '</div>' +
                            '<div class="card-items">' +
                                '<span class="card-type-text">'; 
                                    if(card.type=='cash'){                                    
                                    cardtemplate+='Remaining Amount: ' + '<br><span class="card-info">' + card.value + ' kr</span>';    
                                    }
                                    else{
                                    cardtemplate +='Expires in: ' + '<br><span class="card-info">' + card.value + ' days </span>';    
                                    }
                                cardtemplate +=    
                                '</span>' +
                                '<br>' +
                                '<span class="card-info">' +
                                '</span>' +
                                '<div class="refill-button right" data-toggle="modal" data-target="#myModal-' + card.id + '">' +
                                     'Re-fill' +
                                '</div>' + 
                           '</div>' +
                    '</div>' +
               '</div>';

		return $.parseHTML(cardtemplate);
	} 
        templates.refillModelItem = function(card){

		var refillModelTemplate = 
        '<div class="modal fade" id="myModal-' + card.id + '" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">' +
            '<div class="modal-dialog">' +
                '<div class="modal-content">' +
                    '<div class="modal-header">' +
                        '<h4 class="modal-title" id="myModalLabel">Refill your card:</h4>' +
                    '</div>' +
                '<div class="modal-body">' +
            '<div class="modal-body-wrapper">';
            if(card.type=="cash"){
                refillModelTemplate += '<label for="amount-selection">Choose amount:</label>' +
                '<select name="amount-selection" id="" class="amount-selection form-control">' +
                    '<option value="">100</option>' +
                    '<option value="">200</option>' +
                    '<option value="">300</option>' +
                '</select>';     
            }
            else{
                                refillModelTemplate += '<label for="amount-selection">Choose amount of days:</label>' +
                '<select name="amount-selection" id="" class="amount-selection form-control">' +
                    '<option value="">10</option>' +
                    '<option value="">30</option>' +
                    '<option value="">60</option>' +
                '</select>';    
            }
            refillModelTemplate += '</div>' +
              '<div class="modal-footer">' +
                '<button type="button" class="left btn-accept" id="button-accept" data-dismiss="modal">Re-fill card</button>' +
                '<button type="button" class="left btn-deny" data-dismiss="modal">Cancel</button>' +
              '</div>' +
            '</div>' +
           '</div>' +
          '</div>' +
        '</div>';
		return $.parseHTML(refillModelTemplate);
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
		},
        getRefillModelTemplate: function(refillModelTemplate,obj){
			return templates[refillModelTemplate](obj);
		}
	}
})();