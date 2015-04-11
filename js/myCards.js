$(document).ready(function(){

	var offers = OfferStore.get();
	console.log(offers);
    $(".sucess-message").hide();
    $('.slickslider').slick();
    
	$.each(offers, function(key, offer){
		var template = GraphicHelper.getTemplate('notificationItem', offer)
		console.log(template);
		var ul = $(document).find('#notificationDropDown');
		$('#notificationDropDown').append(template);
		var theLi = $('#notificationDropDown').find('#offerId-' + offer.id);
		theLi.find('strong').text(offer.company);
		theLi.find('.offerTag').text(offer.offer);
	});
    
    $("#enterButton").click(function(){
        $(".sucess-message").show();
        $(".message-thick").text("Card Scanned!");
        
    });
    
    $("#exitButton").click(function(){
        $(".sucess-message").show();
        $(".message-thick").text("Bus Exited!");
    });
    $("#menu-toggle").click(function(e) {
        e.preventDefault();
        $("#wrapper").toggleClass("toggled");
    });
});