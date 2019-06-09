function initMap(){
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


    var poland = {
    types: ['(cities)'],
    componentRestrictions: {country: "pl"}
 
};

    var input = document.getElementById('autocomplete');
    autocomplete = new google.maps.places.Autocomplete(input, poland);

    autocomplete.addListener('place_changed', onPlaceChanged);
}

    function onPlaceChanged() {
    var place = autocomplete.getPlace();
    if (place.geometry) {
    map.panTo(place.geometry.location);
    map.setZoom(12);
    search();
  }
}