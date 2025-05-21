window.onload = () => {

    // 시작일의 기본값, 선택 가능 날짜를 금일 기준으로 설정
    const startedAt = document.getElementById("startedAt");
    const endedAt = document.getElementById("endedAt");
    const today = new Date().toISOString().substring(0, 10);

    startedAt.setAttribute("min", today);
    endedAt.setAttribute("min", today);
    startedAt.value = today;

}

