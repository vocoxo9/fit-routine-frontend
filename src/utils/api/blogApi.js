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

const getConfig = (token) => ({
    headers: {
        //`Bearer ${token}`
        Authorization: `${token}`,
    },
});

const getBlogDetailByBlogId = async (blogId) => {
    const response = await apiAxios.get(`/blogs/${blogId}`);

    return response.data;
};

const likeOrUnlikeBlogAPI = async (isLiked, blogId, token) => {

    if (isLiked) {
        // 관심 해제
        const response = await apiAxios.delete(`/blogs/${blogId}/likes`, getConfig(token));
    } else {
        // 관심 등록
        const response = await apiAxios.post(`/blogs/${blogId}/likes`, null, getConfig(token));
    }
};

const editIntroduce = async (introduce, blogId, token) => {
    
    const body = {
        introduce,
    }
    const response = await apiAxios.put(`/blogs/${blogId}`, body, getConfig(token));
    return response.data;
    
}

const saveBoard = async (boardId, formData, token) => {
    const result = boardId ?
        await apiAxios.put(`/boards/${boardId}`, formData, getConfig(token)) :
        await apiAxios.post(`/boards`, formData, getConfig(token));

    return result.data;
}

const fetchBoardDataByBoardId = async (boardId, token) => {
    const result = await apiAxios.get(`/boards/${boardId}`, getConfig(token));

    return result.data;
}

const getBoardDetailWithLike = async (boardId, token) => {
    const result = await apiAxios.get(`/boards/${boardId}?includeLike=true`, getConfig(token));

    return result.data;
}


export { getBlogDetailByBlogId, likeOrUnlikeBlogAPI, editIntroduce, saveBoard, fetchBoardDataByBoardId, getBoardDetailWithLike };
