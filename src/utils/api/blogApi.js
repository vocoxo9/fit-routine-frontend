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
    const res = await apiAxios.get(`/blogs/${memberId}`);

    return res.data
};

export {
    getBlogDetailByMemberId,
};
        
