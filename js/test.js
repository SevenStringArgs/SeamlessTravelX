var bsHelper = undefined;

function registerMapEvents(map){
	map.map.addEventListener('tap', function (evt) {
        var coord = map.map.screenToGeo(evt.currentPointer.viewportX, evt.currentPointer.viewportY);
    	console.log('Clicked at ' + Math.abs(coord.lat.toFixed(7)) + ' ' + Math.abs(coord.lng.toFixed(7)));
     });

	map.map.addEventListener('mapviewchangeend', function(evt){
		bsHelper.add(evt.target);
	});

	map.map.addEventListener('longpress', function(evt){
		var coord = map.map.screenToGeo(evt.currentPointer.viewportX, evt.currentPointer.viewportY);
    	console.log('Clicked at ' + Math.abs(coord.lat.toFixed(7)) + ' ' + Math.abs(coord.lng.toFixed(7)));
  });
}
         

$(document).ready(function(){
	console.log('Ready');
	var gh = new GraphicHelper()
	var map = new NewMap();
	bsHelper = new BusStopHelper();
	bookmarker = new Bookmarker();



	gh.registerStdSlick('.your-class')
	registerMapEvents(map);
});