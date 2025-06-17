import axiosInstance from './axios';

const generateDiets = async (dayRepeat) => {
    console.log(dayRepeat);

    const response = await axiosInstance.get(`/diets/random`, {
        params: { dayRepeat: dayRepeat },
    });
    return response.data;
};

const fetchMenu = async (menuId) => {
    const response = await axiosInstance.get(`/diets/menus/${menuId}`);
    return response.data;
};

const fetchFoodsByCategory = async (category, page, size = 12) => {
    const response = await axiosInstance.get('/diets/menus', {
        params: { category, page, size },
    });
    return response.data;
};

export { generateDiets, fetchMenu, fetchFoodsByCategory };
