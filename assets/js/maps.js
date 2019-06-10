      var map, places;
      var infoWindow;
      var countryRestrict = { 'country': 'pl' };
      var destination;
      var markers = [];
      var MARKER_PATH = 'https://developers.google.com/maps/documentation/javascript/images/marker_green';

      function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
          zoom: 6,
          mapTypeControl: false,
          panControl: false,
          zoomControl: true,
          streetViewControl: false,
          center: { lat: 51.9194, lng: 19.1451, }
        });

        infoWindow = new google.maps.InfoWindow({
          content: document.getElementById('info-content')
        });


        destination = new google.maps.places.Autocomplete(
          /** @type {!HTMLInputElement} */
          (
            document.getElementById('city')), {
            types: ['(cities)'],
            componentRestrictions: countryRestrict
          });
        places = new google.maps.places.PlacesService(map);

        destination.addListener('place_changed', MoveToDestination);
      }
      // When the user selects a city, zoom the map in to the destination.
      function MoveToDestination() {
        var place = destination.getPlace();
        if (place.geometry) {
          map.panTo(place.geometry.location);
          map.setZoom(11);
          
        }
        else {
          document.getElementById('city').placeholder = 'Search...';
        }

}