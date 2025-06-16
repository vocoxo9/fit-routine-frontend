import axiosInstance from './axios';

const checkEmailDuplicate = async (email) => {
    // 임시 API
    await new Promise((resolve) => setTimeout(resolve, 500));
    return email === 'test@example.com';
};

const checkPhoneNumberDuplicate = async (phoneNumber) => {
    // 임시 API
    await new Promise((resolve) => setTimeout(resolve, 500));
    return phoneNumber === '010-1234-5678';
};

const checkNicknameDuplicate = async (nickname) => {
    // 임시 API
    await new Promise((resolve) => setTimeout(resolve, 500));
    return nickname === 'mouse';
};

const createMember = async (member) => {
    try {
        const response = await axiosInstance.post('/members', member);
        return response.data; // MemberCreateResponse 객체 반환
    } catch (error) {
        throw error;
    }
};

export {
    checkEmailDuplicate,
    checkPhoneNumberDuplicate,
    checkNicknameDuplicate,
    createMember,
};
