import axios from 'axios';

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

// 운동 공공데이터 정보
const fetchExerciseOpenDataList = async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    try {
        const response = await apiAxios.get('/exercises/open-data');
        return response.data;
    } catch (error) {
        console.error('운동 데이터 로딩 실패', error);
        return [];
    }
};

// 랜덤 추출할 루틴 정보
const fetchExerciseRandomRoutine = async (formData) => {
    // 사용자가 선택한 반복일수
    const dayRepeat = formData.dayRepeat;

    await new Promise((resolve) => setTimeout(resolve, 1000));
    try {
        const response = await apiAxios.get('/exercises/random-routine', {
            params: { dayRepeat: dayRepeat },
        });
        return response.data;
    } catch (error) {
        console.error('루틴 추출 실패', error);
        return [];
    }
};

// 운동 id로 공공데이터 정보 불러오기
const fetchGetExerciseById = async (id) => {
    try {
        const response = await apiAxios.get(`/exercises/${id}`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

export {
    fetchExerciseOpenDataList,
    fetchExerciseRandomRoutine,
    fetchGetExerciseById,
};
