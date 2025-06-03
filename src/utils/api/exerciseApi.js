import axios from 'axios';

// axios 객체 생성
const apiAxios = axios.create({
    baseURL: 'http://localhost:8080',
});

// 통신 오류 발생 시 처리
apiAxios.interceptors.response.use(
    function (response) {
        return response;
    },
    function (error) {
        if (error.status === 401) {
        }
        return Promise.reject(error);
    },
);

const testGetData = async (dayRepeat) => {
    const response = await apiAxios.get('/exercise/recommend', {
        params: { dayRepeat: dayRepeat },
    });
    return response;
};

// 랜덤 추출할 루틴 정보
const getMockData = (formData) => {
    // 사용자가 선택한 반복일수
    const dayRepeat = formData.dayRepeat;
    const exerciseList = [
        { id: 1, name: '런지', met: 3, category: '근력' },
        { id: 2, name: '크런치', met: 4, category: '근력' },
        { id: 3, name: '걷기', met: 3, category: '생활운동' },
        { id: 4, name: '달리기', met: 3, category: '유산소' },
        { id: 5, name: '수영', met: 3.5, category: '유산소' },
        { id: 6, name: '줄넘기', met: 3, category: '유산소' },
        { id: 7, name: '등산', met: 3, category: '생활운동' },
        { id: 8, name: '바벨 운동', met: 3, category: '상체' },
        { id: 9, name: '에어로빅', met: 3, category: '생활운동' },
        { id: 10, name: '스쿼트', met: 3, category: '하체' },
    ];

    return Array.from({ length: dayRepeat }, (_, index) => ({
        todoId: 1,
        dayRepeat,
        dailyExerciseId: index + 1,
        dayNo: index + 1,
        weight: 60,
        exerciseList,
    }));
};

// 공공데이터 정보
const getMockOpenData = () => {
    return [
        { id: 1, name: '런지', met: 3, category: '하체' },
        { id: 2, name: '크런치', met: 4, category: '상체' },
        { id: 3, name: '걷기', met: 3, category: '생활운동' },
        { id: 4, name: '달리기', met: 3, category: '유산소' },
        { id: 5, name: '수영', met: 3.5, category: '생활운동' },
        { id: 6, name: '줄넘기', met: 3, category: '유산소' },
        { id: 7, name: '등산', met: 3, category: '생활운동' },
        { id: 8, name: '바벨 운동', met: 3, category: '상체' },
        { id: 9, name: '에어로빅', met: 3, category: '생활운동' },
        { id: 10, name: '스쿼트', met: 3, category: '하체' },
        { id: 11, name: '계단 오르기', met: 3, category: '생활운동' },
        { id: 12, name: '벤치프레스', met: 3, category: '하체' },
        { id: 13, name: '플랭크', met: 3, category: '상체' },
        { id: 14, name: '레그프레스', met: 3, category: '하체' },
        { id: 15, name: '필라테스', met: 3, category: '유산소' },
    ];
};

export { getMockData, getMockOpenData, testGetData };
