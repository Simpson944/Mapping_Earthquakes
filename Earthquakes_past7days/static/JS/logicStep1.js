// Add console.log to check to see if our code is working.
console.log("working");
// Create the map object with a center and zoom level.
//let map = L.map('mapid').setView([30, 30], 2);




// Accessing the airport GeoJSON URL
let airportData = "https://raw.githubusercontent.com/Simpson944/Mapping_Earthquakes/main/majorAirports.json";
// Accessing the Toronto airline routes GeoJSON URL.
let torontoData = 'https://raw.githubusercontent.com/Simpson944/Mapping_Earthquakes/Mapping_lines/Mapping_Lines/torontoRoutes.json'
let earthquakeData = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson'


// We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// We create the dark view tile layer that will be an option for our map.
let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// Create a base layer that holds both maps.
let baseMaps = {
  "Streets": streets,
  "Satellite": satelliteStreets
  };

// Create the map object with a center and zoom level.
let map = L.map("mapid", {
    center: [39.5, -98.5],
    zoom: 3,
    layers: [streets]
  });

// Then we add our 'graymap' tile layer to the map.
  // Pass our map layers into our layers control and add the layers control to the map.
L.control.layers(baseMaps).addTo(map);

// Create a style for the lines.
let myStyle = {
  color: "#ffffa1",
  weight: 2
}

/// Grabbing our GeoJSON data.
d3.json(earthquakeData).then(function(data) {
  console.log(data);
// Creating a GeoJSON layer with the retrieved data.
L.geoJSON(data, {
  color: '#ffffa1',
  style: myStyle,
  weight: 2,
  onEachFeature: function(feature, layer) {
    layer.bindPopup('<h3> Airline: ' + feature.properties.airline + '<h3> <hr><h3> Destination: ' + feature.properties.dst + '</h3>');
  }
}).addTo(map);
});

 // An array containing each city's location, state, and population.
// Get data from cities.js

// // Add GeoJSON data.
// let sanFranAirport =
// {"type":"FeatureCollection","features":[{
//     "type":"Feature",
//     "properties":{
//         "id":"3469",
//         "name":"San Francisco International Airport",
//         "city":"San Francisco",
//         "country":"United States",
//         "faa":"SFO",
//         "icao":"KSFO",
//         "alt":"13",
//         "tz-offset":"-8",
//         "dst":"A",
//         "tz":"America/Los_Angeles"},
//         "geometry":{
//             "type":"Point",
//             "coordinates":[-122.375,37.61899948120117]}}
// ]};

// // Grabbing our GeoJSON data.
// // Grabbing our GeoJSON data.
// L.geoJSON(sanFranAirport, {
//     onEachFeature: function(feature, layer) {
//         console.log(layer);
//         layer.bindPopup("<h2>" + feature.properties.city + "</h2>");
//     },
//     //We turn each feature into a marker on the map.
//     // pointToLayer: function(feature, latlng) {
//     //   //console.log(feature);
//     //   return L.marker(latlng)
//     //   .bindPopup("<h2>" + feature.properties.city + "</h2>");
//     // }

//   }).addTo(map);