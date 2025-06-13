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
    }
    const response = await axiosInstance.put(`/blogs/${blogId}`, body);
    return response.data;
    
}

const saveBoard = async (boardId, formData) => {
    const result = boardId ?
        await axiosInstance.put(`/boards/${boardId}`, formData) :
        await axiosInstance.post(`/boards`, formData);

    return result.data;
}

const fetchBoardDataByBoardId = async (boardId) => {
    const result = await axiosInstance.get(`/boards/${boardId}`);

    return result.data;
}

const getBoardDetailWithLike = async (boardId) => {
    const result = await axiosInstance.get(`/boards/${boardId}?includeLike=true`);

    return result.data;
}


export { getBlogDetailByBlogId, likeOrUnlikeBlogAPI, editIntroduce, saveBoard, fetchBoardDataByBoardId, getBoardDetailWithLike };
