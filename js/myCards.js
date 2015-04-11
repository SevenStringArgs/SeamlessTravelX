$(document).ready(function(){
    $('.information-bar').hide();
    var onBus = false;
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
    function timerFunction(secondsToDestination) {
        $('.information-bar').show();
        var seconds = secondsToDestination;
        var refreshIntervalId = setInterval(function(){
            var minutes =seconds/60
            var timestring ='';
            if (minutes >5){
                timestring = 'Min: ' + parseInt(minutes);
            }
            else if(minutes > 1){
                timestring = 'Min: ' + parseInt(minutes) + ' Sec: ' + seconds%60;
            }
            else timestring = 'Sec: ' + seconds;
            console.log(onBus);
            $('.information-bar').html(timestring);
            seconds -= 1;
            if (onBus==false){
                clearInterval(refreshIntervalId);
                 $('.information-bar').html("");
                 $('.information-bar').hide();    
            } 
        }, 1000);
    }
});