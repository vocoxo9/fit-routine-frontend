const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const PASSWORD_REGEX =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+=\-{}\[\]|:;"'<>,.?/~`]{8,}$/;

const PHONE_NUMBER_REGEX = /^0\d{1,2}-\d{3,4}-\d{4}$/;

const NICKNAME_REGEX = /^[a-zA-Z0-9]{2,16}$/;

const validateEmail = (email) => {
    return EMAIL_REGEX.test(email);
};

const validatePassword = (password) => {
    return PASSWORD_REGEX.test(password);
};

const validatePhoneNumber = (phoneNumber) => {
    return PHONE_NUMBER_REGEX.test(phoneNumber);
};

const validateNickname = (nickname) => {
    return NICKNAME_REGEX.test(nickname);
};

const validateHeight = (height) => {
    return !isNaN(height) && height > 0 && height < 500;
};

const validateWeight = (weight) => {
    return !isNaN(weight) && weight > 0 && weight < 500;
};

export {
    validateEmail,
    validatePassword,
    validatePhoneNumber,
    validateNickname,
    validateHeight,
    validateWeight,
};
