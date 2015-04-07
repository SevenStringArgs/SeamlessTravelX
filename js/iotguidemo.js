var loop;
var busWithPassenger = null;
var markedBusStops = [];
var minutesUntilDestination = 3;
var durationBetweenMinutes = 90;
var currentDuration = 0;
var isTravelling;
var busnumber;

$(document).ready(function () {
    // var busStops = [];
    startDemo();
    $.getJSON("/api/map/start", function (data) {
    });

    map.addEventListener("dragend", function (e) {
        updateBusStops();
    }, false);
//    getLocation();
});

function getLocation() {
    //get the geolocation of the device
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}
function showPosition(position) {
    //move the map to the device location
    map.setCenter({lat: position.coords.latitude, lng: position.coords.longitude});
    updateBusStops();
}

function updateBusStops() {
    //get the bus stops at the map or device location
    var myMapCenter = map.getViewBounds().getCenter();
    var centerLat = myMapCenter.lat;
    var centerLng = myMapCenter.lng;
    $.getJSON("/api/showStops?lat=" + centerLat + "&lng="
    + centerLng, function (fromServer) {
        displayBusStopsOnMap(fromServer);
    });
}

function removeAllObjects() {
    //removes all objects on map
    map.getObjects().forEach(function (obj) {
        map.removeObject(obj);
    });
}

function displayBusStopsOnMap(busStops) {
    // Clears all the remaining objects on map
    removeAllBusStops();
    // check if there is a filter or not
    // Loops through all the elements in busStops
    $.each(busStops, function (n, busStop) {
        $.each(busStop, function (n, busStopDetails) {
            //Use green bus stop marker if it is either start or destination
            var busStopToUse;
            var marked = false;
            for (var i = 0; i < markedBusStops.length; i++) {
                if (markedBusStops[i] == busStopDetails.id) {
                    marked = true;
                }
            };
            if (marked) {
                busStopToUse = busstopGreen;
            } else {
                busStopToUse = busstopRed;
            }
            var marker = new H.map.Marker({
                    lng: busStopDetails.longitude,
                    lat: busStopDetails.latitude
                }, {
                    icon: busStopToUse
                }
            );

            /*************/
            marker.isBus = false;
            map.addObject(marker);

            var bubble = new H.ui.InfoBubble({
                lng: busStopDetails.longitude,
                lat: busStopDetails.latitude + 0.0004
            }, {
                content: '<h2>'
                + busStopDetails.name + '</h2>'
                + '</p>'
            });
            //Hover eventhandler for information bubble
            marker.addEventListener("pointerenter", function (evt) {
                ui.addBubble(bubble);
            });
            marker.addEventListener("pointerleave", function (evt) {
                var delay = 1000;//1 seconds
                setTimeout(function () {
                    ui.removeBubble(bubble);
                    //your code to be executed after 1 seconds
                }, delay);
            });
        });
    });
}

function displayFilteredBusStopsOnMap() {
    // Clears all the remaining objects on map
    removeAllBusStops();
    var myMapCenter = map.getViewBounds().getCenter();
    var centerLat = myMapCenter.lat;
    var centerLng = myMapCenter.lng;
    $.getJSON("/api/showStops?lat=" + centerLat + "&lng="
    + centerLng, function (busStops) {
        $.each(busStops, function (n, busStop) {
            $.each(busStop, function (n, busStopDetails) {
                var filter = ["81018 ", "81216 "];
                // looping through the applied filter array
                for (i = 0; i < filter.length; i++) {
                    if (filter[i] == busStopDetails.id) {
                        var marker = new H.map.Marker({
                            lng: busStopDetails.longitude,
                            lat: busStopDetails.latitude
                        }, {
                            icon: busstopRed
                        });
                        var ui = new mapsjs.ui.UI(map);
                        map.addObject(marker);

                        var bubble = new H.ui.InfoBubble({
                            lng: busStopDetails.longitude,
                            lat: busStopDetails.latitude + 0.0004
                        }, {
                            content: '<h2>'
                            + busStopDetails.name + '</h2>'
                            + '</p>' + '<img src="washingmachine.jpg" alt="Mountain View" style="width:36px;height:36px">'
                        });

                        marker.addEventListener("pointerenter", function (evt) {

                            ui.addBubble(bubble);
                        });

                        marker.addEventListener("pointerleave", function (evt) {
                            var delay = 1000;//1 seconds
                            setTimeout(function () {
                                ui.removeBubble(bubble);
                                //your code to be executed after 1 seconds
                            }, delay);
                        });
                    }
                }
            });
        });
    });
}

