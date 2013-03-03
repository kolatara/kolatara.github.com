var myLat = 0;
var myLng = 0;
var request = new XMLHttpRequest();
var me = new google.maps.LatLng(myLat, myLng);
var centerMBTA = new google.maps.LatLng(42.330497742, -71.095794678);
var myOptions = {
	zoom: 13,
	center: centerMBTA,
	mapTypeId: google.maps.MapTypeId.ROADMAP
		};
var map;
var marker;
var infowindow = new google.maps.InfoWindow();
var places;
var redStations = [];
var redBranchAshmont = [];
var redBranchBraintree = [];
var markers = [];
var closest = new Object;
var yourData;

var trainKey = {N:"Northbound", S:"Southbound"};

function init()
{
	map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
	getMyLocation();
}

function getMyLocation()
{
	if (navigator.geolocation) { // the navigator.geolocation object is supported on your browser
		navigator.geolocation.getCurrentPosition(function(position) {
		myLat = position.coords.latitude;
		myLng = position.coords.longitude;
		renderMap();
		});
	}
	else {
		alert("Geolocation is not supported by your web browser.  What a shame!");
	}
}

function renderMap()
{
	me = new google.maps.LatLng(myLat, myLng);
	map.panTo(me);
	//creates element referencing location with "You are here"
	yourData = document.createElement("div");
	yourData.setAttribute("id", "personInfo");
	var title = document.createElement("h2");
	title.innerHTML = "You are here";
	yourData.appendChild(title);
	var para = document.createElement("p");

	//renders stations and polyline
	renderStations();
	renderPolyLine();

	//calculate closest
	calculateClosest();
	//sets info box content
	para.innerHTML = "The closest station to you is <b>" + closest.station + "</b> which is approximately " + closest.distance + " miles away from you.";
	yourData.appendChild(para);	
	//render marker for individual
	marker = new google.maps.Marker({
		position: me,
		title: "Your position"
	});
	marker.setMap(map);
	infowindow.setContent(yourData);
	infowindow.open(map, marker);
}

function renderStations()
{
	tico = "images/t_icon.png";

				pt = new google.maps.LatLng(42.395428, -71.142483);
				markers.push(new google.maps.Marker({position: pt, title: "Alewife Station", icon: tico}));
					redStations.push(pt);
				pt = new google.maps.LatLng(42.39674, -71.121815);
				markers.push(new google.maps.Marker({position: pt, title: "Davis Station", icon: tico}));
					redStations.push(pt);
				pt = new google.maps.LatLng(42.3884, -71.119149);
				markers.push(new google.maps.Marker({position: pt, title: "Porter Square Station", icon: tico}));
					redStations.push(pt);
				pt = new google.maps.LatLng(42.373362, -71.118956);
				markers.push(new google.maps.Marker({position: pt, title: "Harvard Square Station", icon: tico}));
					redStations.push(pt);
				pt = new google.maps.LatLng(42.365486, -71.103802);
				markers.push(new google.maps.Marker({position: pt, title: "Central Square Station", icon: tico}));
					redStations.push(pt);
				pt = new google.maps.LatLng(42.36249079, -71.08617653);
				markers.push(new google.maps.Marker({position: pt, title: "Kendall/MIT Station", icon: tico}));
					redStations.push(pt);
				pt = new google.maps.LatLng(42.361166, -71.070628);
				markers.push(new google.maps.Marker({position: pt, title: "Charles/MGH Station", icon: tico}));
					redStations.push(pt);
				pt = new google.maps.LatLng(42.35639457, -71.0624242);
				markers.push(new google.maps.Marker({position: pt, title: "Park St. Station", icon: tico}));
					redStations.push(pt);
				pt = new google.maps.LatLng(42.355518, -71.060225);
				markers.push(new google.maps.Marker({position: pt, title: "Downtown Crossing Station", icon: tico}));
						redStations.push(pt);
				pt = new google.maps.LatLng(42.352271, -71.055242);
				markers.push(new google.maps.Marker({position: pt, title: "South Station", icon: tico}));
					redStations.push(pt);
				pt = new google.maps.LatLng(42.342622, -71.056967);
				markers.push(new google.maps.Marker({position: pt, title: "Broadway Station", icon: tico}));
					redStations.push(pt);
				pt = new google.maps.LatLng(42.330154, -71.057655);
				markers.push(new google.maps.Marker({position: pt, title: "Andrew Station", icon: tico}));
					redStations.push(pt);
				pt = new google.maps.LatLng(42.320685, -71.052391);
				markers.push(new google.maps.Marker({position: pt, title: "JFK/UMass Station", icon: tico}));
					redStations.push(pt);
					redBranchAshmont.push(pt);
					redBranchBraintree.push(pt);
				pt = new google.maps.LatLng(42.31129, -71.053331);
				markers.push(new google.maps.Marker({position: pt, title: "Savin Hill Station", icon: tico}));
					redBranchAshmont.push(pt);
				pt = new google.maps.LatLng(42.275275, -71.029583);
				markers.push(new google.maps.Marker({position: pt, title: "North Quincy Station", icon: tico}));
					redBranchBraintree.push(pt);
				pt = new google.maps.LatLng(42.2665139, -71.0203369);
				markers.push(new google.maps.Marker({position: pt, title: "Wollaston Station", icon: tico}));
					redBranchBraintree.push(pt);
				pt = new google.maps.LatLng(42.300093, -71.061667);
				markers.push(new google.maps.Marker({position: pt, title: "Fields Corner Station", icon: tico}));
					redBranchAshmont.push(pt);
				pt = new google.maps.LatLng(42.251809, -71.005409);
				markers.push(new google.maps.Marker({position: pt, title: "Quincy Center Station", icon: tico}));
					redBranchBraintree.push(pt);
				pt = new google.maps.LatLng(42.29312583, -71.06573796);
				markers.push(new google.maps.Marker({position: pt, title: "Shawmut Station", icon: tico}));
					redBranchAshmont.push(pt);
				pt = new google.maps.LatLng(42.233391, -71.007153);
				markers.push(new google.maps.Marker({position: pt, title: "Quincy Adams Station", icon: tico}));
					redBranchBraintree.push(pt);
				pt = new google.maps.LatLng(42.284652, -71.064489);
				markers.push(new google.maps.Marker({position: pt, title: "Ashmont Station", icon: tico}));
					redBranchAshmont.push(pt);
				pt = new google.maps.LatLng(42.2078543, -71.0011385);
				markers.push(new google.maps.Marker({position: pt, title: "Braintree Station", icon: tico}));
					redBranchBraintree.push(pt);
	for(m in markers) {
		markers[m].setMap(map);
		google.maps.event.addListener(markers[m], 'click', function() {
					current = this;
					boxText = document.createElement("div");
					boxText.setAttribute("class", "infobox");
					boxText = this.title;
					loadTrains();
					infowindow.setContent(boxText);
					infowindow.open(map, current);
					});
	}					
}

