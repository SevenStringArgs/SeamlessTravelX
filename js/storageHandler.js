var SH = (function(){
	var store = $.localStorage;

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

