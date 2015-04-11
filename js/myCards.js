$(document).ready(function(){
    $('.information-bar').hide();
    var onBus = false;
    var cards = [{id:0, type:'cash',value:'250'},{id:1,type:'period',value:'5'}];
    var storage =$.localStorage;
    cards[0].value -= parseInt(storage.get('minusCash'));
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
            
            var spentAmount = storage.get('minusCash');
            storage.set('minusCash','0');
            console.log("spentAmount: " + spentAmount);
            var addAmount = $("#amount-selection0 option:selected").text();
            var currentAmount = $(".card-info0").text();
            var newAmount = parseInt(addAmount) + parseInt(currentAmount) - parseInt(spentAmount);
            $(".card-info0").empty();
            $(".card-info0").text(newAmount + " ");
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