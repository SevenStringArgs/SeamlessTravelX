var SH = (function(){
	var store = $.localStorage;
	var eventPub = {};
	// store.isEmpty(nsBusStopCache) && store.set(nsBusStopCache, {count: 0});
	
	var name = "It's name";


	return {
		get: function(ns){
			return store.get(ns);
		},
		set: function(ns, value){
			store.set(ns, value);
		},
		add: function(ns, func){
			store.set(ns, func(store.get(ns)));
		},
		remove: function(ns, func){
			store.set(ns, func(store.get(ns)));
		}
	}
})();

