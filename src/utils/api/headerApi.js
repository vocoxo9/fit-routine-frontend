import axiosInstance from './axios';

const getExeRoutines = async () => {
    // const response = await axiosInstance.get('/member/me/exercise-routine/today');
    // return response.data;
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
