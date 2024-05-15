document.addEventListener("DOMContentLoaded", function() {
    // 현재 URL 가져오기
    var currentURL = window.location.href;
    // 버튼 요소 가져오기
    var buttons = document.querySelectorAll(".bottom-bar button");
    
    // 버튼 반복해서 확인
    buttons.forEach(function(button) {
        // 버튼의 href 속성 값 가져오기
        var buttonURL = button.getAttribute("onclick").replace("location.href='", "").replace("'", "");
        // 현재 URL과 버튼의 URL 비교
        if (currentURL.includes(buttonURL)) {
            // 현재 URL과 버튼의 URL이 일치하면 버튼에 active 클래스 추가
            button.classList.add("active");
        }
    });
});