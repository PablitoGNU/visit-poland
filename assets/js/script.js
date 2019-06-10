      var map, places;
      var infoWindow;
      var countryRestrict = {'country': 'pl'};
      var autocomplete;
      var markers = [];

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
    zoom: 6,
    mapTypeControl: false,
    panControl: false,
    zoomControl: true,
    streetViewControl: false,
    center: {lat: 51.9194,lng: 19.1451,}
});
    
    infoWindow = new google.maps.InfoWindow({
      content: document.getElementById('info-content')
});


autocomplete = new google.maps.places.Autocomplete(
            /** @type {!HTMLInputElement} */ (
                document.getElementById('city')), {
              types: ['(cities)'],
              componentRestrictions: countryRestrict
            });
        places = new google.maps.places.PlacesService(map);

        autocomplete.addListener('place_changed', onPlaceChanged);
}

// When the user selects a city, get the place details for the city and
      // zoom the map in on the city.
      function onPlaceChanged() {
        var place = autocomplete.getPlace();
        if (place.geometry) {
          map.panTo(place.geometry.location);
          map.setZoom(11);
          search();
        } else {
          document.getElementById('autocomplete').placeholder = 'Search...';
}

}          
      
 
 