import axios from "axios";

const apiAxios = axios.create({
    baseURL: 'http://localhost:8080',
    withCredentials: true // 쿠키 또는 인증 헤더를 포함하여 요청할 것인지에 대한 설정
});

const getPopularPostTop3 = async () => {
    // const response = await apiAxios.get('/posts/popular');
    // return response.data;
}

// Routine을 이번달 가장 많이 등록한 회원 3명을 조회하는 api 함수
const getMvpRank = async () => {
    const response = await apiAxios.get('/routine-rankings/monthly');
    return response.data;
}

// 나의 RoutineMvp순위를 조회하는 api요청
const getMyRank = async () => {
    const response = await apiAxios.get('/routine-rankings/monthly/me');
    return response.data;
}


export {
    getMyRank, 
    getMvpRank,
    getPopularPostTop3,
};
