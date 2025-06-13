const getAccessToken = () => {
    return localStorage.getItem('accessToken');
};

const isLoggedIn = () => {
    return !!getAccessToken();
};

export { getAccessToken, isLoggedIn };
