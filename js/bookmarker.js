function Bookmarker(){
	var nsBookmark = 'routeBookmarks';
	var counter = 0;
	var storage = $.localStorage;
	storage.isEmpty(nsBookmark) && storage.set(nsBookmark, [])

	return {
		getAll: function(){
			return storage.get(nsBookmark);
		},
		get: function(id){
			$.each(storage.get(nsBookmark), function(key, value){
				if(id === value.id){
					return value;
				}
			});
			return null;
		},
		add: function(route){
			route.id = counter++;
			var routes = storage.get(nsBookmark);
			routes.push(route);
			storage.set(nsBookmark, routes);
		}
	}
}	


function Route(name, to, from) {
	this.name = name;
	this.to = to;
	this.from = from; 
}