function loadTrains() {
	try {
		request = new XMLHttpRequest();
	}
	catch (ms1) {   
		try {
    			request = new ActiveXObject("Msxml2.XMLHTTP");
  		}
  		catch (ms2) {
    			try {
      				request = new ActiveXObject("Microsoft.XMLHTTP");
    			}
    			catch (ex) {
      				request = null;
    			}
  	}
}
if (request == null) {
  	boxText+= "<p>Sorry! AJAX is not supported on your browser</p>";
}
	request.open("GET", "http://mbtamap-cedar.herokuapp.com/mapper/redline.json", true);
	request.send(null);
	request.onreadystatechange = callback;
}

function callback() {
	console.log("in callback");
	if (request.readyState == 4 && request.status == 200) {
		trains = JSON.parse(request.responseText);
		if(trains.length > 0) {
			console.log("trains>0");
			boxText += '<table id="schedule"><tr><th>Direction</th><th>Time till Arrival</th></tr>';
			/*for(var i = 0; i < trains.length; i++) {
				if(markers[m].title == trainKey[trains[i]["PlatformKey"]] && 
				   trains[i]["InformationType"] == "Predicted") {
					boxText += '<tr><td>' + trainKey[trains[i]['PlatformKey'].substring(4,5)] + 
						   '</td><td>' + trains[i]['Time'] + '</td></tr>';
				}
			}*/
			boxText += '<tr><td>' + RALEN.substring(4,5) + 
				   '</td><td> 0.5 </td></tr>';
			boxText += '</table>';

		} else {
			boxText += "<p>Sorry. There are no predicted trains arriving at this station.</p>";
		}
        }
	else {
		boxText+="<p>Sorry. There was an error loading train data</p>";
	}
}

function renderPolyLine()
{
		redLine = new google.maps.Polyline({
			path: redStations,
			strokeColor: "#FF0000",
			strokeOpacity: 1.0,
			strokeWeight: 5
		});
		redLine.setMap(map);
		redLineAshmont = new google.maps.Polyline({
			path: redBranchAshmont,
			strokeColor: "#FF0000",
			strokeOpacity: 1.0,
			strokeWeight: 5
		});
		redLineAshmont.setMap(map);
		redLineBraintree = new google.maps.Polyline({
			path: redBranchBraintree,
			strokeColor: "#FF0000",
			strokeOpacity: 1.0,
			strokeWeight: 5
		});
		redLineBraintree.setMap(map);
}

function calculateClosest()
{
	for(var m in markers) {
		var lat = markers[m].position.lat();
		var lng = markers[m].position.lng();
		var R = 6371; // km
		var dLat = toRad(myLat-lat);
		var dLon = toRad(myLng-lng);
		var lat1 = toRad(lat);
		var lat2 = toRad(myLat);
		var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.sin(dLon/2) * 
			Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
		var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
		var d = R * c;
		if (m == 0) {
			closest.station = markers[m].title;
			closest.distance = d;
		}
		else if (d < closest.distance) {
			closest.station = markers[m].title;
			var output = new Number(d/1.6);
			closest.distance = output.toPrecision(3);
		}
	}
}

function toRad(value) {
	return value * Math.PI / 180;
}

