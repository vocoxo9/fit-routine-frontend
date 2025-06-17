import axiosInstance from './axios';

const getExeRoutines = async () => {
    console.log("루틴 조회 api 요청 들어옴");
    const response = await axiosInstance.get('/todos/me/exe-routine/today');
    console.log("루틴 조회 api 요청 하고옴");
    console.log("조회한 루틴 배열 :: " + JSON.stringify(response.data));
    return response.data;
}

const getFoodRoutines = async () => {
    // const response = await axiosInstance.get('/member/me/food-routine/today');
    // return response.data;
}

const getNotification = async () => {
    const response = await axiosInstance.get('/members/me/notifications');
    return response.data;
}

const deleteNotice = async (noticeId) => {
    const response = await axiosInstance.delete(`/members/me/notice/${noticeId}`);
    return response;
}

const deleteNoticeAll = async () => {
    const response = await axiosInstance.delete('/members/me/notices');
    return response;
}

export {
    getExeRoutines, 
    getFoodRoutines, 
    getNotification, 
    deleteNotice, 
    deleteNoticeAll, 
}
