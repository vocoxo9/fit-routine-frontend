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
const checkCurrentPassword = async (password) => {
    const response = await axiosInstance.post('/members/me/verify-password', {password: password});
    console.log(response.data);
    return response.data;
}
  
// 로그인한 회원의 관심 블로그 목록 조회하는 api 함수
const getLikeList = async () => {
    const response = await axiosInstance.get('/blogs/me');
    const blogId = response.data.blogId;
    const likeBlogs = await axiosInstance.get(`/blogs/${blogId}/followings`);
    return likeBlogs.data;
}

// 로그인한 회원의 관심 목록 중에 선택하여 삭제하는 api 함수
const deleteFollow = async (blogId) => {
    const response = await axiosInstance.delete(`/blogs/${blogId}/follow`);
    return response.data;
}

const submitReason = async (selectedReason, inputReason) => {
    try {
        const response = await axiosInstance.post('/members/me/withdraw-reasons', {selectedReason: selectedReason, inputReason: inputReason});
        return response.status === 200;
    } catch (error) {
        console.error("탈퇴사유 등록에 실패하였습니다.", error);
        return false;
    }
}

const resignUser = async () => {
    try {
        const response = await axiosInstance.delete('/members/me');
        return response.status === 200;
    } catch (error) {
        console.error("회원탈퇴에 실패했습니다.", error);
        return false;
    }
}

export {
    getUserProfile,
    editUserInfo,
    checkCurrentPassword,
    getLikeList, 
    deleteFollow, 
    submitReason, 
    resignUser, 
};
