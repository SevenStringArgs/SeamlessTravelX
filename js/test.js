var bsHelper = undefined;

function registerMapEvents(map){
	map.map.addEventListener('tap', function (evt) {
         // Log 'tap' and 'mouse' events:
     });

	map.map.addEventListener('dragend', function(evt){
		bsHelper.add(evt.target);
	});

	map.map.addEventListener('mapviewchangeend', function(evt){
		bsHelper.add(evt.target);
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