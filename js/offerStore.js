var OfferStore = (function(){
	var store = $.localStorage;
	var nsOffer = 'offerCache';
	var listeners = [];
	var offersStart = [{id: 0, offer: 'Coffee 10% off', company: 'Pressbyrån'}, {id: 1, offer: 'Coca-Cola 15% off', company: '7-Eleven'}, {id: 2, offer: 'Big Mac 15% off', company: 'McDonalds'}];
	store.isEmpty(nsOffer) && store.set(nsOffer, offersStart)

	return {
		get: function(){
			return store.get(nsOffer);
		},
		set: function(newOffers){
			store.set(nsOffer, newOffers);
		},
		remove: function(remove){
			var newOffers = $.map(store.get(nsOffer), function(offer){
				if(remove.id !== offer.id)
					return offer;
			});

			$.each(listeners, function(key, listener){
				listener('remove' ,remove);
			});

			store.set(nsOffer, newOffers);
			return newOffers;
		},
		add: function(newOffer){
			var offers = store.get(nsOffer)
			offers.push(newOffer);
			store.set(nsOffer, offers);

			$.each(listeners, function(key, listener){
				listener('add', newOffer);
			});

			return offers;
		},
		addListener: function(listener){
			listeners.push(listener);
		}
	}
})();