//SEE LINE 157 FOR WHERE YOU LEFT OFF. YOU ARE TRYING TO GET THE MAP TO SHOW THE TRAIN SCHEDULE. 

var myLat = 0;
var myLng = 0;
var me = new google.maps.LatLng(myLat, myLng);
var centerMBTA = new google.maps.LatLng(42.330497742, -71.095794678);
var myOptions = {
	zoom: 11,
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
var trainKeys = {
	N: "Northbound",
	S: "Southbound",
	RALE: "Alewife Station",
	RDAV: "Davis Station",
	RPOR: "Porter Square Station",
	RHAR: "Harvard Square Station",
	RCEN: "Central Square Station",
	RKEN: "Kendall/MIT Station",
	RMGH: "Charles/MGH Station",
	RPRK: "Park St. Station",
	RDTC: "Downtown Crossing Station",
	RSOU: "South Station",
	RBRO: "Broadway Station",
	RAND: "Andrew Station",
	RJFK: "JFK/UMass Station",
	RSAV: "Savin Hill Station",
	RFIE: "Fields Corner Station",
	RSHA: "Shawmut Station",
	RASH: "Ashmont Station",
	RNQU: "North Quincy Station",
	RWOL: "Wollaston Station",
	RQUC: "Quincy Center Station",
	RQUA: "Quincy Adams Station",
	RBRA: "Braintree Station"
	};
//var boxText;

//var trainKey = {N:"Northbound", S:"Southbound"};

function init()
{
	map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
	renderStations();
	renderPolyLine();
	getMyLocation();
}

function getMyLocation()
{
	if (navigator.geolocation) { 
		navigator.geolocation.getCurrentPosition(function(position) {
		myLat = position.coords.latitude;
		myLng = position.coords.longitude;
		renderPerson();
		renderCharacters();
		});
	}
	else {
		alert("Geolocation is not supported by your web browser.");
	}
}

function renderPerson()
{
	me = new google.maps.LatLng(myLat, myLng);
	map.panTo(me);
	//creates element referencing location with "You are here"
	yourData = document.createElement("div");
	yourData.setAttribute("id", "personInfo");
	var title = document.createElement("p");
	title.innerHTML = "<b>You are here</b>";
	yourData.appendChild(title);
	var para = document.createElement("p");

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
	google.maps.event.addListener(marker, 'click', function() {
		infowindow.setContent(yourData);
		infowindow.open(map, marker);
	});
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
	loadTrains();	
	for(m in markers) {
		markers[m].setMap(map);
		google.maps.event.addListener(markers[m], 'click', function() {
					current = this;
					boxText = document.createElement("div");
					boxText.setAttribute("class", "infobox");
					boxText = '<b>' + this.title + '</b>';
					boxText +='<p>trying121243</p>';
					//trains = JSON.parse(loadTrains());
					//alert(trains);
					infowindow.setContent(boxText);
					infowindow.open(map, current);
					});
	}					
}

function loadTrains()
{
	try {
		data = new XMLHttpRequest();
	}
	catch (ms1) {   
		try {
    			data = new ActiveXObject("Msxml2.XMLHTTP");
  		}
  		catch (ms2) {
    			try {
      				data = new ActiveXObject("Microsoft.XMLHTTP");
    			}
    			catch (ex) {
      				data = null;
    			}
  	}
	}
	if (data == null) {
  		document.write("Sorry! AJAX is not supported on your browser");
	}
	data.onreadystatechange = check;
	function check(){
			if (data.readyState < 4) {
				return;
			}
			if (data.status !== 200) {
				return;
			} 
			if (data.readyState === 4) {
				parseData(data);				
			}
	}
	data.open("GET", "http://mbtamap-cedar.herokuapp.com/mapper/redline.json", true);
	data.send(null);
}

function parseData(data) {
	trains = JSON.parse(data.responseText);
	console.log(markers);	
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
		var dist = calculateDistance(lat, lng);
		if (m == 0) {
			closest.station = markers[m].title;
			closest.distance = dist;
		}
		else if (dist < closest.distance) {
			closest.station = markers[m].title;
			closest.distance = dist;
		}
	}
}

function calculateDistance(lat, lng)
{
	var R = 6371; // km
	var dLat = toRad(myLat-lat);
	var dLon = toRad(myLng-lng);	
	var lat1 = toRad(lat);
	var lat2 = toRad(myLat);
	var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.sin(dLon/2) * 
		Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
	var d = R * c / 1.6;
	var output = new Number(d);
	return output.toPrecision(3);
}

function toRad(value) 
{
	return value * Math.PI / 180;
}

function renderCharacters()
{
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
  		document.write("Sorry! AJAX is not supported on your browser");
	}

	request.onreadystatechange = ready;
	function ready(){
			if (request.readyState < 4) {
				return;
			}
			if (request.status !== 200) {
				return;
			} 
			if (request.readyState === 4) {
				loadCharacters(request);
			}
	}
	request.open("GET", "http://messagehub.herokuapp.com/a3.json", true);
	request.send(null);
}

function loadCharacters(request)
{
	characters = JSON.parse(request.responseText);
	for(var c = 0; c < characters.length; c++) {
		if(characters[c]["name"] == "Waldo") {
			here = new google.maps.LatLng(characters[c]["loc"]["latitude"],characters[c]["loc"]["longitude"]);
			var distW =  calculateDistance(characters[c]["loc"]["latitude"],characters[c]["loc"]["longitude"]); 
			waldo = new google.maps.Marker({
			position: here,
			title: characters[c]["loc"]["note"],
			icon: "images/waldo.png"
			});
			waldo.setMap(map);
			google.maps.event.addListener(waldo, 'click', function() {
				boxText = document.createElement("div");
				boxText.setAttribute("class", "infobox");
				boxText = '<b>' + waldo.title + '</b>';
				boxText += '<p> Waldo is approximately ' + distW + ' miles away from you.</p>'
				infowindow.setContent(boxText);
				infowindow.open(map, waldo);
				});

		}
		if(characters[c]["name"] == "Carmen Sandiego") {
			here = new google.maps.LatLng(characters[c]["loc"]["latitude"],characters[c]["loc"]["longitude"]);
			var distC =  calculateDistance(characters[c]["loc"]["latitude"],characters[c]["loc"]["longitude"]); 
			carm = new google.maps.Marker({
			position: here,
			title: characters[c]["loc"]["note"],
			icon: "images/carmen.png"
			});
			carm.setMap(map);
			google.maps.event.addListener(carm, 'click', function() {
				boxText = document.createElement("div");
				boxText.setAttribute("class", "infobox");
				boxText = '<b>' + carm.title + '</b>';
				boxText += '<p> Carmen Sandiego is approximately ' + distC + ' miles away from you.</p>'
				infowindow.setContent(boxText);
				infowindow.open(map, carm);
				});
		}
	}
}
