import axiosInstance from './axios';

const getBlogDetailByBlogId = async (blogId) => {
    const response = await axiosInstance.get(`/blogs/${blogId}`);
    return response.data;
};

const likeOrUnlikeBlogAPI = async (isLiked, blogId) => {
    if (isLiked) {
        // 관심 해제
        const response = await axiosInstance.delete(`/blogs/${blogId}/follow`);
    } else {
        // 관심 등록
        const response = await axiosInstance.post(`/blogs/${blogId}/follow`, null);
    }
};

const editIntroduce = async (introduce, blogId) => {
    const body = {
        introduce,
    };
    const response = await axiosInstance.patch(`/blogs/${blogId}`, body);
    return response.data;
};

const getLikeCountByBlogId = async (blogId) => {
    const response = await axiosInstance.get(`/blogs/${blogId}/followers/count`);
    return response.data;
}

const getIsLikedByBlogId = async (blogId) => {
    const response = await axiosInstance.get(`/blogs/${blogId}/follow`);
    return response.data;
};

const getBlogDetailByToken = async () => {
    const response = await axiosInstance.get(`/blogs/me`);
    return response.data;
};

const createPost = async (blogId, payload) => {
    const response = await axiosInstance.post(`/blogs/${blogId}/posts`, payload);
    return response.data;
};

const editPost = async (postId, payload) => {
    const response = await axiosInstance.patch(`/posts/${postId}`, payload);
    return response.data;
}

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

const getPostDetailByPostId = async (postId) => {
    const response = await axiosInstance.get(`/posts/${postId}`);
    return response.data;
}

const getPostLikeByPostId = async (postId) => {
    const response = await axiosInstance.get(`/posts/${postId}/likes`);
    return response.data;
}

const deletePostLikeByPostId = async (postId) => {
    const response = await axiosInstance.delete(`/posts/${postId}/likes`);
    return response.data;
}

const addPostLikeByPostId = async (postId) => {
    const response = await axiosInstance.post(`/posts/${postId}/likes`);
    return response.data;
}

const getReplyListByPostId = async (postId) => {
    const response = await axiosInstance.get(`/posts/${postId}/replies`);
    return response.data;
}

const deletePostByPostId = async (postId) => {
    const response = await axiosInstance.delete(`/posts/${postId}`);
    return response.data;
}

const getReplyLikeByReplyId = async (replyId) => {
    const response = await axiosInstance.get(`/replies/${replyId}/likes`);
    return response.data;
}

const addReplyLikeByReplyId = async (replyId) => {
    const response = await axiosInstance.post(`/replies/${replyId}/likes`);
    return response.data;
}

const deleteReplyLikeByReplyId = async (replyId) => {
    const response = await axiosInstance.delete(`/replies/${replyId}/likes`);
    return response.data;
}

const addReplyByPayload = async (postId, payload) => {
    const response = await axiosInstance.post(`/posts/${postId}/replies`, payload);
    return response.data;
}

const getReplyDataByReplyId = async (replyId) => {
    const response = await axiosInstance.get(`/replies/${replyId}/details`);
    return response.data;
}

const checkPostOwner = async (postId) => {
    const response = await axiosInstance.get(`/posts/${postId}/permissions`);
    return response.data;
}

const checkReplyOwner = async (replyId) => {
    const response = await axiosInstance.get(`/replies/${replyId}/permissions`);
    return response.data;
}

const deleteReplyByReplyId = async (replyId) => {
    const response = await axiosInstance.delete(`/replies/${replyId}`);
    return response.data;
}

const editReplyContentByReplyId = async (payload) => {
    const response = await axiosInstance.patch(`/replies/${payload.replyId}`, {
        content: payload.content
    });
    return response.data;
}

const getMenuTodoByToken = async () => {
    const response = await axiosInstance.get(`/todos/menu`);
    return response.data;
}

const getExerciseTodoByToken = async () => {
    const response = await axiosInstance.get(`/todos/exercise`);
    return response.data;
}

const deleteTodoByTodoId = async (todoId) => {
    const response = await axiosInstance.delete(`/todos/${todoId}`);
    return response.data;
}

const getPostListByToken = async () => {
    const response = await axiosInstance.get(`/posts`);
    return response.data;
}

const getPostsTitles = async () => {
    const response = await axiosInstance.get(`/posts/simple`);
    return response.data;
}

const checkBlogOwner = async (blogId) => {
    const response = await axiosInstance.get(`/blogs/${blogId}/permissions`);
    return response.data;
}

const getPostImagesByPostId = async (postId) => {
    const response = await axiosInstance.get(`/posts/${postId}/images`);
    return response.data;
}

const getPostListByBlogId = async (blogId, params) => {
    const response = await axiosInstance
                .get(
                    blogId ? `/blogs/${blogId}/posts` : '/posts',
                    { params },
                );
    return response.data;
}

export { 
    getBlogDetailByBlogId, 
    likeOrUnlikeBlogAPI, 
    editIntroduce, 
    getLikeCountByBlogId,
    getIsLikedByBlogId,
    createPost,
    getBlogDetailByToken,
    saveImage,
    deleteImage,
    getPostDetailByPostId,
    getPostLikeByPostId,
    deletePostLikeByPostId,
    addPostLikeByPostId,
    getReplyListByPostId,
    deletePostByPostId,
    getReplyLikeByReplyId,
    addReplyLikeByReplyId,
    deleteReplyLikeByReplyId,
    addReplyByPayload,
    getReplyDataByReplyId,
    checkPostOwner,
    checkReplyOwner,
    deleteReplyByReplyId,
    editReplyContentByReplyId,
    getMenuTodoByToken,
    getExerciseTodoByToken,
    deleteTodoByTodoId,
    getPostListByToken,
    getPostsTitles,
    checkBlogOwner,
    getPostImagesByPostId,
    editPost,
    getPostListByBlogId,
 };
