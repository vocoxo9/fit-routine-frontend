import axiosInstance from './axios';

const getBlogDetailByBlogId = async (blogId) => {
    const response = await axiosInstance.get(`/blogs/${blogId}`);
    return response.data;
};

const getLikeCountByBlogId = async (blogId) => {
    const response = await axiosInstance.get(`/blogs/${blogId}/followers/count`);
    return response.data;
};

const getIsLikedByBlogId = async (blogId) => {
    const response = await axiosInstance.get(`/blogs/${blogId}/follow`);
    return response.data;
};

const likeOrUnlikeBlogAPI = async (isLiked, blogId) => {
    if (isLiked) {
        // 관심 해제
        const response = await axiosInstance.delete(`/blogs/${blogId}/follow`);
    } else {
        // 관심 등록
        const response = await axiosInstance.post(`/blogs/${blogId}/follow`);
    }
};

const editIntroduce = async (introduce, blogId) => {
    const body = {
        introduce,
    }

    const response = await axiosInstance.patch(`/blogs/${blogId}`, body);
    return response.data;
}

const getBlogIdByToken = async () => {
    const response = await axiosInstance.get(`/blogs/me`);
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

// const saveBoard = async (boardId, formData) => {
//     const result = boardId ?
//         await axiosInstance.put(`/boards/${boardId}`, formData) :
//         await axiosInstance.post(`/boards`, formData);

//     return result.data;
// }

const fetchBoardDataByBoardId = async (boardId) => {
    const result = await axiosInstance.get(`/boards/${boardId}`);

    return result.data;
}

const getBoardDetailWithLike = async (boardId) => {
    const result = await axiosInstance.get(`/boards/${boardId}?includeLike=true`);

    return result.data;
}


export { 
    getBlogDetailByBlogId, 
    likeOrUnlikeBlogAPI, 
    editIntroduce, 
    // saveBoard, 
    fetchBoardDataByBoardId, 
    getBoardDetailWithLike, 
    getLikeCountByBlogId,
    getIsLikedByBlogId,
    createPost,
    getBlogIdByToken,
    saveImage,
    deleteImage,
 };
