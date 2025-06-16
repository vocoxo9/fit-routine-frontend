import { Navigate } from 'react-router-dom';
import axiosInstance from './axios';

// 운동 공공데이터 정보
const fetchExerciseOpenDataList = async (formData) => {
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
        const response = await axiosInstance.get('/members/me');
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

// TODO 입력 정보 등록
const saveExerciseRoutineInfo = async (formData) => {
    try {
        const response = await axiosInstance.post('/todos/info', formData);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

// TODO EXERCISE  최종 등록
const submitExerciseRoutine = async (todoId, exerciseList) => {
    try {
        const response = await axiosInstance.post(`/todos/exercises/${todoId}`, {
            exerciseList: exerciseList,
        });
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

// TODO EXERCISE 수정
const fetchTodoDataByTodoId = async (todoId) => {
    try {
        const response = await axiosInstance.get(`/todos/exercises/${todoId}`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        Navigate('/error');
        console.error(error);
    }
};

// TODO EXERCISE 삭제
const fetchDeleteTodo = async (todoId) => {
    console.log("delete todo :: " + todoId);
    try {
        const response = await axiosInstance.delete(`/todos/exercises/${todoId}`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

// MEMBER_ID로 TODO_ID 가져오기
const getTodoIdByToken = async () =>{
    try {
        const response = await axiosInstance.get('/todos/exercises');
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

export {
    saveExerciseRoutineInfo,
    submitExerciseRoutine,
    getTodoIdByToken,
    fetchMemberDetail,
    fetchExerciseOpenDataList,
    fetchExerciseRandomRoutine,
    fetchGetExerciseById,
    fetchTodoDataByTodoId,
    fetchDeleteTodo
};
