import axios from "axios";

const apiAxios = axios.create({
    baseURL: 'http://localhost:8080',
    withCredentials: true // 쿠키 또는 인증 헤더를 포함하여 요청할 것인지에 대한 설정
});

const getPopularBoardTop3 = async () => {
    const response = await apiAxios.get('/board/popular');
    return response.data;
}

// Routine을 이번달 가장 많이 등록한 회원 3명을 조회하는 api 함수
const getRoutineMvpUser = async () => {
    // api 함수 : TODO
    
    // 임시
    const result = {
        won: '다이어트는 내일부터', second: '홍길동', third: '내가 임마'
    };

    return result;
}


export {
    getRoutineMvpUser,
    getPopularBoardTop3,
};
