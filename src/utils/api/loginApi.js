import axiosInstance from './axios';

const login = async ({ email, password }) => {
    const response = await axiosInstance.post('/auth/login', {
        email,
        password,
    });

    const token = response.data.accessToken;
    if (token) {
        localStorage.setItem('accessToken', token);
    }

    return token;
};

const logout = () => {
    localStorage.removeItem('accessToken');
};

export { login, logout };
