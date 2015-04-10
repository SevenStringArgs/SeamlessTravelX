var SH = (function(){
	var store = $.localStorage;
	var eventPub = {};

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
		},
		has: function(ns){
			return !store.isEmpty(ns);
		}
	}
})();




var TravelX = (function(){
	var nsConfig = 'endPointConfig';
	var config = {
		local: false,
		port: 9080,
		apiBase: '/api',
		endPoints: ['http://localhost', 'http://stx-api.mybluemix.net']
	};

	!SH.has(nsConfig) && SH.set(nsConfig, config)
	config = SH.get(nsConfig);

	return {
		toggleLocal: function(){
			var conf = this.getConfig();
			conf.local = !conf.local;
			this.setConfig(conf);
		},
		setConfig: function(newConfig){
			config = newConfig;
			SH.set(nsConfig, config);
		},
		getConfig: function(){
			return config;
		},
		url: function(apiMetod){
			return (config.local ? config.endPoints[0] + ':' + config.port: config.endPoints[1]) + config.apiBase + (apiMetod ? apiMetod : '');
		}
	}
})();


