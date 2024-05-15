    // 서울의 구 목록
    const seoulDistricts = ["종로구", "중구", "용산구", "성동구", "광진구", "동대문구", "중랑구", 
    "성북구", "강북구", "도봉구", "노원구", "은평구", "서대문구", "마포구", "양천구", "강서구", 
    "구로구", "금천구", "영등포구", "동작구", "관악구", "서초구", "강남구", "송파구", "강동구"];

    // 서울의 구 드롭다운을 생성하는 함수
    function createSeoulDistrictsDropdown() {
        const seoulDistrictsDropdown = document.getElementById("district");

        // 기존의 옵션 제거
        seoulDistrictsDropdown.innerHTML = "<option value=''>구 선택</option>";

        // 서울의 구 옵션 추가
        seoulDistricts.forEach(district => {
            const option = document.createElement("option");
            option.text = district;
            option.value = district;
            seoulDistrictsDropdown.appendChild(option);
        });
    }

    // 서울의 구 드롭다운이 변경되었을 때 호출되는 함수
    function updateSubDistricts() {
        // 서울의 구 드롭다운이 변경되었을 때 할 일
    }

    // 페이지 로드 시 서울의 구 드롭다운 생성
    window.onload = function() {
        createSeoulDistrictsDropdown();
    };