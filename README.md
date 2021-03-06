## Visit Poland

## This is my offical website to promote Poland as a touristics destination. ##


### UX

#### This is a single page website,This website will give users ability to explore Poland.



### Home Page 

White&Red is placed on dark background.These two colors are defined in the Polish constitution as the national colors.
Website contains a bit of history of Poland, a few  sample pictures of place to see and dishes to taste.
Users have ability to search for their holiday destination in Poland, find tourist attractions, find accommodation, find bars and restaurants.

### Details

* NAV LINKS will move users thorugh the page, *color* is changing on them from white to red.
* CITY will move users down where they can search for their holiday destination, find tourist attractions, find accommodation, find bars and restaurants. Google Maps and Google Places API is used to provide search results.
* FLIGHTS This is a link to skyscanner website, where users can search for flights. It will open in the new tab.
* VIDEO Embedded youtube video, This is animated history of Poland, by watching this short video users will be able to discover major events in polish history. 
* PICTURES Placed to arouse users interest, each picture is a link to provide more information.
* FOOTER Contains links to additional resources, home icon will move user to the top of the website. 

### Users Stories

I wanted to keep the website clean and simple as much as possible. My idea was to use just two colors, spent some time thinking what I should choose for the background. 
I did not expect that the final effect will look so good on the dark background. To keep the website clean I used Bootstrap carousel plugin for small screens, orginal breakpoint was set to 481px but it was increased to 501px as per advice from mentor.
I've tried to use sticky header(fixed) when scrolling down/up but I didn't like it so decided to use simple up arrow in the city and home icon in footer to provide movement by click, Scroll behavior smooth is implemented.
Color/font style in the marker Infowindow has been changed to keep consistency across the website.
To keep the same layout of the website on the small screen, media Q is implemented to center the header.

### Technologies Used

    1. HTML,
    2. CSS,
    3. BOOTSTRAP,
    4. JS,
    5. Google Maps/Places Javascript API.
    
### Technical information and Testing

This website has been created in Cloud9. The Cloud9 is a cloud-based integrated development environment (IDE) that lets you write, run, and debug your code with just a browser.

The pictures used on this website were obtained by using google image search, stored locally in the /assets/images/ folder. 

CSS stylesheet is stored in /assets/css folder.

This website use the Google Maps and Google Places API to provide search results as per UX section.

Javascript file to interact with Google MAPS API is stored in /assets/js/maps.js.

Documentation used;

*Google Maps Javascript API*(https://developers.google.com/maps/documentation/javascript/examples/places-autocomplete-hotelsearch)

Markers for map are taken from icones8.com(https://icons8.com/icons) and are stored in /asets/images/markers folder.

This website is responsive and has been tested using "Responsive Design Mode" from Firefox Web Developer and also using Chrome DevTools.

### Wireframes

Wireframes for 3 types of resolution are stored in /assets/wireframes folder,  [link](/assets/wireframes). 
Embedded youtube video was added when I was deploying the website so is missing in the documentation.

### How to run your website locally.

*Just click the link*
(https://pablitognu.github.io/visit-poland/index.html)


### Acknowledgements

This is my second project for Code Institute. 

Search fligts directly from website will be added in the future, for now there is link to skyscanner website

### Disclaimer

For now, this is website has been created for educational purposes only.