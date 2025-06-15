import axiosInstance from './axios';

// 로그인한 회원의 프로필 정보를 가져오는 api 함수
const getUserProfile = async () => {
    const response = await axiosInstance.get('/members/me');
    return response.data;
}

// 회원 정보를 수정하는 api 함수
const editUserInfo = async (editInfoData) => {
    const response = await axiosInstance.patch('/members/me', editInfoData);
    return response.data;
}

// 로그인 한 회원의 비밀번호를 조회하는 api함수
const checkPassword = async () => {
    const response = await axiosInstance.get('/members/check/password');
    return response.data;
}
  
// 로그인한 회원의 관심 블로그 목록 조회하는 api 함수
const getLikeList = async () => {
    const response = await axiosInstance.get('/blogs/me');
    const blogId = response.data.blogId;

    const response2 = await axiosInstance.get(`/blogs/${blogId}/followings`);
    return response2.data;
}

// 선택한 회원의 블로그 관심을 삭제하는 api 함수
const deleteFollow = async (blogId) => {
    const response = await axiosInstance.delete(`/blogs/${blogId}/follow`);
}

export {
    getUserProfile,
    editUserInfo,
    checkPassword,
    getLikeList, 
    deleteFollow, 
};