// Create a map object and specify the DOM element for display.
function geoGet(){
  var map, marker;
  var geocoder = new google.maps.Geocoder();
  var content = '<p>会社名<br><b>国会議事堂</b></p>' +
                '<div><p>会社担当者名<br>Matz</p>' +
                '<p>到着時間<br>13:50</p>' +
                '<p>電話番号<br>０３-５５２１-７４４５</p>' +
                '<p>メールアドレス<br>http://www.sangiin.go.jp/japanese/taiken/bochou/kengaku.html</p>' +
                '<p>ひとこと<br>たくさんのふれんずがいるよ！</p></div>';
  var infowindow = new google.maps.InfoWindow({
    content: content
  });

  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 35.6758880, lng: 139.7448580},
    scrollwheel: false,
    zoom: 11  // 1: 世界, 5: 大陸, 10:市, 15:通り, 20:建物
  });

  geocoder.geocode({
    'address': '東京都渋谷区新宿区新宿５丁目４−１−６'
  }, function(results, status){
    if (status === google.maps.GeocoderStatus.OK) {
      marker = new google.maps.Marker({
        position: results[0].geometry.location,
        map: map
      });

      marker.addListener('click', function() {
        infowindow.open(map, marker);
      });
    } else {
      console.group('Error');
      console.log(results);
      console.log(status);
    }
  });
}
