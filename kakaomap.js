import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
apiKey: "AIzaSyCIdylWlCG8SiNzNy156t4tJrvxEJzB7wU",
authDomain: "gachibob-1891a.firebaseapp.com",
projectId: "gachibob-1891a",
storageBucket: "gachibob-1891a.appspot.com",
messagingSenderId: "291982428045",
appId: "1:291982428045:web:23432a7842bd76fa39dfc4",
measurementId: "G-76KZQE91XR"
};

// Firebase 앱 초기화.
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);



// v3가 모두 로드된 후, 이 콜백 함수가 실행됩니다.

// 마커를 클릭하면 장소명을 표출할 인포윈도우 입니다
var infowindow = new kakao.maps.InfoWindow({zIndex:1});

var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
    mapOption = {
        center: new kakao.maps.LatLng(37.566826, 126.9786567), // 지도의 중심좌표
        level: 3 // 지도의 확대 레벨
    };  

// 지도를 생성합니다    
var map = new kakao.maps.Map(mapContainer, mapOption); 

// 장소 검색 객체를 생성합니다
var ps = new kakao.maps.services.Places(); 





// 키워드 검색 완료 시 호출되는 콜백함수 입니다
async function placesSearchCB (data, status, pagination) {
    if (status === kakao.maps.services.Status.OK) {

        // 데이터베이스에서 모든 아이템 가져오기
        const querySnapshot = await getDocs(collection(db, "cities"));
        querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        });



        // 검색된 장소 위치를 기준으로 지도 범위를 재설정 하기 위해
        // LatLngBounds 객체에 좌표를 추가합니다
        var bounds = new kakao.maps.LatLngBounds();

        for (var i=0; i<data.length; i++) {
            displayMarker(data[i]);    
            bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
        }       

        // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
        map.setBounds(bounds);
    } 
}

// 지도에 마커를 표시하는 함수입니다
function displayMarker(place) {
    
    // 마커를 생성하고 지도에 표시합니다
    var marker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(place.y, place.x) 
    });

    // 마커에 클릭이벤트를 등록합니다
    kakao.maps.event.addListener(marker, 'click', function() {
        // 마커를 클릭하면 장소명이 인포 윈도우에 표출됩니다
        infowindow.setContent('<div style="padding:5px;font-size:12px;">' + place.place_name + '</div>');
        infowindow.open(map, marker);
    });
}

function searchAddressAndShowMap() {
    const addressInput = document.getElementById("addressInput").value;
    // 키워드로 장소를 검색합니다
    console.log(addressInput + " searched");
    ps.keywordSearch(addressInput, placesSearchCB); 
}