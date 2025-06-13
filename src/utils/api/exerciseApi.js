import axios from 'axios';

// axios 객체 생성
const apiAxios = axios.create({
    baseURL: 'http://localhost:8080',
    withCredentials: true,
});

// 임의의 토큰 값 부여
// localStorage.setItem('token', '1');

// 요청 시 토큰 저장
// apiAxios.interceptors.request.use(
//     function (config) {
//         const token = localStorage.getItem('token');

//         if (token) {
//             config.headers.Authorization = `Bearer ${token}`;
//         }

//         return config;
//     },
//     function (error) {
//         return Promise.reject(error);
//     },
// );

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
const fetchExerciseOpenDataList = async (formData) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    try {
        const response = await apiAxios.get('/exercises/open-data', {
            params: {
                purpose: formData.purpose,
            },
        });
        return response.data;
    } catch (error) {
        console.error('운동 데이터 로딩 실패', error);
        return [];
    }
};

// 랜덤 추출할 루틴 정보
const fetchExerciseRandomRoutine = async (formData) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
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

// 회원의 상세정보 (신장, 체중, 생년월일, 성별) 가져오기
const fetchMemberDetail = async () => {
    try {
        const response = await apiAxios.get('/members/me/detail');
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

// 루틴 등록
const fetchRegistExerciseRoutine = async (formData) => {
    try {
        const response = await apiAxios.put('/exercises/regist', formData);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

// todo 수정
const fetchTodoDataByTodoId = async (todoId) => {
    try {
        const response = await apiAxios.get(`/exercises/todos/${todoId}`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

export {
    fetchExerciseOpenDataList,
    fetchExerciseRandomRoutine,
    fetchGetExerciseById,
    fetchMemberDetail,
    fetchRegistExerciseRoutine,
    fetchTodoDataByTodoId,
};
