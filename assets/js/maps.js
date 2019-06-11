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

        // Search for hotels, bars/restaurants & tourist attractions in the selected city, within the viewport of the map.
        function search() {
          clearResults();
          clearMarkers();
          $("#ATTRACTIONS");
          $("#ACCOMMODATION");;
          $("#BARS & RESTAURANTS");
          var search = {
            bounds: map.getBounds(),
          };

        }

        places.nearbySearch(search, function(results, status) {
          if (status === google.maps.places.PlacesServiceStatus.OK) {
            clearResults();
            clearMarkers();
            // Create a marker for each hotel found, and
            // assign a letter of the alphabetic to each marker icon.
            for (var i = 0; i < results.length; i++) {
              var markerLetter = String.fromCharCode('A'.charCodeAt(0) + (i % 26));
              var markerIcon = MARKER_PATH + markerLetter + '.png';
              // Use marker animation to drop the icons incrementally on the map.
              markers[i] = new google.maps.Marker({
                position: results[i].geometry.location,
                animation: google.maps.Animation.DROP,
                icon: markerIcon
              });
              // If the user clicks a hotel marker, show the details of that hotel
              // in an info window.
              markers[i].placeResult = results[i];
              google.maps.event.addListener(markers[i], 'click', showInfoWindow);
              setTimeout(dropMarker(i), i * 100);
              addResult(results[i], i);
            }
          }
        });
      }

      function clearMarkers() {
        for (var i = 0; i < markers.length; i++) {
          if (markers[i]) {
            markers[i].setMap(null);
          }
        }
        markers = [];

        function dropMarker(i) {
          return function() {
            markers[i].setMap(map);
          };
        }

        function addResult(result, i) {
          var results = document.getElementById('results');
          var markerLetter = String.fromCharCode('A'.charCodeAt(0) + (i % 26));
          var markerIcon = MARKER_PATH + markerLetter + '.png';

          var tr = document.createElement('tr');
          tr.style.backgroundColor = (i % 2 === 0 ? '#F0F0F0' : '#FFFFFF');
          tr.onclick = function() {
            google.maps.event.trigger(markers[i], 'click');
          };

          var iconTd = document.createElement('td');
          var nameTd = document.createElement('td');
          var icon = document.createElement('img');
          icon.src = markerIcon;
          icon.setAttribute('class', 'placeIcon');
          icon.setAttribute('className', 'placeIcon');
          var name = document.createTextNode(result.name);
          iconTd.appendChild(icon);
          nameTd.appendChild(name);
          tr.appendChild(iconTd);
          tr.appendChild(nameTd);
          results.appendChild(tr);
        }

        function clearResults() {
          var results = document.getElementById('results');
          while (results.childNodes[0]) {
            results.removeChild(results.childNodes[0]);
          }
        }

        // Get the place details for a hotel. Show the information in an info window,
        // anchored on the marker for the hotel that the user selected.
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

        // Load the place information into the HTML elements used by the info window.
        function buildIWContent(place) {
          document.getElementById('iw-icon').innerHTML = '<img class="hotelIcon" ' +
            'src="' + place.icon + '"/>';
          document.getElementById('iw-url').innerHTML = '<b><a href="' + place.url +
            '">' + place.name + '</a></b>';
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
        }
      }