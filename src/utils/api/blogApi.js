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

const getBlogDetailByBlogId = async (blogId) => {
    const response = await apiAxios.get(`/blogs/${blogId}`);

    return response.data;
};

const likeOrUnlikeBlogAPI = async (isLiked, blogId, token) => {
    const config = {
        headers: {
            //`Bearer ${token}`
            Authorization: `${token}`,
        },
    };

    if (isLiked) {
        // 관심 해제
        const response = apiAxios.delete(`/blogs/${blogId}/likes`, config);
    } else {
        // 관심 등록
        const response = apiAxios.post(`/blogs/${blogId}/likes`, null, config);
    }
};

export { getBlogDetailByBlogId, likeOrUnlikeBlogAPI };
