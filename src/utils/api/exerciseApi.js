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
        console.log('운동 데이터 로딩 성공');
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
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('루틴 추출 실패', error);
        return [];
    }
    // const exerciseList = [
    //     { id: 1, name: '런지', met: 3, category: '근력' },
    //     { id: 2, name: '크런치', met: 4, category: '근력' },
    //     { id: 3, name: '걷기', met: 3, category: '생활운동' },
    //     { id: 4, name: '달리기', met: 3, category: '유산소' },
    //     { id: 5, name: '수영', met: 3.5, category: '유산소' },
    //     { id: 6, name: '줄넘기', met: 3, category: '유산소' },
    //     { id: 7, name: '등산', met: 3, category: '생활운동' },
    //     { id: 8, name: '바벨 운동', met: 3, category: '상체' },
    //     { id: 9, name: '에어로빅', met: 3, category: '생활운동' },
    //     { id: 10, name: '스쿼트', met: 3, category: '하체' },
    // ];

    // return Array.from({ length: dayRepeat }, (_, index) => ({
    //     todoId: 1,
    //     dayRepeat,
    //     dailyExerciseId: index + 1,
    //     dayNo: index + 1,
    //     weight: 60,
    //     exerciseList,
    // }));
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
