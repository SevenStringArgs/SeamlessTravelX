$(document).ready(function(){

	var offers = OfferStore.get();
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



    $("#menu-toggle").click(function(e) {
        e.preventDefault();
        $("#wrapper").toggleClass("toggled");
    });
});