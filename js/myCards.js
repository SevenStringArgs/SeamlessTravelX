$(document).ready(function(){
    $('.information-bar').hide();
    var onBus = false;
    var storage =$.localStorage;
    if (storage.isEmpty('cash')) {
        storage.set('cash', 100);
    }
    var cards = [{id:0, type:'cash',value:storage.get('cash')},{id:1,type:'period',value:'5'}];
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
            var currentAmount = storage.get('cash');
            var newAmount = parseInt(addAmount) + parseInt(currentAmount);
            $(".card-info0").empty();
            $(".card-info0").text(newAmount + " ");
            storage.set('cash',parseInt(newAmount));
        }
        else console.log("Fel Slide");

        
    }
    $('#btnReFill0').click(function(){
        refillCard();
    });
    
    $("#button-accept").click(function(){
        $("#successModal").modal();   
    })

    $("#menu-toggle").click(function(e) {
        e.preventDefault();
        $("#wrapper").toggleClass("toggled");
    });
});