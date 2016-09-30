// Javascript for intro page

// chosen geographical coordinates and a zoom level. map is name of div section
// NYC Lat/ long 40.7128° N, 74.0059° W
var mymap = L.map('map').setView([40.7128, -74.0059], 10);
var click_num = 0
L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v9/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoibmFoc2luIiwiYSI6ImNpdDdwdDV0bzA5dHkyeW13ZTh4enl0c3MifQ.iOW2JTxp_HkABm9wuTuPqA',{maxZoom: 20}).addTo(mymap)

// Insight's office (40.7438973, -73.9909419)
// var marker = L.marker([40.7438973, -73.9909419]).addTo(mymap);
// marker.bindPopup("<b>Insight's Office</b><br>The location.").openPopup();

var popup = L.popup();
// var marker_click = L.marker();
function onMapClick(e) {
    alert("You clicked the map at " + e.latlng);
  };

function newMarkerOnMapClick(e){
    var new_mark = L.marker().setLatLng(e.latlng).addTo(mymap);
    // new_mark.dragging.enable();
    // new_mark.on('dblclick', function(e){ map_d8461694a352485eb5be2f0b3b0f5d91.removeLayer(e.target)})
    var lat = e.latlng.lat.toFixed(6), lng = e.latlng.lng.toFixed(6);
    new_mark.bindPopup("Latitude: " + lat + "<br>Longitude: " + lng );

    // fill out forms on click
    if (click_num==0) {
      document.getElementById("start_lat_point").value = lat;
      document.getElementById("start_lon_point").value = lng;
      click_num = 1
    }
    else if (click_num == 1){
      document.getElementById("end_lat_point").value = lat;
      document.getElementById("end_lon_point").value = lng;
      click_num = 0
    }
    };

mymap.on('click', newMarkerOnMapClick);

// mymap.on('click', onMapClick);
