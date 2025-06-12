import axios from "axios";

// axios 객체 생성
const apiAxios = axios.create({
    baseURL: 'http://localhost:8080',
    withCredentials: true,
});

// 통신 오류 발생 시 처리
apiAxios.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response && error.response.status === 401) {
        }
        return Promise.reject(error);
    },
);

const getExeRoutines = async () => {
    const response = await apiAxios.get('/member/me/exercise-routine/today');
    return response.data;
}

const getFoodRoutines = async () => {
    const response = await apiAxios.get('/member/me/food-routine/today');
    return response.data;
}

export {
    getExeRoutines, 
    getFoodRoutines, 
}