function removeAllBuses() {
    map.getObjects().forEach(function (obj) {
        if (obj.isBus) map.removeObject(obj);
    });
}

function removeAllBusStops() {
    map.getObjects().forEach(function (obj) {
        if (!obj.isBus) map.removeObject(obj);
    });
}

// Function that executes when we click a button
function findABus() {
    busnumber = $("#busnumber").val();
    removeAllBuses();
    updateBusStops();
    executeGetBus(busnumber);
}

// Do a get request to java server once every second
function executeGetBus(busnumber) {
    clearInterval(loop);
    loop = setInterval(function () {
        getCoordsForBusNr(busnumber);
        if (busWithPassenger) {
            currentDuration++;
            if (currentDuration == durationBetweenMinutes) {
                if (minutesUntilDestination > 0) minutesUntilDestination--;
                currentDuration = 0;
            }
            if (minutesUntilDestination > 1) document.getElementById('minutes').innerHTML = minutesUntilDestination + ' minutes until destination';
            else if (minutesUntilDestination == 1) document.getElementById('minutes').innerHTML = minutesUntilDestination + ' minute until destination';
            else document.getElementById('minutes').innerHTML = '';
        }
    }, 150);
}

// a function to request GPS coordinates for a given bus number
function getCoordsForBusNr(busnumber) {
    var busInfo = {};
    $.getJSON("/api/getBuses?id=" + busnumber, function (buses) {
        removeAllBuses();
        $.each(buses, function (n, bus) {
            busInfo = {
                lat: bus.latitude,
                lng: bus.longitude,
                number: bus.busNumber,
                line: bus.line,
                passengers: bus.passengers

            };
            displayBusOnMap(busInfo);
        });
    });
}

function resetDemo() {
    leaveBus();
    $.getJSON("/api/map/resetDemo", function (fromServer) {});
    removeAllBuses();
    busnumber = 201;
    updateBusStops();
    executeGetBus(busnumber);
}
// a function to display an icon on the map for a given bus object
function displayBusOnMap(busInfo) {

    if (busInfo.lat == 55.61256 && busInfo.lng == 12.9773) {
         enterBus(busInfo); 
    }

    if (busInfo.lat == 55.61119 && busInfo.lng == 12.98499) {
        if (busWithPassenger) {
            leaveBus();
        }
    }
    
    var busIconToUse;
    if (busWithPassenger && busWithPassenger.number == busInfo.number && busWithPassenger.line == busInfo.line) {
        busIconToUse = busiconGreen;
    }
    else {
        if (busInfo.passengers == 0)busIconToUse = busiconRedEmpty;
        else if (busInfo.passengers == 1)busIconToUse = busiconRedNormal;
        else if (busInfo.passengers == 2)busIconToUse = busiconRedFull;
    }
    // Draw a new marker using lat/long from bus
    var marker = new H.map.Marker({
            lng: busInfo.lng,
            lat: busInfo.lat,
        }, {
            icon: busIconToUse
        }
    );
    marker.isBus = true;
    map.addObject(marker);
}

function enterBus(busInfo) {
    busWithPassenger = {
        number: busInfo.number,
        line: busInfo.line
    };
    $("#deals").toggle(true);
}

function leaveBus() {
    busWithPassenger = null;
    $("#deals").toggle(false);
}

function markBusStop(id) {
    markedBusStops.push(id);
}

function startDemo() {
    markBusStop(80005);
    markBusStop(80032);
}