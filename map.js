const script = document.createElement('script');
script.defer = true;
script.async = true;
script.src = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=cyhpu0hqee`;
script.addEventListener("load", function() {
    var mapOptions = {
        center: new naver.maps.LatLng(37.3595704, 127.105399),
        zoom: 10
    };
    
    var map = new naver.maps.Map('map', mapOptions);
});

document.body.appendChild(script);

var db = [];

const map = document.getElementById("map");

function saveInfo() {
    console.log("saveInfo called");
    personName = document.getElementById("name").value;
    foodName = document.getElementById("foodName").value;
    const successCallback = (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        const pushResult = function (status, response) {
            if (status !== naver.maps.Service.Status.OK) {
                return console.log('Something wrong!');
            }
    
            var result = response.v2, // 검색 결과의 컨테이너
                items = result.results, // 검색 결과의 배열
                address = result.address.jibunAddress; // 검색 결과로 만든 주소
            console.log(result);
            db.push({
                name: personName,
                foodName: foodName,
                address: address,
                latitude: latitude,
                longitude: longitude
            });
            console.log(personName + "님이 " + address + " 에서 " + foodName + "를 제공하고 있습니다");
        } 

        naver.maps.Service.reverseGeocode({
            coords: new naver.maps.LatLng(latitude, longitude),
            status: naver.maps.Service.Status,
            response: naver.maps.Service.ReverseGeocodeResponse,
        }, pushResult);
    }
    const errorCallback = (error) => {
        console.log("위치 정보를 가져올 수 없습니다");
    }
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
    } else {
        console.log("위치 정보를 가져올 수 없습니다");
    }
}

function search() {
    searchString = document.getElementById("searchingWindow").textContent;
    console.log(searchString);
    for (var x of db) {
        if (x.foodName == searchString || x.address == searchString) {
            // 맞는 검색결과를 찾앗음
            // 그 위치에 마커 표시

            var markerOptions = {
                position: new naver.maps.LatLng(x.latitude, x.longitude),
                map: map,
                icon: {
                    url: 'mapMarker.png',
                    size: new naver.maps.Size(22, 35),
                    origin: new naver.maps.Point(0, 0),
                    anchor: new naver.maps.Point(11, 35)
                }
            };
            
            var marker = new naver.maps.Marker(markerOptions);
            console.log(longitude + " " + latitude);
        }
    }
}