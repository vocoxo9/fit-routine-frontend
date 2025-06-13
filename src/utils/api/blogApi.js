import axiosInstance from './axios';

const getBlogDetailByBlogId = async (blogId) => {
    const response = await axiosInstance.get(`/blogs/${blogId}`);
    return response.data;
};

const likeOrUnlikeBlogAPI = async (isLiked, blogId) => {
    if (isLiked) {
        // 관심 해제
        const response = await axiosInstance.delete(`/blogs/${blogId}/likes`);
    } else {
        // 관심 등록
        const response = await axiosInstance.post(`/blogs/${blogId}/likes`, null);
    }
};

const editIntroduce = async (introduce, blogId) => {
    const body = {
        introduce,
    };
    const response = await axiosInstance.put(`/blogs/${blogId}`, body);
    return response.data;
};

const getBlogIdByToken = async () => {
    const response = await axiosInstance.get(`/blogs/me`);
    return response.data;
};

const getLikeCountByBlogId = async (blogId) => {
    const response = await axiosInstance.get(`/blogs/${blogId}/followers/count`);
    return response.data;
}

const getIsLikedByBlogId = async (blogId) => {
    const response = await axiosInstance.get(`/blogs/${blogId}/follow`);
    return response.data;
}

const updatePost = async (postId, payload) => {
    const response = await axiosInstance.patch(`/posts/${postId}`, payload);
    return response.data;
};

const createPost = async (blogId, payload) => {
    const response = await axiosInstance.post(`/blogs/${blogId}/posts`, payload);
    return response.data;
};

const saveImage = async (postId, image) => {
    const formData = new FormData();
    formData.append('multipartFile', image);
    const response = await axiosInstance.post(`/posts/${postId}/images`, formData);

    return response.data;
};


const deleteImage = async (imageId) => {
    const response = await axiosInstance.delete(`/images/${imageId}`);
    return response.data;
};

const fetchBoardDataByBoardId = async (postId) => {
    const result = await axiosInstance.get(`/posts/${postId}`);

    return result.data;
};

const getBoardDetailWithLike = async (boardId) => {
    const result = await axiosInstance.get(`/boards/${boardId}?includeLike=true`);

    return result.data;
};

const getPostListByBlogId = async (blogId) => {
    const response = await axiosInstance.get(`/blogs/${blogId}/posts`);
    return response.data;
}

const getMenuTodoList = async (blogId) => {
    const response = await axiosInstance.get(`/todo/${blogId}/menu`);
    return response.data;
}

const getExerciseTodoList = async (blogId) => {
    const response = await axiosInstance.get(`/todo/${blogId}/exercise`);
    return response.data;
}

export {
    getBlogDetailByBlogId,
    likeOrUnlikeBlogAPI,
    editIntroduce,
    fetchBoardDataByBoardId,
    getBoardDetailWithLike,
    getLikeCountByBlogId,
    getIsLikedByBlogId,
    getBlogIdByToken,
    updatePost,
    deleteImage,
    saveImage,
    createPost,
    getPostListByBlogId,
    getMenuTodoList,
    getExerciseTodoList,
};
