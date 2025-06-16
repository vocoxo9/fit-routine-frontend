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

export {
    getExeRoutines, 
    getFoodRoutines, 
    getNotification, 
}
