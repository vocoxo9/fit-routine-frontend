import axios from 'axios';

const apiAxios = axios.create({
    baseURL: 'http://localhost:8080',
});

// apiAxios.interceptors.request.use(
//   (config) => {
//     // const token = localStorage.getItem('token'); 
//     const token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0XzFAZ21haWwuY29tIiwiaWF0IjoxNzQ5NzE4MzI4LCJleHAiOjE3NDk4MDQ3Mjh9.9z1rIutjbzrdB2L9vHosmLRhjdak_75erD3I-N7ke4E';

//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }

//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );


const getBlogDetailByBlogId = async (blogId) => {
    const response = await apiAxios.get(`/blogs/${blogId}`);
    
    return response.data;
};

const getLikeCountByBlogId = async (blogId) => {
    const response = await apiAxios.get(`/blogs/${blogId}/followers/count`);
    return response.data;
};

const getIsLikedByBlogId = async (blogId) => {
    const response = await apiAxios.get(`/blogs/${blogId}/follow`);
    return response.data;
};

const likeOrUnlikeBlogAPI = async (isLiked, blogId) => {
    if (isLiked) {
        // 관심 해제
        const response = await apiAxios.delete(`/blogs/${blogId}/follow`);
    } else {
        // 관심 등록
        const response = await apiAxios.post(`/blogs/${blogId}/follow`);
    }
};

const editIntroduce = async (introduce, blogId) => {
    const body = {
        introduce,
    }
    const response = await apiAxios.patch(`/blogs/${blogId}`, body);
    
    return response.data;
}

const saveBoard = async (boardId, formData) => {
    const result = boardId ?
        await apiAxios.put(`/boards/${boardId}`, formData) :
        await apiAxios.post(`/boards`, formData);

    return result.data;
}

const fetchBoardDataByBoardId = async (boardId) => {
    const result = await apiAxios.get(`/boards/${boardId}`);

    return result.data;
}

const getBoardDetailWithLike = async (boardId) => {
    const result = await apiAxios.get(`/boards/${boardId}?includeLike=true`);

    return result.data;
}


export { 
    getBlogDetailByBlogId, 
    likeOrUnlikeBlogAPI, 
    editIntroduce, 
    saveBoard, 
    fetchBoardDataByBoardId, 
    getBoardDetailWithLike, 
    getLikeCountByBlogId,
    getIsLikedByBlogId
 };
