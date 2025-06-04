import axios from "axios";

const apiAxios = axios.create({
    baseURL: 'http://localhost:8080',
    withCredentials: true // 쿠키 또는 인증 헤더를 포함하여 요청할 것인지에 대한 설정
});

// 로그인한 회원의 프로필 정보를 가져오는 api 함수
const getUserProfile = async () => {
    // api 함수 : TODO

    // 임시
    const memberId = 1; // 임시 memberId
    const response = await apiAxios.get('/member/profile?memberId=' + memberId);
    return response.data;
}

export {
    getUserProfile,
};