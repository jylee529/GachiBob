import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, query, orderByChild } from "firebase/database";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBoWZq8Yq0xgDMB4Q0Ul81jNuIKj2tQl4w",
    authDomain: "gachibob-7f7d5.firebaseapp.com",
    projectId: "gachibob-7f7d5",
    storageBucket: "gachibob-7f7d5.appspot.com",
    messagingSenderId: "968981188327",
    appId: "1:968981188327:web:8132b26c173ad0546c1c42",
    measurementId: "G-L9VXKHKM3J",
    databaseURL: "https://gachibob-7f7d5-default-rtdb.firebaseio.com/",
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Realtime Database and get a reference to the service
const database = getDatabase(app);


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

            writeUserData(name, foodName, address, latitude, longitude);
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

    const users = db.child('users');
    const query = users.limitToFirst(100);
    query.once("value", function(snapshot) {
        console.log(snapshot.val());
    });
    
}


function writeUserData(name, foodName, address, latitude, longitude) {
    set(ref(database, 'users/' + name), {
      username: name,
      foodName: foodName,
      address: address,
      latitude: latitude,
      longitude: longitude
    });
  }