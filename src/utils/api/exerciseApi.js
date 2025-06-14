import axiosInstance from './axios';

// TB_TODO 정보 등록
const saveExerciseRoutineInfo = async (formData) => {
    try {
        const response = await axiosInstance.post('/todos/exercise', formData);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

// 루틴 등록
const fetchRegistExerciseRoutine = async (exerciseList) => {
    try {
        const response = await axiosInstance.post('/todos/exercise/routines', exerciseList);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

// 운동 공공데이터 정보
const fetchExerciseOpenDataList = async (formData) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    try {
        const response = await axiosInstance.get('/exercises/open-data', {
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
        const response = await axiosInstance.get('/exercises/random-routine', {
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
        const response = await axiosInstance.get(`/exercises/${id}`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

// 회원의 상세정보 (신장, 체중, 생년월일, 성별) 가져오기
const fetchMemberDetail = async () => {
    try {
        const response = await axiosInstance.get('/members/me/detail');
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

// todo 수정
const fetchTodoDataByTodoId = async (todoId) => {
    try {
        const response = await axiosInstance.get(`/exercises/todos/${todoId}`);
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
    fetchRegistExerciseRoutineInfo,
    fetchRegistExerciseRoutine,
    fetchTodoDataByTodoId,
};
