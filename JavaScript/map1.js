// Create a map object and specify the DOM element for display.
function geoGet(){
  var marker = [];
  var infoWindow = [];
  var map;
  var name = [];
  var content = [];

  var geocoder = new google.maps.Geocoder();

  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 35.701502, lng: 139.771197},
    scrollwheel: false,
    zoom: 11  // 1: 世界, 5: 大陸, 10:市, 15:通り, 20:建物
  });

  $.getJSON("../JavaScript/data.json", function(data){
    for(var i = 0; i < data.length; i++){

      geocoder.geocode({
        'address': data[i].address
      }, function(results, status){
        if (status === google.maps.GeocoderStatus.OK) {
          marker[i] = new google.maps.Marker({
            position: results[0].geometry.location,
            map: map
          });
        } else {
          console.group('Error');
          console.log(results);
          console.log(status);
        }
      });
    }

    for(var i = 0; i < data.length; i++){
      content[i] = '<p>' + data[i].name + '</p>';
    }
  });

  for(var i = 0; i < content.length; i++){
    infoWindow[i] = new google.maps.InfoWindow({
      content: content[i]
    });

    marker[i].addListener('click', function(){
      infoWindow[i].open(map, marker[i]);
    });
  }
}
