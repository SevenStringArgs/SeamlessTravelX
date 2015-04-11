$(document).ready(function(){
    $('.information-bar').hide();
    var onBus = false;
    var cards = [{id:0, type:'cash',value:'250'},{id:1,type:'period',value:'5'}];
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
    var refillCard = function(){
        var slickSlideId = $('.slickslider').slick('slickCurrentSlide');
        if(slickSlideId == 0){
            var addAmount = $("#amount-selection0 option:selected").text();
            var currentAmount = $(".card-info0").text();
            var newAmount = parseInt(addAmount) + parseInt(currentAmount);
            $(".card-info0").empty();
            $(".card-info0").text(newAmount + " ");
        }
        else console.log("Fel Slide");

        
    }
    $('#btnReFill0').click(function(){
        refillCard();
    });
    $("#enterButton").click(function(){
        $(".sucess-message").show();
        $(".message-thick").text("Card Scanned!");
        timerFunction(60);
        onBus = true;
    });
    $("#button-accept").click(function(){
        $("#successModal").modal();

        
    })
    $("#exitButton").click(function(){
        $(".sucess-message").show();
        $(".message-thick").text("Bus Exited!");
        onBus = false;
    });
    $("#menu-toggle").click(function(e) {
        e.preventDefault();
        $("#wrapper").toggleClass("toggled");
    });
});