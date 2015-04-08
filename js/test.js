var bsHelper = undefined;

function registerMapEvents(map){
	map.map.addEventListener('tap', function (evt) {
         // Log 'tap' and 'mouse' events:
     });

	map.map.addEventListener('dragend', function(evt, a, b, c){
		bsHelper.add(evt.target.getViewBounds());
	});
}


$(document).ready(function(){
	console.log('Ready');
	var gh = new GraphicHelper()
	var map = new NewMap();
	bsHelper = new BusStopHelper();

	gh.registerStdSlick('.your-class')
	registerMapEvents(map);
});