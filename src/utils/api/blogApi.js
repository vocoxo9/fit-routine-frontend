import axios from 'axios';

const apiAxios = axios.create({
    baseURL: 'http://localhost:8080',
});

apiAxios.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.status === 401) {
        }

        return Promise.reject(error);
    },
);

const getBlogDetailByMemberId = async (memberId) => {
    const response = await apiAxios.get(`/blogs/${memberId}`);

    return response.data;
};

const likeOrUnlikeBlogAPI = async (isLiked, memberId, token) => {
    const config = {
        headers: {
            //`Bearer ${token}`
            Authorization: `${token}`,
        },
    };

    if (isLiked) {
        // 관심 해제
        const res = apiAxios.delete(`/blogs/unlike/${memberId}`, config);
    } else {
        // 관심 등록
        const res = apiAxios.post(`/blogs/like/${memberId}`, null, config);
    }
};

export { getBlogDetailByMemberId, likeOrUnlikeBlogAPI };
