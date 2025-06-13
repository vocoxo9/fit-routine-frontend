import axiosInstance from './axios';

// 운동 공공데이터 정보
const fetchExerciseOpenDataList = async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    try {
        const response = await axiosInstance.get('/exercises/open-data');
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

const fetchTodoDataByTodoId = async (todoId) => {
    try {
        const response = await axiosInstance.get(`/exercises/todos/${todoId}`);
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
