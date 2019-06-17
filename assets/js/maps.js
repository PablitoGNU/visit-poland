      var map, places;
      var infoWindow;
      var countryRestrict = { 'country': 'pl' };
      var autocomplete;
      var markers = [];
      var MARKER_PATH1 = "assets/images/markers/attractions";
      var MARKER_PATH2 = "assets/images/markers/hotel";
      var MARKER_PATH3 = "assets/images/markers/resturant";
      var MARKER_PATH4 = "assets/images/markers/bar";
      var hostnameRegexp = new RegExp('^https?://.+?/');
      
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

        autocomplete = new google.maps.places.Autocomplete(
          /** @type {!HTMLInputElement} */
          (
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
          map.setZoom(13);
        }
      }
      // Search for attractions in the selected city, within the viewport of the map.

      attractions.addEventListener("click", function search() {
        var search = {
          bounds: map.getBounds(),
          types: ["museum", "park", "stadium", "casino", "art_gallery", "zoo"]
        };
       


        places.nearbySearch(search, function(results, status) {
          if (status === google.maps.places.PlacesServiceStatus.OK) {
            clearMarkers();
            // Create a marker for each place, and
            
            for (var i = 0; i < results.length; i++) {
              //var markerLetter = String.fromCharCode('A'.charCodeAt(0) + (i % 26));
              var markerIcon = MARKER_PATH1 + '.png';
              // Use marker animation to drop the icons incrementally on the map.
              markers[i] = new google.maps.Marker({
                position: results[i].geometry.location,
                animation: google.maps.Animation.BOUNCE,
                icon: markerIcon
              });
              // If the user clicks on marker, show the details of that place
              // in an info window.
              markers[i].placeResult = results[i];
              google.maps.event.addListener(markers[i], 'click', showInfoWindow);
              setTimeout(dropMarker(i), i * 100);
            }
            
          }
        });
      });

      // Search for accommodation in the selected city, within the viewport of the map.

      accommodation.addEventListener("click", function search() {
        var search = {
          bounds: map.getBounds(),
          types: ["lodging"]
        };

        places.nearbySearch(search, function(results, status) {
          if (status === google.maps.places.PlacesServiceStatus.OK) {
            clearMarkers();
            // Create a marker for each hotel found, and
            for (var i = 0; i < results.length; i++) {
              //var markerLetter = String.fromCharCode('A'.charCodeAt(0) + (i % 26));
              var markerIcon = MARKER_PATH2 + '.png';
              // Use marker animation to drop the icons incrementally on the map.
              markers[i] = new google.maps.Marker({
                position: results[i].geometry.location,
                animation: google.maps.Animation.BOUNCE,
                icon: markerIcon
              });
              // If the user clicks a hotel marker, show the details of that place
              // in an info window.
              markers[i].placeResult = results[i];
              google.maps.event.addListener(markers[i], 'click', showInfoWindow);
              setTimeout(dropMarker(i), i * 100);

            }
          }
        });
      });

      // Search for restaurants in the selected city, within the viewport of the map.

      resturants.addEventListener("click", function search() {
        var search = {
          bounds: map.getBounds(),
          types: ["restaurant"]
        };

        places.nearbySearch(search, function(results, status) {
          if (status === google.maps.places.PlacesServiceStatus.OK) {

            clearMarkers();
            // Create a marker for each place found, and
            
            for (var i = 0; i < results.length; i++) {
              //var markerLetter = String.fromCharCode('A'.charCodeAt(0) + (i % 26));
              var markerIcon = MARKER_PATH3 + '.png';
              // Use marker animation to drop the icons incrementally on the map.
              markers[i] = new google.maps.Marker({
                position: results[i].geometry.location,
                animation: google.maps.Animation.BOUNCE,
                icon: markerIcon
              });
              // If the user clicks a place of interest marker, show the details of that place
              // in an info window.
              markers[i].placeResult = results[i];
              google.maps.event.addListener(markers[i], 'click', showInfoWindow);
              setTimeout(dropMarker(i), i * 100);

            }
          }
        });
      });

      // Search for bars,cafe in the selected city, within the viewport of the map.

      bars.addEventListener("click", function search() {
        var search = {
          bounds: map.getBounds(),
          types: ["bar", "cafe"]
        };

        places.nearbySearch(search, function(results, status) {
          if (status === google.maps.places.PlacesServiceStatus.OK) {

            clearMarkers();
            // Create a marker for each place found, and
            
            for (var i = 0; i < results.length; i++) {
              //var markerLetter = String.fromCharCode('A'.charCodeAt(0) + (i % 26));
              var markerIcon = MARKER_PATH4 + '.png';
              // Use marker animation to drop the icons incrementally on the map.
              markers[i] = new google.maps.Marker({
                position: results[i].geometry.location,
                animation: google.maps.Animation.BOUNCE,
                icon: markerIcon
              });
              // If the user clicks a place of interest marker, show the details of that place
              // in an info window.
              markers[i].placeResult = results[i];
              google.maps.event.addListener(markers[i], 'click', showInfoWindow);
              setTimeout(dropMarker(i), i * 100);

            }
          }
        });
      });
      
      
      
      // Drop markers
      function dropMarker(i) {
        return function() {
          markers[i].setMap(map);
        };
      }

      // Get the place details, Show the information in an info window,
      // anchored on the marker for the place that the user selected.
      function showInfoWindow() {
        var marker = this;
        places.getDetails({ placeId: marker.placeResult.place_id },
          function(place, status) {
            if (status !== google.maps.places.PlacesServiceStatus.OK) {
              return;
            }
            infoWindow.open(map, marker);
            buildIWContent(place);
          });
      }

      // Clear markers
      function clearMarkers() {
        for (var i = 0; i < markers.length; i++) {
          if (markers[i]) {
            markers[i].setMap(null);
          }
        }
        markers = [];
      }


      // Load the place information into the HTML elements used by the info window.
      function buildIWContent(place) {
        document.getElementById('iw-icon').innerHTML = '<img class="" ' +
          'src="' + place.icon + '"/>';
        document.getElementById('iw-url').innerHTML = '<b>' + place.name + '</b>';
        document.getElementById('iw-address').textContent = place.vicinity;

        if (place.formatted_phone_number) {
          document.getElementById('iw-phone-row').style.display = '';
          document.getElementById('iw-phone').textContent =
            place.formatted_phone_number;
        }
        else {
          document.getElementById('iw-phone-row').style.display = 'none';
        }

        // Assign a five-star rating to the hotel, using a black star ('&#10029;')
        // to indicate the rating the hotel has earned, and a white star ('&#10025;')
        // for the rating points not achieved.
        if (place.rating) {
          var ratingHtml = '';
          for (var i = 0; i < 5; i++) {
            if (place.rating < (i + 0.5)) {
              ratingHtml += '&#10025;';
            }
            else {
              ratingHtml += '&#10029;';
            }
            document.getElementById('iw-rating-row').style.display = '';
            document.getElementById('iw-rating').innerHTML = ratingHtml;
          }
        }
        else {
          document.getElementById('iw-rating-row').style.display = 'none';
        }

        // The regexp isolates the first part of the URL (domain plus subdomain)
        // to give a short URL for displaying in the info window.
        if (place.website) {
          var fullUrl = place.website;
          var website = hostnameRegexp.exec(place.website);
          if (website === null) {
            website = 'http://' + place.website + '/';
            fullUrl = website;
          }
          document.getElementById('iw-website-row').style.display = '';
          document.getElementById('iw-website').textContent = website;
        }
        else {
          document.getElementById('iw-website-row').style.display = 'none';
        }
      }
      