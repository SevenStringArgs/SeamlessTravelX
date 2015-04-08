function registerMapEvents(map){
	map.map.addEventListener('tap', function (evt) {
         // Log 'tap' and 'mouse' events:
         console.log(evt.type, evt.currentPointer.type);
     });
}


$(document).ready(function(){
	console.log('Ready');
	var gh = new GraphicHelper()
	var map = new NewMap();

	gh.registerStdSlick('.your-class')
	registerMapEvents(map);
	console.log(map);
});