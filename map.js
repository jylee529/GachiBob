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

function saveInfo() {
    personName = document.getElementById("name").value;
    foodName = document.getElementById("foodName").value;
    const successCallback = (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        naver.maps.Service.reverseGeocode({
            coords: new naver.maps.LatLng(latitude, longitude),
        }, function(status, response) {
            if (status !== naver.maps.Service.Status.OK) {
                return alert('Something wrong!');
            }
    
            var result = response.v2, // 검색 결과의 컨테이너
                items = result.results, // 검색 결과의 배열
                address = result.address; // 검색 결과로 만든 주소
            db.push({
                name: personName,
                foodName: foodName,
                address: address
            });
            alert(personName + "님이 " + address + " 에서 " + foodName + "를 제공하고 있습니다");
        });
    }
    const errorCallback = (error) => {
        alert("위치 정보를 가져올 수 없습니다");
    }
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
    } 
}