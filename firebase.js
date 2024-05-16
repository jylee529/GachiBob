import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-analytics.js";
import { getAuth, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { getFirestore, collection, getDocs, addDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
apiKey: "AIzaSyCIdylWlCG8SiNzNy156t4tJrvxEJzB7wU",
authDomain: "gachibob-1891a.firebaseapp.com",
projectId: "gachibob-1891a",
storageBucket: "gachibob-1891a.appspot.com",
messagingSenderId: "291982428045",
appId: "1:291982428045:web:23432a7842bd76fa39dfc4",
measurementId: "G-76KZQE91XR"
};

// Firebase 앱 초기화.
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth();     // 사용자 정보를 가져오기 위한 변수
export const db = getFirestore(app);

export { signOut };
export { collection, getDocs, addDoc };
export { onAuthStateChanged };
