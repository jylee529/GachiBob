require("dotenv").config({path:"./.env"});

const script = document.createElement('script');
script.defer = true;
script.async = true;
script.src = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.CLIENT_ID}`;
script.addEventListener("load", function() {
    var mapOptions = {
        center: new naver.maps.LatLng(37.3595704, 127.105399),
        zoom: 10
    };
    
    var map = new naver.maps.Map('map', mapOptions);
});

document.body.appendChild(script);

