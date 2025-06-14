import axiosInstance from './axios';

const getPopularPostTop3 = async () => {
    // const response = await apiAxios.get('/posts/popular');
    // return response.data;
};

// Routine을 이번달 가장 많이 등록한 회원 3명을 조회하는 api 함수
const getMvpRank = async () => {
    const response = await axiosInstance.get('/routine-rankings/monthly');
    return response.data;
};

// 나의 RoutineMvp순위를 조회하는 api요청
const getMyRank = async () => {
    const response = await axiosInstance.get('/routine-rankings/monthly/me');
    return response.data;
};

export { getMyRank, getMvpRank, getPopularPostTop3 };
