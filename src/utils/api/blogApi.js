import axios from 'axios';

const apiAxios = axios.create({
    baseURL: 'http://localhost:8080',
});

apiAxios.interceptors.response.use(
    function (response) {
        return response;
    },
    function (error) {
        if (error.status === 401) {
        }
        return Promise.reject(error);
    },
);

const getBlogDetailByMemberId = async (memberId) => {
    const response = await apiAxios.get(`/blogs/${memberId}`);

    return response.data
};

export {
    getBlogDetailByMemberId,
};
        
