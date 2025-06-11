import axios from 'axios';

// axios 객체 생성
const apiAxios = axios.create({
    baseURL: 'http://localhost:8080',
    withCredentials: true,
});

localStorage.setItem(
    'token',
    'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0XzFAZ21haWwuY29tIiwiaWF0IjoxNzQ5NTQ2NDY5LCJleHAiOjE3NDk2MzI4Njl9.pSgl34uLxe5cI_VfYPbwgmF_omDuqL07J8nWVAhPEoo',
);

// 요청 시 토큰 저장
apiAxios.interceptors.request.use(
    function (config) {
        const token = localStorage.getItem('token');

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    function (error) {
        return Promise.reject(error);
    },
);

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
    await new Promise((resolve) => setTimeout(resolve, 1000));
    try {
        const response = await apiAxios.get('/exercises/random-routine', {
            params: {
                dayRepeat: formData.dayRepeat,
                purpose: formData.purpose,
            },
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

const fetchTodoDataByTodoId = async (todoId) => {
    try {
        const response = await apiAxios.get(`/exercises/todos/${todoId}`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export {
    fetchExerciseOpenDataList,
    fetchExerciseRandomRoutine,
    fetchGetExerciseById,
    fetchTodoDataByTodoId,
};
