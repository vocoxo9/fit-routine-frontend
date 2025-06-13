import axios from "axios";

const apiAxios = axios.create({
    baseURL: 'http://localhost:8080',
    withCredentials: true // 쿠키 또는 인증 헤더를 포함하여 요청할 것인지에 대한 설정
});

<<<<<<< feature/fix-mainpage-popular-post-v2
const getPopularPostTop3 = async () => {
    const response = await apiAxios.get('/posts/popular');
    return response.data;
=======
const getPopularBoardTop3 = async () => {
    // const response = await apiAxios.get('/board/popular');
    // return response.data;
>>>>>>> main
}

// Routine을 이번달 가장 많이 등록한 회원 3명을 조회하는 api 함수
const getMvpRank = async () => {
    // api 함수 : TODO
    // const response = await apiAxios.get('/routine-rankings/monthly');
    
    // 임시
    const result = {
        won: '다이어트는 내일부터', second: '홍길동', third: '내가 임마'
    };

    return result;
}

// 나의 RoutineMvp순위를 조회하는 api요청
const getMyRank = async () => {
    // const response = await apiAxios.get('/routine-rankings/monthly/me');
    // return response.data;
}


export {
    getMyRank, 
    getMvpRank,
    getPopularPostTop3,
};
