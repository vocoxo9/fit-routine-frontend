import axios from "axios";

const apiAxios = axios.create({
    baseURL: 'http://localhost:8080',
    withCredentials: true // 쿠키 또는 인증 헤더를 포함하여 요청할 것인지에 대한 설정
});

// 로그인한 회원의 프로필 정보를 가져오는 api 함수
const getUserProfile = async () => {
    const response = await apiAxios.get('/members/me');
    return response.data;
}

// 회원 정보를 수정하는 api 함수
const editUserInfo = async (editInfoData) => {
    const response = await apiAxios.post('/members/me', editInfoData);
    return response.data;
}

// 로그인 한 회원의 비밀번호를 조회하는 api함수
const checkPassword = async () => {
    const response = await apiAxios.get('/members/check/password');
    return response.data;
}

export {
    getUserProfile,
    editUserInfo,
    checkPassword,
};