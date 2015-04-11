$(document).ready(function(){
    
   
    
    var cards = [{id:0, type:'cash',value:'250'},{id:1,type:'period',value:'5'}];
	console.log(cards);
    $.each(cards, function(key,card){
        var template = GraphicHelper.getCardTemplate('cardItem', card)
        console.log(template)
        $('.slickslider').append(template);
        var modelTemplate = GraphicHelper.getRefillModelTemplate('refillModelItem',card)
        console.log(modelTemplate);
        $('.graphicModel').append(modelTemplate);
    })
    $('.sucess-message').hide();
    $('.slickslider').slick({
        dots : true
    });
    
    $("#enterButton").click(function(){
        $(".sucess-message").show();
        $(".message-thick").text("Card Scanned!");
    });
    $("#button-accept").click(function(){
        $("#successModal").modal();
    })
    $("#exitButton").click(function(){
        $(".sucess-message").show();
        $(".message-thick").text("Bus Exited!");
    });
    $("#menu-toggle").click(function(e) {
        e.preventDefault();
        $("#wrapper").toggleClass("toggled");
    });
});